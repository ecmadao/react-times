import React from 'react';
import {storiesOf} from '@kadira/storybook';
import { withKnobs, text } from '@kadira/storybook-addon-knobs';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import '../css/material/default.css';

storiesOf('Custom TimePicker Trigger', module)
  .addDecorator(withKnobs)
  .add('basical', () => (
    <TimePickerWrapper
      customTrigger={true}
      defaultTime="12:34"
    />
  ));
