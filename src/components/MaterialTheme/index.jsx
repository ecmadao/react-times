
import React from 'react';
import asyncComponent from '../Common/AsyncComponent';
import Timezone from '../Timezone';

const DialPlates = {
  12: asyncComponent(
    () => System.import('./TwelveHoursMode')
      .then(component => component.default)
  ),
  24: asyncComponent(
    () => System.import('./TwentyFourHoursMode')
      .then(component => component.default)
  ),
};

const MaterialTheme = (props) => {
  const {
    phrases,
    timeMode,
    timezone,
    showTimezone,
    onTimezoneChange,
    timezoneIsEditable,
  } = props;

  const DialPlate = DialPlates[timeMode];
  return (
    <div className="modal_container time_picker_modal_container" id="MaterialTheme">
      <DialPlate
        {...props}
      />
      {showTimezone
        ? <Timezone
          phrases={phrases}
          timezone={timezone}
          timezoneIsEditable={timezoneIsEditable}
          onTimezoneChange={onTimezoneChange}
        />
        : null
      }
    </div>
  );
};

export default MaterialTheme;
