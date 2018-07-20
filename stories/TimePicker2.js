import React from 'react';
import { storiesOf } from '@storybook/react';
import '../css/material/default.css';
import { text, withKnobs } from '@storybook/addon-knobs';
import TimePickerWrapper2 from '../examples/TimePickerWrapper2';

storiesOf('Multi TimePicker', module)
  .addDecorator(withKnobs)
  .addWithInfo('basic', () => (
    <TimePickerWrapper2 />
  ));
