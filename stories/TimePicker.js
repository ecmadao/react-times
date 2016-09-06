import React from 'react';
import {storiesOf} from '@kadira/storybook';
import TimePickerWrapper from '../examples/TimePickerWrapper';

storiesOf('TimePicker', module)
  .add('basical', () => (
    <TimePickerWrapper />
  ))
  .add('with default time', () => (
    <TimePickerWrapper
      defaultTime="11:11"
    />
  ));
