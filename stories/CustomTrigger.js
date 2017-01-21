import React from 'react';
import {storiesOf} from '@kadira/storybook';
import { withKnobs, text } from '@kadira/storybook-addon-knobs';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/material/default.css';

storiesOf('Custom TimePicker Trigger', module)
  .addDecorator(withKnobs)
  .add('basic example', () => (
    <TimePickerWrapper
      customTriggerId={1}
    />
  ))
  .add('any custom DOM', () => (
    <TimePickerWrapper
      customTriggerId={2}
    />
  ))
  .add('only render picker modal', () => (
    <TimePickerWrapper
      focused={true}
      customTriggerId={0}
    />
  ));
