import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TimePickerWrapper from '../examples/TimePickerWrapper';

storiesOf('DrakTheme', module)
  .add('basical', () => (
    <TimePickerWrapper theme="dark"/>
  ))
  .add('with default time', () => (
    <TimePickerWrapper
      theme="dark"
      defaultTime="11:11"
    />
  ))
  .add('focused at setup', () => (
    <TimePickerWrapper
      theme="dark"
      focused={true}
    />
  ))
  .add('without icon', () => (
    <TimePickerWrapper
      withoutIcon={true}
      theme="dark"
      focused={true}
    />
  ));
