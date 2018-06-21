
import React from 'react';
import PropTypes from 'prop-types';

import TwelveHoursMode from './TwelveHoursMode';
import TwentyFourHoursMode from './TwentyFourHoursMode';

const propTypes = {
  autoMode: PropTypes.bool,
  clearFocus: PropTypes.func,
  draggable: PropTypes.bool,
  handleEditTimezoneChange: PropTypes.func,
  handleHourChange: PropTypes.func,
  handleMeridiemChange: PropTypes.func,
  handleMinuteChange: PropTypes.func,
  handleShowTimezoneChange: PropTypes.func,
  onTimezoneChange: PropTypes.func,
  hour: PropTypes.string,
  language: PropTypes.string,
  meridiem: PropTypes.string,
  minute: PropTypes.string,
  phrases: PropTypes.object,
  showTimezone: PropTypes.bool,
  timeMode: PropTypes.number,
  timezone: PropTypes.shape({
    city: PropTypes.string,
    zoneAbbr: PropTypes.string,
    zoneName: PropTypes.string
  }),
  timezoneIsEditable: PropTypes.bool
};

const defaultProps = {
  autoMode: true,
  clearFocus: () => {},
  draggable: true,
  handleEditTimezoneChange: () => {},
  handleHourChange: () => {},
  handleMeridiemChange: () => {},
  handleMinuteChange: () => {},
  handleShowTimezoneChange: () => {},
  hour: '00',
  language: 'en',
  meridiem: 'AM',
  minute: '00',
  showTimezone: false,
  timeMode: 24
};

class MaterialTheme extends React.PureComponent {
  renderTwentyFourHoursMode() {
    const {
      hour,
      minute,
      phrases,
      timezone,
      autoMode,
      clearFocus,
      draggable,
      limitDrag,
      minuteStep,
      showTimezone,
      onTimezoneChange,
      handleHourChange,
      timezoneIsEditable,
      handleMinuteChange,
      handleEditTimezoneChange,
      handleShowTimezoneChange,
    } = this.props;

    return (
      <TwentyFourHoursMode
        hour={hour}
        minute={minute}
        phrases={phrases}
        timezone={timezone}
        autoMode={autoMode}
        draggable={draggable}
        limitDrag={limitDrag}
        clearFocus={clearFocus}
        minuteStep={minuteStep}
        showTimezone={showTimezone}
        handleHourChange={handleHourChange}
        onTimezoneChange={onTimezoneChange}
        handleMinuteChange={handleMinuteChange}
        timezoneIsEditable={timezoneIsEditable}
        handleEditTimezoneChange={handleEditTimezoneChange}
        handleShowTimezoneChange={handleShowTimezoneChange}
      />
    );
  }

  renderTwelveHoursMode() {
    const {
      hour,
      minute,
      phrases,
      language,
      meridiem,
      timezone,
      clearFocus,
      draggable,
      limitDrag,
      minuteStep,
      showTimezone,
      onTimezoneChange,
      timezoneIsEditable,
      handleHourChange,
      handleMinuteChange,
      handleEditTimezoneChange,
      handleMeridiemChange,
      handleShowTimezoneChange,
    } = this.props;

    return (
      <TwelveHoursMode
        hour={hour}
        minute={minute}
        phrases={phrases}
        language={language}
        meridiem={meridiem}
        timezone={timezone}
        limitDrag={limitDrag}
        minuteStep={minuteStep}
        clearFocus={clearFocus}
        draggable={draggable}
        showTimezone={showTimezone}
        handleHourChange={handleHourChange}
        onTimezoneChange={onTimezoneChange}
        timezoneIsEditable={timezoneIsEditable}
        handleMinuteChange={handleMinuteChange}
        handleMeridiemChange={handleMeridiemChange}
        handleShowTimezoneChange={handleShowTimezoneChange}
        handleEditTimezoneChange={handleEditTimezoneChange}
      />
    );
  }

  render() {
    const { timeMode } = this.props;
    return (
      <div>
        {parseInt(timeMode, 10) === 24
          ? this.renderTwentyFourHoursMode()
          : this.renderTwelveHoursMode()}
      </div>
    );
  }
}

MaterialTheme.propTypes = propTypes;
MaterialTheme.defaultProps = defaultProps;

export default MaterialTheme;
