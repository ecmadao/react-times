import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/classic/default.css';

storiesOf('Classic Theme', module)
  .addWithInfo('basical', () => (
    <TimePickerWrapper theme="classic"/>
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
