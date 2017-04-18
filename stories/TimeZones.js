import '../css/material/default.css';

import { text, withKnobs } from '@kadira/storybook-addon-knobs';

import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import { storiesOf } from '@kadira/storybook';
import timeHelper from '../src/utils/time.js';


const tzForCity = timeHelper.tzForCity('Kuala Lumpur').zoneName;

storiesOf('TimeZones', module)
  .addDecorator(withKnobs)
  .addWithInfo('with default timezone', () => (
    <TimePickerWrapper
      showTimezone={true} />
  ))
  .addWithInfo('with custom timezone', () => (
    <TimePickerWrapper
      timezone={tzForCity}
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

