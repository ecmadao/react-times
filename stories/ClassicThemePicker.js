import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/classic/default.css';

storiesOf('Classic Theme', module)
  .add('basical', () => (
    <TimePickerWrapper theme="classic"/>
  ))
  .add('focused at setup', () => (
    <TimePickerWrapper
      focused={true}
      theme="classic"
    />
  ))
  .add('dark color', () => (
    <TimePickerWrapper
      colorPalette="dark"
      theme="classic"
    />
  ));
