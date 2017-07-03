import '../css/material/default.css';

import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import {storiesOf} from '@kadira/storybook';

storiesOf('TwelveHoursMode', module)
  .addWithInfo('with default time', () => (
    <TimePickerWrapper
      timeMode="12"
      defaultTime="13:15"
    />
  ))
  .addWithInfo('basic', () => (
    <TimePickerWrapper
      timeMode="12"
    />
  ))
  .addWithInfo('focused at setup, no icon', () => (
    <TimePickerWrapper
      withoutIcon={true}
      timeMode="12"
      focused={true}
    />
  ))
  .addWithInfo('custom minute step', () => (
    <TimePickerWrapper
      autoMode={false}
      minuteStep={1}
      timeMode="12"
    />
  ))
  .addWithInfo('limit drag', () => (
    <TimePickerWrapper
      limitDrag
      autoMode={false}
      minuteStep={1}
      timeMode="12"
    />
  ));
