import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, text } from '@kadira/storybook-addon-knobs';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/material/default.css';

storiesOf('Default TimePicker', module)
  .addDecorator(withKnobs)
  .addWithInfo('basical', () => (
    <TimePickerWrapper />
  ))
  .addWithInfo('with default time', () => {
    const aDefaultTime = text('set default time', '22:10');
    return (
      <TimePickerWrapper
        defaultTime={aDefaultTime}
      />
    )
  })
  .addWithInfo('focused at setup', () => (
    <TimePickerWrapper
      focused={true}
    />
  ))
  .addWithInfo('focused at setup', () => (
    <TimePickerWrapper
      withoutIcon={true}
      focused={true}
    />
  ));
