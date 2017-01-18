import moment from 'moment';

const getCurrentTime = () => moment().format("HH:mm")

export default {
  current: getCurrentTime
}
