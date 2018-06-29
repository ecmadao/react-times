import '../css/classic/default.css';

import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import { storiesOf } from '@storybook/react';

storiesOf('Classic Theme', module)
  .addWithInfo('basic', () => (
    <TimePickerWrapper theme="classic" />
  ))
  .addWithInfo('dark color', () => (
    <TimePickerWrapper theme="classic" colorPalette="dark" />
  ))
  .addWithInfo('12 hours mode', () => (
    <TimePickerWrapper
      theme="classic"
      timeMode="12"
      defaultTime="10:30"
    />
  ))
  .addWithInfo('limit start, end, step for 12 hours mode', () => (
    <TimePickerWrapper
      theme="classic"
      timeMode="12"
      timeConfig={{
        from: '08:00 PM',
        to: '08:00 AM',
        step: 1,
        unit: 'hour'
      }}
    />
  ))
  .addWithInfo('limit start, end, step for 24 hours mode', () => (
    <TimePickerWrapper
      theme="classic"
      timeMode="24"
      timeConfig={{
        from: 9,
        to: 19,
        step: 30,
        unit: 'minutes'
      }}
    />
  ))
  .addWithInfo('focused at setup', () => (
    <TimePickerWrapper
      focused
      theme="classic"
    />
  ))
  .addWithInfo('Set default time', () => (
    <TimePickerWrapper
      theme="classic"
      defaultTime="12:00"
    />
  ));
