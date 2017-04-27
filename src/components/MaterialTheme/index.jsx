import React, { PropTypes } from 'react';

import TwelveHoursMode from './TwelveHoursMode';
import TwentyFourHoursMode from './TwentyFourHoursMode';
import language from '../../utils/language';
import timeHelper from '../../utils/time';

const propTypes = {
  hour: PropTypes.string,
  minute: PropTypes.string,
  timeMode: PropTypes.number,
  autoMode: PropTypes.bool,
  draggable: PropTypes.bool,
  language: PropTypes.object,
  meridiem: PropTypes.string,
  timezone: PropTypes.shape({
    city: PropTypes.string,
    zoneAbbr: PropTypes.string,
    zoneName: PropTypes.string
  }),
  timezoneIsEditable: PropTypes.bool,
  showTimezone: PropTypes.bool,
  handleHourChange: PropTypes.func,
  handleMinuteChange: PropTypes.func,
  handleMeridiemChange: PropTypes.func,
  handleTimezoneChange: PropTypes.func,
  handleEditTimezoneChange: PropTypes.func,
  handleShowTimezoneChange: PropTypes.func
};

const defaultProps = {
  hour: '00',
  minute: '00',
  timeMode: 24,
  autoMode: true,
  meridiem: 'AM',
  timezone: timeHelper.guessUserTz(),
  showTimezone: false,
  timezoneIsEditable: false,
  handleHourChange: () => {},
  handleMinuteChange: () => {},
  handleMeridiemChange: () => {},
  handleTimezoneChange: () => {},
  handleEditTimezoneChange: () => {},
  handleShowTimezoneChange: () => {}
};

class MaterialTheme extends React.PureComponent {
  renderTwentyFourHoursMode() {
    const {
      hour,
      minute,
      autoMode,
      draggable,
      clearFocus,
      timezone,
      timezoneIsEditable,
      showTimezone,
      handleHourChange,
      handleMinuteChange,
      handleTimezoneChange,
      handleEditTimezoneChange,
      handleShowTimezoneChange
    } = this.props;

    return (
      <TwentyFourHoursMode
        hour={hour}
        minute={minute}
        draggable={draggable}
        autoMode={autoMode}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        handleTimezoneChange={handleTimezoneChange}
        handleEditTimezoneChange={handleEditTimezoneChange}
        handleShowTimezoneChange={handleShowTimezoneChange}
        clearFocus={clearFocus}
        timezone={timezone}
        timezoneIsEditable={timezoneIsEditable}
        showTimezone={showTimezone}
      />
    )
  }

  renderTwelveHoursMode() {
    const {
      hour,
      minute,
      language,
      draggable,
      clearFocus,
      meridiem,
      timezone,
      timezoneIsEditable,
      showTimezone,
      handleHourChange,
      handleMinuteChange,
      handleMeridiemChange,
      handleTimezoneChange,
      handleEditTimezoneChange,
      handleShowTimezoneChange
    } = this.props;

    return (
      <TwelveHoursMode
        hour={hour}
        minute={minute}
        draggable={draggable}
        language={language}
        clearFocus={clearFocus}
        meridiem={meridiem}
        timezone={timezone}
        timezoneIsEditable={timezoneIsEditable}
        showTimezone={showTimezone}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        handleMeridiemChange={handleMeridiemChange}
        handleTimezoneChange={handleTimezoneChange}
        handleEditTimezoneChange={handleEditTimezoneChange}
        handleShowTimezoneChange={handleShowTimezoneChange}
      />
    )
  }

  render() {
    const { timeMode } = this.props;
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
