import moment from 'moment';
import { configure, addDecorator, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

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

setAddon(infoAddon);

configure(loadStories, module);
