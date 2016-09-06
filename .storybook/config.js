import moment from 'moment';
import { configure, addDecorator } from '@kadira/storybook';
import '../css/react_times.css';

addDecorator((story) => {
  moment.locale('zh-cn');
  return (story());
});

function loadStories() {
  require('../stories/TimePicker.js');
}

configure(loadStories, module);
