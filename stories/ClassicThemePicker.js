import '../css/classic/default.css';

import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import {storiesOf} from '@kadira/storybook';

storiesOf('Classic Theme', module)
  .addWithInfo('basic', () => (
    <TimePickerWrapper theme="classic"/>
  ))
  .addWithInfo('dark color', () => (
    <TimePickerWrapper theme="classic" colorPalette="dark"/>
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
));
