import '../css/material/default.css';

import { withKnobs } from '@kadira/storybook-addon-knobs';

import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import TimezonePickerWrapper from '../examples/TimezonePickerWrapper';
import { storiesOf } from '@kadira/storybook';
import timeHelper from '../src/utils/time.js';

const tzForCity = timeHelper.tzForCity('Kuala Lumpur');

storiesOf('Timezones', module)
  .addDecorator(withKnobs)
  .addWithInfo('with default (detected) timezone', () => (
    <TimePickerWrapper
      showTimezone
    />
  ))
  .addWithInfo('with default (custom) timezone', () => (
    <TimePickerWrapper
      timezone={tzForCity.zoneName}
      showTimezone
    />
  ))
  .addWithInfo('with timezone search', () => {
    const logTimezone = (timezone) => {
      console.dir(timezone);
    };
    return (
      <TimePickerWrapper
        showTimezone
        timezoneIsEditable
        onTimezoneChange={logTimezone}
      />
    );
  })
  .addWithInfo('with 12 hour (custom) time', () => (
    <TimePickerWrapper
      timeMode="12"
      defaultTime="13:15"
      showTimezone
      timezoneIsEditable
    />
  ))
  .addWithInfo('with dark theme', () => (
    <TimePickerWrapper
      colorPalette="dark"
      showTimezone
      timezoneIsEditable
    />
  ))
  .addWithInfo('with timezone picker', () => (
    <TimezonePickerWrapper />
  ));
