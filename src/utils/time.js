import moment from 'moment';

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

export default {
  current: getCurrentTime,
  validate: getValidateTime,
  validateInt: getValidateIntTime,
  validateQuantum: getValidateTimeQuantum,
  validateTimeMode: getValidateTimeMode,
  initial: initialTime
};
