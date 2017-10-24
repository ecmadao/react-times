import moment from 'moment-timezone';
import { head, last, is } from './func';

// loads moment-timezone's timezone data, which comes from the
// IANA Time Zone Database at https://www.iana.org/time-zones
moment.tz.load({
  zones: [],
  links: [],
  version: 'latest',
});

const guessUserTz = () => {
  // User-Agent sniffing is not always reliable, but is the recommended technique
  // for determining whether or not we're on a mobile device according to MDN
  // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop
  const isMobile = global.navigator !== undefined
    ? global.navigator.userAgent.match(/Mobi/)
    : false;

  const supportsIntl = global.Intl !== undefined;

  let userTz;

  if (isMobile && supportsIntl) {
    // moment-timezone gives preference to the Intl API regardless of device type,
    // so unset global.Intl to trick moment-timezone into using its fallback
    // see https://github.com/moment/moment-timezone/issues/441
    // TODO: Clean this up when that issue is resolved
    const globalIntl = global.Intl;
    global.Intl = undefined;
    userTz = moment.tz.guess();
    global.Intl = globalIntl;
  } else {
    userTz = moment.tz.guess();
  }

  // return GMT if we're unable to guess or the system is using UTC
  if (!userTz || userTz === 'UTC') return getTzForName('Etc/Greenwich');

  return getTzForName(userTz);
};

/**
 * Create a time data object using moment.
 * If a time is provided, just format it; if not, use the current time.
 *
 * @function getValidTimeData
 * @param  {string} time          a time; defaults to now
 * @param  {string} meridiem      AM or PM; defaults to AM via moment
 * @param  {Number} timeMode      12 or 24-hour mode
 * @param  {string} tz            a timezone name; defaults to guessing a user's tz or GMT
 * @return {Object}               a key-value representation of time data
 */
const getValidTimeData = (options = {}) => {
  const {
    time, meridiem, timeMode, tz, useTz = true
  } = options;
  const validMeridiem = getValidMeridiem(meridiem);

  // when we only have a valid meridiem, that implies a 12h mode
  const mode = (validMeridiem && !timeMode) ? 12 : timeMode || 24;
  // eslint-disable-next-line
  const timezone = (tz) ? tz : guessUserTz().zoneName;

  const validMode = getValidateTimeMode(mode);
  const validTime = getValidTimeString(time, validMeridiem);
  const format12 = 'hh:mmA';
  const format24 = 'HH:mmA';

  // What format is the hour we provide to moment below in?
  const hourFormat = (validMode === 12) ? format12 : format24;

  let time24;
  let time12;

  if (useTz) {
    time24 = ((validTime)
      ? moment(`1970-01-01 ${validTime}`, `YYYY-MM-DD ${hourFormat}`, 'en').tz(timezone).format(format24)
      : moment().tz(timezone).format(format24)).split(/:/);

    time12 = ((validTime)
      ? moment(`1970-01-01 ${validTime}`, `YYYY-MM-DD ${hourFormat}`, 'en').tz(timezone).format(format12)
      : moment().tz(timezone).format(format12)).split(/:/);
  } else {
    time24 = ((validTime)
      ? moment(`1970-01-01 ${validTime}`, `YYYY-MM-DD ${hourFormat}`, 'en').format(format24)
      : moment().format(format24)).split(/:/);
    time12 = ((validTime)
      ? moment(`1970-01-01 ${validTime}`, `YYYY-MM-DD ${hourFormat}`, 'en').format(format12)
      : moment().format(format12)).split(/:/);
  }

  const timeData = {
    hour12: head(time12).replace(/^0/, ''),
    hour24: head(time24),
    minute: last(time24).slice(0, 2),
    meridiem: last(time12).slice(2),
    mode: validMode,
    timezone
  };

  return timeData;
};

/**
 * Format the current time as a string
 * @function getCurrentTime
 * @return {string}
 */
const getCurrentTime = () => {
  const time = getValidTimeData();
  return `${time.hour24}:${time.minute}`;
};

/**
 * Get an integer representation of a time.
 * @function getValidateIntTime
 * @param  {string} time
 * @return {Number}
 */
const getValidateIntTime = (time) => {
  if (isNaN(parseInt(time, 10))) { return 0; }
  return parseInt(time, 10);
};

/**
 * Validate, set a default for, and stringify time data.
 * @function getValidateTime
 * @param {string}
 * @return {string}
 */
const getValidateTime = (time) => {
  let result = time;
  if (is.undefined(result)) { result = '00'; }
  if (isNaN(parseInt(result, 10))) { result = '00'; }
  if (parseInt(result, 10) < 10) { result = `0${parseInt(result, 10)}`; }
  return `${result}`;
};

