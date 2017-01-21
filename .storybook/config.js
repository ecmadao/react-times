import moment from 'moment';
import { configure, addDecorator } from '@kadira/storybook';

addDecorator((story) => {
  moment.locale('zh-cn');
  return (story());
});

function loadStories() {
  require('../stories/TimePicker');
  require('../stories/DarkColor');
  require('../stories/TwelveHoursMode');
  require('../stories/ClassicThemePicker');
  require('../stories/CustomTrigger');
  require('../stories/DifferentLanguage');
}

configure(loadStories, module);
