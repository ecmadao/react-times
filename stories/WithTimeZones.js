import '../css/material/default.css';

import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import TimeZonesPickerWrapper from '../examples/TimeZonesPickerWrapper';
import { storiesOf } from '@storybook/react';
import timeHelper from '../src/utils/time.js';

const tzForCity = timeHelper.tzForCity('Kuala Lumpur');

storiesOf('TimeZones', module)
  .addDecorator(withKnobs)
  .addWithInfo('with default (detected) timezone', () => (
    <TimePickerWrapper showTimezone />
  ))
  .addWithInfo('with default (custom) timezone', () => (
    <TimePickerWrapper timezone={tzForCity.zoneName} showTimezone />
  ))
  .addWithInfo('with timezone search', () => (
    <TimePickerWrapper showTimezone timezoneIsEditable />
  ))
  .addWithInfo('with 12 hour (custom) time', () => (
    <TimePickerWrapper
      timeMode="12"
      defaultTime="13:15"
      showTimezone
      timezoneIsEditable
    />
  ))
  .addWithInfo('with dark theme', () => (
    <TimePickerWrapper colorPalette="dark" showTimezone timezoneIsEditable />
  ))
  .addWithInfo('timezone picker', () => <TimeZonesPickerWrapper />);
