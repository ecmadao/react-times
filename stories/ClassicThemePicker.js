import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TimePickerWrapper from '../examples/TimePickerWrapper';

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
  .add('focused at setup', () => (
    <TimePickerWrapper
      withoutIcon={true}
      theme="classic"
    />
  ));
