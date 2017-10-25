import React from 'react';
import { storiesOf } from '@kadira/storybook';
import '../css/material/default.css';
import { text, withKnobs } from '@kadira/storybook-addon-knobs';
import TimePickerWrapper from '../examples/TimePickerWrapper';

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
    );
  })
  .addWithInfo('focused at setup', () => (
    <TimePickerWrapper
      focused
    />
  ))
  .addWithInfo('not auto change time panel', () => (
    <TimePickerWrapper
      autoMode={false}
    />
  ))
  .addWithInfo('undraggable', () => (
    <TimePickerWrapper
      draggable={false}
    />
  ))
  .addWithInfo('custom minute step', () => (
    <TimePickerWrapper
      autoMode={false}
      minuteStep={1}
    />
  ))
  .addWithInfo('limit drag', () => (
    <TimePickerWrapper
      limitDrag
      autoMode={false}
      minuteStep={1}
    />
  ))
  .addWithInfo('custom HH-MM format', () => (
    <TimePickerWrapper
      timeFormat={'HH-MM'}
    />
  ))
  .addWithInfo('custom H-M format', () => (
    <TimePickerWrapper
      timeFormat={'H-M'}
    />
  ))
  .addWithInfo('custom time formatter', () => (
    <TimePickerWrapper
      timeFormatter={({ hour, minute }) => `${hour} & ${minute}`}
    />
  ));
