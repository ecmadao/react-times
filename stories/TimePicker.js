import React from 'react';
import {storiesOf} from '@kadira/storybook';
import { withKnobs, text } from '@kadira/storybook-addon-knobs';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/material/default.css';

storiesOf('Default TimePicker', module)
  .addDecorator(withKnobs)
  .add('basical', () => (
    <TimePickerWrapper />
  ))
  .add('with default time', () => {
    const aDefaultTime = text('set default time', '22:10');
    return (
      <TimePickerWrapper
      defaultTime={aDefaultTime}
      />
    )
  })
  .add('focused at setup', () => (
    <TimePickerWrapper
      focused={true}
    />
  ))
  .add('focused at setup', () => (
    <TimePickerWrapper
      withoutIcon={true}
      focused={true}
    />
  ));
