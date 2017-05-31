import React, { PropTypes } from 'react';

import TwelveHoursMode from './TwelveHoursMode';
import TwentyFourHoursMode from './TwentyFourHoursMode';
import timeHelper from '../../utils/time';

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
      autoMode,
      clearFocus,
      draggable,
      handleEditTimezoneChange,
      handleHourChange,
      handleMinuteChange,
      handleShowTimezoneChange,
      onTimezoneChange,
      hour,
      minute,
      phrases,
      showTimezone,
      timezone,
      timezoneIsEditable
    } = this.props;

    return (
      <TwentyFourHoursMode
        autoMode={autoMode}
        clearFocus={clearFocus}
        draggable={draggable}
        handleEditTimezoneChange={handleEditTimezoneChange}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        handleShowTimezoneChange={handleShowTimezoneChange}
        onTimezoneChange={onTimezoneChange}
        hour={hour}
        minute={minute}
        phrases={phrases}
        showTimezone={showTimezone}
        timezone={timezone}
        timezoneIsEditable={timezoneIsEditable}
      />
    )
  }

  renderTwelveHoursMode() {
    const {
      clearFocus,
      draggable,
      handleEditTimezoneChange,
      handleHourChange,
      handleMeridiemChange,
      handleMinuteChange,
      handleShowTimezoneChange,
      onTimezoneChange,
      hour,
      language,
      meridiem,
      minute,
      phrases,
      showTimezone,
      timezone,
      timezoneIsEditable
    } = this.props;

    return (
      <TwelveHoursMode
        clearFocus={clearFocus}
        draggable={draggable}
        handleEditTimezoneChange={handleEditTimezoneChange}
        handleHourChange={handleHourChange}
        handleMeridiemChange={handleMeridiemChange}
        handleMinuteChange={handleMinuteChange}
        handleShowTimezoneChange={handleShowTimezoneChange}
        onTimezoneChange={onTimezoneChange}
        hour={hour}
        language={language}
        meridiem={meridiem}
        minute={minute}
        phrases={phrases}
        showTimezone={showTimezone}
        timezone={timezone}
        timezoneIsEditable={timezoneIsEditable}
      />
    )
  }

  render() {
    const {timeMode} = this.props;
    return (
      <div>
        {parseInt(timeMode) === 24
          ? this.renderTwentyFourHoursMode()
          : this.renderTwelveHoursMode()}
      </div>
    );
  }
}

MaterialTheme.propTypes = propTypes;
MaterialTheme.defaultProps = defaultProps;

export default MaterialTheme;