/**
 * Given a time and meridiem, produce a time string to pass to moment
 * @function getValidTimeString
 * @param  {string} time
 * @param  {string} meridiem
 * @return {string}
 */
const getValidTimeString = (time, meridiem) => {
  if (is.string(time)) {
    let validTime = (time && time.indexOf(':').length >= 0)
      ? time.split(/:/).map(t => getValidateTime(t)).join(':')
      : time;
    const hourAsInt = parseInt(head(validTime.split(/:/)), 10);
    const is12hTime = (hourAsInt > 0 && hourAsInt <= 12);

    validTime = (validTime && meridiem && is12hTime)
      ? `${validTime} ${meridiem}`
      : validTime;

    return validTime;
  }

  return time;
};

/**
 * Given a meridiem, try to ensure that it's formatted for use with moment
 * @function getValidMeridiem
 * @param  {string} meridiem
 * @return {string}
 */
const getValidMeridiem = (meridiem) => {
  if (is.string(meridiem)) {
    return (meridiem && meridiem.match(/am|pm/i)) ? meridiem.toLowerCase() : null;
  }

  return meridiem;
};

/**
 * Ensure that a meridiem passed as a prop has a valid value
 * @function getValidateMeridiem
 * @param  {string} time
 * @param  {string|Number} timeMode
 * @return {string|null}
 */
const getValidateMeridiem = (time, timeMode) => {
  const validateTime = time || getCurrentTime();
  const mode = parseInt(timeMode, 10);
  // eslint-disable-next-line no-unused-vars
  let hour = validateTime.split(/:/)[0];
  hour = getValidateIntTime(hour);

  if (mode === 12) return (hour > 12) ? 'PM' : 'AM';

  return null;
};

/**
 * Validate and set a sensible default for time modes.
 * TODO: this function might not really be necessary, see getValidTimeData() above
 *
 * @function getValidateTimeMode
 * @param  {string|Number} timeMode
 * @return {Number}
 */
const getValidateTimeMode = (timeMode) => {
  const mode = parseInt(timeMode, 10);

  if (isNaN(mode)) { return 24; }
  if (mode !== 24 && mode !== 12) { return 24; }

  return mode;
};

const tzNames = (() => {
  //  We want to subset the existing timezone data as much as possible, both for efficiency
  //  and to avoid confusing the user. Here, we focus on removing reduntant timezone names
  //  and timezone names for timezones we don't necessarily care about, like Antarctica, and
  //  special timezone names that exist for convenience.
  const scrubbedPrefixes = ['Antarctica', 'Arctic', 'Chile'];
  const scrubbedSuffixes = ['ACT', 'East', 'Knox_IN', 'LHI', 'North', 'NSW', 'South', 'West'];

  const tznames = moment.tz.names()
      .filter(name => name.indexOf('/') >= 0)
      .filter(name => !scrubbedPrefixes.indexOf(name.split('/')[0]) >= 0)
      .filter(name => !scrubbedSuffixes.indexOf(name.split('/').slice(-1)[0]) >= 0);

  return tznames;
})();

// We need a human-friendly city name for each timezone identifier
// counting Canada/*, Mexico/*, and US/* allows users to search for
// things like 'Eastern' or 'Mountain' and get matches back
const tzCities = tzNames
    .map(name => (['Canada', 'Mexico', 'US'].indexOf(name.split('/')[0]) >= 0)
      ? name : name.split('/').slice(-1)[0])
    .map(name => name.replace(/_/g, ' '));

// Provide a mapping between a human-friendly city name and its corresponding
// timezone identifier and timezone abbreviation as a named export.
// We can fuzzy match on any of these.
const tzMaps = tzCities.map((city) => {
  const tzMap = {};
  const tzName = tzNames[tzCities.indexOf(city)];

  tzMap.city = city;
  tzMap.zoneName = tzName;
  tzMap.zoneAbbr = moment().tz(tzName).zoneAbbr();

  return tzMap;
});

const getTzForCity = (city) => {
  const maps = tzMaps.filter(tzMap => tzMap.city === city);
  return head(maps);
};

const getTzForName = (name) => {
  let maps = tzMaps.filter(tzMap => tzMap.zoneName === name);
  if (!maps.length) {
    maps = tzMaps.filter(tzMap => tzMap.zoneAbbr === name);
  }
  return head(maps);
};

export default {
  current: getCurrentTime,
  time: getValidTimeData,
  validate: getValidateTime,
  validateInt: getValidateIntTime,
  validateMeridiem: getValidateMeridiem,
  validateTimeMode: getValidateTimeMode,
  tzForCity: getTzForCity,
  tzForName: getTzForName,
  guessUserTz,
  tzMaps
};
