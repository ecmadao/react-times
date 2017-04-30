import moment from 'moment-timezone';
import { head, last } from './func';

// loads moment-timezone's timezone data, which comes from the
// IANA Time Zone Database at https://www.iana.org/time-zones
moment.tz.load({version: 'latest', zones: [], links: []});

/**
 * Create a time data object using moment.
 * If a time is provided, just format it; if not, use the current time.
 *
 * @function getValidTimeData
 * @param  {string} time          a time; defaults to now
 * @param  {string} meridiem      AM or PM; defaults to AM via moment
 * @param  {Number} timeMode      12 or 24-hour mode
 * @param  {string} tz            a timezone name; guesses user timezone by default
 * @return {Object}               a key-value representation of time data
 */
const getValidTimeData = (time, meridiem, timeMode, tz = guessUserTz()) => {
  const validMeridiem = getValidMeridiem(meridiem);

  // when we only have a valid meridiem, that implies a 12h mode
  const mode = (validMeridiem && !timeMode) ? 12 : timeMode || 24;

  const validMode = getValidateTimeMode(mode);
  const validTime = getValidTimeString(time, validMeridiem);

  const time24 = ((validTime)
    ? moment(`1970-01-01 ${validTime}`, 'YYYY-MM-DD HH:mmA').tz(tz.zoneName).format('HH:mmA')
    : moment().tz(tz.zoneName).format('HH:mmA')).split(/:/);

  const time12 = ((validTime)
    ? moment(`1970-01-01 ${validTime}`, 'YYYY-MM-DD hh:mmA').tz(tz.zoneName).format('hh:mmA')
    : moment().tz(tz.zoneName).format('hh:mmA')).split(/:/);

  const timeData = {
    hour12: head(time12).replace(/^0/, ''),
    hour24: head(time24),
    minute: last(time24).slice(0, 2),
    meridiem: last(time12).slice(2),
    mode: validMode,
    timezone: tz
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
  if (isNaN(parseInt(time))) { return 0; }
  return parseInt(time);
};

/**
 * Validate, set a default for, and stringify time data.
 * @function getValidateTime
 * @param {string}
 * @return {string}
 */
const getValidateTime = (time) => {
  if (typeof time === 'undefined') { time = '00'; }
  if (isNaN(parseInt(time))) { time = '00'; }
  if (parseInt(time) < 10) { time = `0${parseInt(time)}`; }
  return `${time}`;
};

/**
 * Given a time and meridiem, produce a time string to pass to moment
 * @function getValidTimeString
 * @param  {string} time
 * @param  {string} meridiem
 * @return {string}
 */
const getValidTimeString = (time, meridiem) => {
  if (typeof time === 'string') {
    let validTime = (time && time.includes(':'))
      ? time.split(/:/).map((t) => getValidateTime(t)).join(':')
      : time;
    const hourAsInt = parseInt(head(validTime.split(/:/)));
    const is12hTime = (hourAsInt > 0 && hourAsInt <= 12);

    validTime = (validTime && meridiem && is12hTime)
      ? `${validTime} ${meridiem}`
      : validTime;

    return validTime;
  }

  return time;
};

const getValidMeridiem = (meridiem) => {
  if (typeof meridiem === 'string') {
    return (meridiem && meridiem.match(/am|pm/i)) ? meridiem.toLowerCase() : null;
  }

  return meridiem;
};

/**
 * Validate and set a sensible default for time modes.
 * @function getValidateTimeMode
 * @param  {string|Number} timeMode
 * @return {Number}
 */
const getValidateTimeMode = (timeMode) => {
  let mode = parseInt(timeMode);

  if (isNaN(mode)) { return 24; }
  if (mode !== 24 && mode !== 12) { return 24; }

  return mode;
};

const tzNames = (() => {
  //  We want to subset the existing timezone data as much as possible, both for efficiency
  //  and to avoid confusing the user. Here, we focus on removing reduntant timezone names
  //  and timezone names for timezones we don't necessarily care about, like Antarctica, and
  //  special timezone names that exist for convenience.
  const scrubbedPrefixes = ['Antarctica', 'Arctic', 'Chile', 'Etc'];
  const scrubbedSuffixes = ['ACT', 'East', 'Knox_IN', 'LHI', 'North', 'NSW', 'South', 'West'];

  const tzNames = moment.tz.names()
      .filter(name => name.indexOf('/') !== -1)
      .filter(name => !scrubbedPrefixes.includes(name.split('/')[0]))
      .filter(name => !scrubbedSuffixes.includes(name.split('/').slice(-1)[0]));

  return tzNames;
})();

// We need a human-friendly city name for each timezone identifier
// counting Canada/*, Mexico/*, and US/* allows users to search for
// things like 'Eastern' or 'Mountain' and get matches back
const tzCities = tzNames
    .map(name => ['Canada', 'Mexico', 'US'].includes(name.split('/')[0])
      ? name : name.split('/').slice(-1)[0])
    .map(name => name.replace(/_/g, ' '));

// Provide a mapping between a human-friendly city name and its corresponding
// timezone identifier and timezone abbreviation as a named export.
// We can fuzzy match on any of these.
const tzMaps = tzCities.map(city => {
  let tzMap = {};
  const tzName = tzNames[tzCities.indexOf(city)];

  tzMap['city'] = city;
  tzMap['zoneName'] = tzName;
  tzMap['zoneAbbr'] = moment().tz(tzName).zoneAbbr();

  return tzMap;
});

const getTzForCity = (city) => tzMaps
    .filter(tzMap => tzMap['city'] === city)
    .reduce(tzMap => tzMap);

const getTzForName = (name) => tzMaps
    .filter(tzMap => tzMap['zoneName'] === name)
    .reduce(tzMap => tzMap);

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

  return getTzForName(userTz);
};

export default {
  current: getCurrentTime,
  time: getValidTimeData,
  validate: getValidateTime,
  validateInt: getValidateIntTime,
  validateTimeMode: getValidateTimeMode,
  tzForCity: getTzForCity,
  guessUserTz,
  tzMaps
};
