import '../css/material/default.css';

import { text, withKnobs } from '@kadira/storybook-addon-knobs';

import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import { storiesOf } from '@kadira/storybook';

storiesOf('Default TimePicker', module)
  .addDecorator(withKnobs)
  .addWithInfo('basic', () => (
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
  .addWithInfo('undraggable', () => (
    <TimePickerWrapper
      draggable={false}
    />
  ));
