import moment from 'moment-timezone';
import memoize from 'fast-memoize';


// loads moment-timezone's timezone data, which comes from the IANA Time Zone Database
// at https://www.iana.org/time-zones
moment.tz.load({ version: 'latest', zones: [], links: [] });

const getCurrentTime = () => moment().format("HH:mm");

const getValidateIntTime = (time) => {
  if (isNaN(parseInt(time))) {
    return 0;
  }
  return parseInt(time);
};

const getValidateTime = (time) => {
  if (typeof time === 'undefined') { time = '00'; }
  if (isNaN(parseInt(time))) { time = '00'; }
  if (parseInt(time) < 10) { time = `0${parseInt(time)}`; }
  return `${time}`;
};

const initialTime = (defaultTime, mode = 24) => {
  let [hour, minute] = getCurrentTime().split(':');
  if (defaultTime) {
    [hour, minute] = `${defaultTime}`.split(':');
  }
  hour = getValidateIntTime(hour);
  minute = getValidateIntTime(minute);
  if (hour > 24) { hour = 24 - hour; }
  if (minute >= 60) { minute = 60 - minute; }

  let timeInterval = null;
  if (mode === 12) {
    timeInterval = hour > 12 ? "PM" : "AM";
    hour = hour > 12 ? hour - 12 : hour;
  }

  hour = getValidateTime(hour);
  minute = getValidateTime(minute);

  return [hour, minute, timeInterval];
};

const getValidateTimeQuantum = (time, timeMode) => {
  if (!time) { time = getCurrentTime(); }
  const mode = parseInt(timeMode);
  let [hour, _] = time.split(':');
  hour = getValidateIntTime(hour);

  let timeQuantum = null;
  if (mode === 12) {
    timeQuantum = hour > 12 ? "PM" : "AM";
  }
  return timeQuantum;
}

const getValidateTimeMode = (timeMode) => {
  let mode = parseInt(timeMode);
  if (isNaN(mode)) {
    return 24;
  }
  if (mode !== 24 && mode !== 12) {
    return 24;
  }
  return mode;
};

const tzNames = (() => {
  /*
  *  We want to subset the existing timezone data as much as possible, both for efficiency
  *  and to avoid confusing the user. Here, we focus on removing reduntant timezone names
  *  and timezone names for timezones we don't necessarily care about, like Antarctica, and
  *  special timezone names that exist for convenience.
  */
  const scrubbedPrefixes = ['Antarctica', 'Arctic', 'Chile', 'Etc'];
  const scrubbedSuffixes = ['ACT', 'East', 'Knox_IN', 'LHI', 'North', 'NSW', 'South', 'West'];

  const tzNames = moment.tz.names()
      .filter(name => name.indexOf('/') !== -1)
      .filter(name => !scrubbedPrefixes.includes(name.split('/')[0]))
      .filter(name => !scrubbedSuffixes.includes(name.split('/').slice(-1)[0]));

  return tzNames;
})();

// We need a human-friendly city name for each timezone identifier
const tzCities = tzNames
    .map(name => ['Canada', 'Mexico', 'US'].includes(name.split('/')[0])
      ? name : name.split('/').slice(-1)[0])
    .map(name => name.replace(/_/g, ' '));

/*
 * Provide a mapping between a human-friendly city name and its corresponding
 * timezone identifier and timezone abbreviation as a named export.
 * We can fuzzy match on any of these. This is the data that is searched in
 * ./lib/searchUtils.js.
 */
export const tzMaps = tzCities.map(city => {
  let tzMap = {};
  const tzName = tzNames[tzCities.indexOf(city)];

  tzMap['city'] = city;
  tzMap['zoneName'] = tzName;
  tzMap['zoneAbbr'] = moment().tz(tzName).zoneAbbr();

  return tzMap;
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

  return userTz;
};

const getTzForCity = memoize(city => tzMaps
    .filter(tzMap => tzMap['city'] === city)
    .reduce(tzMap => tzMap));

export default {
  current: getCurrentTime,
  validate: getValidateTime,
  validateInt: getValidateIntTime,
  validateQuantum: getValidateTimeQuantum,
  validateTimeMode: getValidateTimeMode,
  initial: initialTime,
  tzForCity: getTzForCity,
  guessUserTz
};
