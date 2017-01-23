import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/material/default.css';

storiesOf('DarkColor', module)
  .addWithInfo('basical', () => (
    <TimePickerWrapper colorPalette="dark"/>
  ))
  .addWithInfo('with default time', () => (
    <TimePickerWrapper
      colorPalette="dark"
      defaultTime="11:50"
    />
  ))
  .addWithInfo('focused at setup', () => (
    <TimePickerWrapper
      colorPalette="dark"
      focused={true}
    />
  ))
  .addWithInfo('without icon', () => (
    <TimePickerWrapper
      withoutIcon={true}
      colorPalette="dark"
      focused={true}
    />
  ));
