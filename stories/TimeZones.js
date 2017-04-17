import '../css/material/default.css';

import { text, withKnobs } from '@kadira/storybook-addon-knobs';

import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import { storiesOf } from '@kadira/storybook';

storiesOf('TimeZones', module)
  .addDecorator(withKnobs)
  .addWithInfo('with default timezone', () => (
    <TimePickerWrapper />
  ))
  .addWithInfo('with timezone search', () => {
    const aDefaultTime = text('set default time', '22:10');
    return (
      <TimePickerWrapper
        defaultTime={aDefaultTime}
      />
    )
  });

