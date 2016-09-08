import moment from 'moment';
import { configure, addDecorator } from '@kadira/storybook';
import '../css/material/default.css';

addDecorator((story) => {
  moment.locale('zh-cn');
  return (story());
});

function loadStories() {
  require('../stories/TimePicker.js');
  require('../stories/DarkColor.js');
  require('../stories/TwelveHoursTheme.js');
}

configure(loadStories, module);
