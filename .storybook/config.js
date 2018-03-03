import { addDecorator, configure, setAddon } from '@kadira/storybook';

import infoAddon from '@kadira/react-storybook-addon-info';
import moment from 'moment';

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
  require('../stories/TimeZones');
}

setAddon(infoAddon);

configure(loadStories, module);
