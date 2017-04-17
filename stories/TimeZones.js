import '../css/material/default.css';

import { text, withKnobs } from '@kadira/storybook-addon-knobs';

import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import { storiesOf } from '@kadira/storybook';

storiesOf('TimeZones', module)
  .addDecorator(withKnobs)
  .addWithInfo('with default timezone', () => (
    <TimePickerWrapper
      showTimezone={true} />
  ))
  .addWithInfo('with timezone search', () => {
    return (
      <TimePickerWrapper
        showTimezone={true}
        editableTimezone={true}
      />
    )
  });

