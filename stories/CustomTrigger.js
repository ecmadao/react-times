import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/material/default.css';

storiesOf('Custom TimePicker Trigger', module)
  .addDecorator(withKnobs)
  .addWithInfo('basic example', () => (
    <TimePickerWrapper
      customTriggerId={1}
    />
  ))
  .addWithInfo('any custom DOM', () => (
    <TimePickerWrapper
      customTriggerId={2}
    />
  ))
  .addWithInfo('only render picker modal', () => (
    <TimePickerWrapper
      focused
      autoClose={false}
      trigger={<div />}
      closeOnOutsideClick={false}
    />
  ));
