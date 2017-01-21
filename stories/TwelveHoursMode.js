import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/material/default.css';

storiesOf('TwelveHoursMode', module)
  .add('with default time', () => (
    <TimePickerWrapper
      timeMode="12"
      defaultTime="13:15"
    />
  ))
  .add('basical', () => (
    <TimePickerWrapper
      timeMode="12"
    />
  ))
  .add('focused at setup', () => (
    <TimePickerWrapper
      timeMode="12"
      focused={true}
    />
  ))
  .add('focused at setup', () => (
    <TimePickerWrapper
      timeMode="12"
      withoutIcon={true}
      focused={true}
    />
  ));
