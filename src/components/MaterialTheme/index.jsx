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
  timeQuantum: PropTypes.string,
  timezone: PropTypes.shape({
    city: PropTypes.string,
    zoneAbbr: PropTypes.string,
    zoneName: PropTypes.string
  }),
  editableTimezone: PropTypes.bool,
  showTimezone: PropTypes.bool,
  handleHourChange: PropTypes.func,
  handleMinuteChange: PropTypes.func,
  handleTimeQuantumChange: PropTypes.func,
  handleTimezoneChange: PropTypes.func,
  handleEditTimezoneChange: PropTypes.func,
  handleShowTimezoneChange: PropTypes.func
};

const defaultProps = {
  hour: '00',
  minute: '00',
  timeMode: 24,
  autoMode: true,
  timeQuantum: 'AM',
  timezone: timeHelper.guessUserTz(),
  showTimezone: false,
  editableTimezone: false,
  handleHourChange: () => {},
  handleMinuteChange: () => {},
  handleTimeQuantumChange: () => {},
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
      editableTimezone,
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
        editableTimezone={editableTimezone}
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
      timeQuantum,
      timezone,
      editableTimezone,
      showTimezone,
      handleHourChange,
      handleMinuteChange,
      handleTimeQuantumChange,
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
        timeQuantum={timeQuantum}
        timezone={timezone}
        editableTimezone={editableTimezone}
        showTimezone={showTimezone}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        handleTimeQuantumChange={handleTimeQuantumChange}
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
