import '../css/material/default.css';

import { text, withKnobs } from '@kadira/storybook-addon-knobs';

import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import TimezonePicker from '../src/components/Timezone/TimezonePicker';
import { storiesOf } from '@kadira/storybook';
import timeHelper from '../src/utils/time.js';

const tzForCity = timeHelper.tzForCity('Kuala Lumpur');

storiesOf('TimeZones', module)
  .addDecorator(withKnobs)
  .addWithInfo('with default (detected) timezone', () => (
    <TimePickerWrapper
      showTimezone={true} />
  ))
  .addWithInfo('with default (custom) timezone', () => (
    <TimePickerWrapper
      timezone={tzForCity.zoneName}
      showTimezone={true} />
  ))
  // .addWithInfo('with timezone search', () => {
  //   return (
  //     <TimePickerWrapper
  //       showTimezone={true}
  //       timezoneIsEditable={true}
  //     />
  //   )
  // })
  .addWithInfo('with 12 hour (custom) time', () => {
    return (
      <TimePickerWrapper
        timeMode="12"
        defaultTime="13:15"
        showTimezone={true}
        timezoneIsEditable={true}
      />
    )
  })
  .addWithInfo('with dark theme', () => {
    return (
      <TimePickerWrapper
        colorPalette="dark"
        showTimezone={true}
        timezoneIsEditable={true}
      />
    )
  })
  .addWithInfo('with timezone picker', () => {
    return (
      <TimezonePicker message="World!" />
    )
  });
