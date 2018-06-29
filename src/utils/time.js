
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

  try {
    return getTzForName(userTz);
  } catch (e) {
    console.error(e);
    return getTzForName('Etc/Greenwich');
  }
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
    tz,
    time,
    timeMode,
    useTz = true,
    meridiem = null,
  } = options;
  const validMeridiem = getValidMeridiem(meridiem);

  // when we only have a valid meridiem, that implies a 12h mode
  const mode = (validMeridiem && !timeMode) ? 12 : timeMode || 24;
  const timezone = tz || guessUserTz().zoneName;

  const validMode = getValidateTimeMode(mode);
  const validTime = getValidTimeString(time, validMeridiem);
  const format12 = 'hh:mmA';
  const format24 = 'HH:mmA';

  // What format is the hour we provide to moment below in?
  const hourFormat = (validMode === 12) ? format12 : format24;

  let time24;
  let time12;
  const formatTime = moment(`1970-01-01 ${validTime}`, `YYYY-MM-DD ${hourFormat}`, 'en');
  if (time || !useTz) {
    time24 = ((validTime)
      ? formatTime.format(format24)
      : moment().format(format24)).split(/:/);
    time12 = ((validTime)
      ? formatTime.format(format12)
      : moment().format(format12)).split(/:/);
  } else {
    time24 = ((validTime)
      ? formatTime.tz(timezone).format(format24)
      : moment().tz(timezone).format(format24)).split(/:/);

    time12 = ((validTime)
      ? formatTime.tz(timezone).format(format12)
      : moment().tz(timezone).format(format12)).split(/:/);
  }

  const timeData = {
    timezone,
    mode: validMode,
    hour24: head(time24),
    minute: last(time24).slice(0, 2),
    hour12: head(time12).replace(/^0/, ''),
    meridiem: validMode === 12 ? last(time12).slice(2) : null,
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
  const val = city.toLowerCase();
  const maps = tzMaps.filter(tzMap => tzMap.city.toLowerCase() === val);
  return head(maps);
};

const getTzCountryAndCity = (name) => {
  const sections = name.split('/');
  return {
    country: sections[0].toLowerCase(),
    city: sections.slice(-1)[0].toLowerCase()
  };
};

const _matchTzByName = (target, name) => {
  const v1 = getTzCountryAndCity(target);
  const v2 = getTzCountryAndCity(name);

  return v1.country === v2.country && v1.city === v2.city;
};

const getTzForName = (name) => {
  let maps = tzMaps.filter(tzMap => tzMap.zoneName === name);
  if (!maps.length && /\//.test(name)) {
    maps = tzMaps.filter(tzMap => tzMap.zoneAbbr === name);
  }
  if (!maps.length) {
    maps = tzMaps.filter(tzMap => _matchTzByName(tzMap.zoneName, name));
  }
  if (!maps.length) {
    throw new Error(`Can not find target timezone for ${name}`);
  }
  return head(maps);
};

const hourFormatter = (hour, defaultTime = '00:00') => {
  if (!hour) return defaultTime;

  let [h, m, meridiem] = `${hour}`.split(/[:|\s]/);

  if (meridiem && meridiem.toLowerCase() === 'pm') meridiem = 'PM';
  if (meridiem && meridiem.toLowerCase() === 'am') meridiem = 'AM';
  if (meridiem && meridiem !== 'AM' && meridiem !== 'PM') meridiem = 'AM';

  if (!h || isNaN(h)) h = '0';
  if (!meridiem && Number(h > 24)) h = Number(h) - 24;
  if (meridiem && Number(h > 12)) h = Number(h) - 12;
  if (!m || isNaN(m) || Number(m) >= 60) m = '0';

  if (Number(h) < 10) h = `0${Number(h)}`;
  if (Number(m) < 10) m = `0${Number(m)}`;

  return meridiem ? `${h}:${m} ${meridiem}` : `${h}:${m}`;
};

const withoutMeridiem = hour => hour.replace(/\s[P|A]M$/, '');

const getStartAndEnd = (from, to) => {
  const current = moment();
  const date = current.format('YYYY-MM-DD');
  const nextDate = current.add(1, 'day').format('YYYY-MM-DD');

  const f = hourFormatter(from, '00:00');
  const t = hourFormatter(to, '23:30');

  let start = `${date} ${withoutMeridiem(f)}`;
  const endTmp = withoutMeridiem(t);
  let end = moment(`${date} ${endTmp}`) <= moment(start)
    ? `${nextDate} ${endTmp}`
    : `${date} ${endTmp}`;

  if (/PM$/.test(f)) start = moment(start).add(12, 'hours').format('YYYY-MM-DD HH:mm');
  if (/PM$/.test(t)) end = moment(end).add(12, 'hours').format('YYYY-MM-DD HH:mm');

  return {
    start,
    end
  };
};

const get12ModeTimes = ({ from, to, step = 30, unit = 'minutes' }) => {
  const {
    start,
    end
  } = getStartAndEnd(from, to);

  const times = [];
  let time = moment(start);
  while (time <= moment(end)) {
    const hour = Number(time.format('HH'));
    times.push(`${time.format('hh:mm')} ${hour >= 12 ? 'PM' : 'AM'}`);
    time = time.add(step, unit);
  }
  return times;
};

const get24ModeTimes = ({ from, to, step = 30, unit = 'minutes' }) => {
  const {
    start,
    end
  } = getStartAndEnd(from, to);

  const times = [];
  let time = moment(start);
  while (time <= moment(end)) {
    times.push(time.format('HH:mm'));
    time = time.add(step, unit);
  }
  return times;
};

export default {
  tzMaps,
  guessUserTz,
  hourFormatter,
  getStartAndEnd,
  get12ModeTimes,
  get24ModeTimes,
  withoutMeridiem,
  time: getValidTimeData,
  current: getCurrentTime,
  tzForCity: getTzForCity,
  tzForName: getTzForName,
  validate: getValidateTime,
  validateInt: getValidateIntTime,
  validateMeridiem: getValidateMeridiem,
  validateTimeMode: getValidateTimeMode,
};
