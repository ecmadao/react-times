import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/material/default.css';

storiesOf('Default TimePicker', module)
  .add('basical', () => (
    <TimePickerWrapper />
  ))
  .add('with default time', () => (
    <TimePickerWrapper
      defaultTime="11:11"
    />
  ))
  .add('focused at setup', () => (
    <TimePickerWrapper
      focused={true}
    />
  ))
  .add('focused at setup', () => (
    <TimePickerWrapper
      withoutIcon={true}
      focused={true}
    />
  ));
