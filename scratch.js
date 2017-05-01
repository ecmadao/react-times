
// We need both a 12h and 24h formatted time here in the parent
// so we can infer the meridiem and pass it down to the children
const time = (defaultTime && meridiem) ? `${defaultTime}${meridiem}` : defaultTime;
const timeIn12Hour = timeHelper.time(time, 12);
const timeIn24Hour = timeHelper.time(defaultTime);

const [hour, minute] = timeIn24Hour;
const meridiem = timeIn12Hour[2]; // AM or PM
