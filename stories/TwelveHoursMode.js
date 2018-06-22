
import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import { storiesOf } from '@storybook/react';
import '../css/material/default.css';

storiesOf('TwelveHoursMode', module)
  .addWithInfo('basic', () => (
    <TimePickerWrapper
      timeMode="12"
    />
  ))
  .addWithInfo('with default time', () => (
    <TimePickerWrapper
      timeMode="12"
      defaultTime="13:15"
    />
  ))
  .addWithInfo('focused at setup, no icon', () => (
    <TimePickerWrapper
      withoutIcon
      timeMode="12"
      focused
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
