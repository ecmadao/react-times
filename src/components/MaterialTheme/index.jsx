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
  localMessages: PropTypes.shape({
    am: PropTypes.string,
    cancel: PropTypes.string,
    close: PropTypes.string,
    confirm: PropTypes.string,
    pm: PropTypes.string
  }),
  meridiem: PropTypes.string,
  minute: PropTypes.string,
  showTimezone: PropTypes.bool,
  timeMode: PropTypes.number,
  timezone: PropTypes.string,
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
  handleTimezoneChange: () => {},
  hour: '00',
  localMessages: languageHelper.get(),
  meridiem: 'AM',
  minute: '00',
  showTimezone: false,
  timeMode: 24,
  timezone: timeHelper.guessUserTz().zoneName,
  timezoneIsEditable: false
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
      localMessages,
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
        language={localMessages}
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
