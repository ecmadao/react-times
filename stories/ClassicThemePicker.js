import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/classic/default.css';

storiesOf('Classic Theme', module)
  .addWithInfo('basical', () => (
    <TimePickerWrapper theme="classic"/>
  ))
  .addWithInfo('12 hours mode', () => (
    <TimePickerWrapper
      theme="classic"
      timeMode="12"
      defaultTime="10:30"
    />
  ))
  .addWithInfo('focused at setup', () => (
    <TimePickerWrapper
      focused={true}
      theme="classic"
    />
  ))
  .addWithInfo('dark color', () => (
    <TimePickerWrapper
      colorPalette="dark"
      theme="classic"
    />
  ));
