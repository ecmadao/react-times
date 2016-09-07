import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TimePickerWrapper from '../examples/TimePickerWrapper';

storiesOf('DrakColor', module)
  .add('basical', () => (
    <TimePickerWrapper colorPalette="dark"/>
  ))
  .add('with default time', () => (
    <TimePickerWrapper
      colorPalette="dark"
      defaultTime="11:11"
    />
  ))
  .add('focused at setup', () => (
    <TimePickerWrapper
      colorPalette="dark"
      focused={true}
    />
  ))
  .add('without icon', () => (
    <TimePickerWrapper
      withoutIcon={true}
      colorPalette="dark"
      focused={true}
    />
  ));
