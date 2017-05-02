import React, { PropTypes } from 'react';

import TwelveHoursMode from './TwelveHoursMode';
import TwentyFourHoursMode from './TwentyFourHoursMode';
import languageHelper from '../../utils/language';
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
  handleTimezoneChange: PropTypes.func,
  hour: PropTypes.string,
  language: PropTypes.string,
  meridiem: PropTypes.string,
  minute: PropTypes.string,
  showTimezone: PropTypes.bool,
  timeMode: PropTypes.number,
  timezone: PropTypes.shape({
    city: PropTypes.string,
    zoneAbbr: PropTypes.string,
    zoneName: PropTypes.string
  })
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
  handleTimezoneChange: () => {},
  hour: '00',
  language: 'en',
  meridiem: 'AM',
  minute: '00',
  showTimezone: false,
  timeMode: 24,
  timezone: timeHelper.time().timezone
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
      handleTimezoneChange,
      hour,
      minute,
      showTimezone,
      timezone
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
        handleTimezoneChange={handleTimezoneChange}
        hour={hour}
        minute={minute}
        showTimezone={showTimezone}
        timezone={timezone}
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
      handleTimezoneChange,
      hour,
      language,
      meridiem,
      minute,
      showTimezone,
      timezone
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
        handleTimezoneChange={handleTimezoneChange}
        hour={hour}
        language={language}
        meridiem={meridiem}
        minute={minute}
        showTimezone={showTimezone}
        timezone={timezone}
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
