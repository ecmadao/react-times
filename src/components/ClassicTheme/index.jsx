import React, { PropTypes } from 'react';
import {
  TIMES_12_MODE,
  TIMES_24_MODE
} from '../../utils/const_value';
import timeHelper from '../../utils/time';

const propTypes = {
  hour: PropTypes.string,
  minute: PropTypes.string,
  timeMode: PropTypes.number,
  timeQuantum: PropTypes.string,
  colorPalette: PropTypes.string,
  handleTimeChange: PropTypes.func,
  handleTimeQuantumChange: PropTypes.func
};

const defaultProps = {
  hour: '00',
  minute: '00',
  timeMode: 24,
  timeQuantum: 'AM',
  colorPalette: 'light',
  handleTimeChange: () => {},
  handleTimeQuantumChange: () => {}
};

class ClassicTheme extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handle12ModeHourChange = this.handle12ModeHourChange.bind(this);
    this.handle24ModeHourChange = this.handle24ModeHourChange.bind(this);
  }

  handle12ModeHourChange(time) {
    const [times, quantum] = time.split(' ');
    const { handleTimeChange, handleTimeQuantumChange } = this.props;
    handleTimeQuantumChange && handleTimeQuantumChange(quantum);
    handleTimeChange && handleTimeChange(times);
  }

  handle24ModeHourChange(time) {
    const { handleTimeChange } = this.props;
    handleTimeChange && handleTimeChange(time);
  }

  checkTimeIsActive(time) {
    const { hour, minute, timeQuantum } = this.props;
    const [times, quantum] = time.split(' ');
    const [rawHour, rawMinute] = time.split(':');
    const currentHour = timeHelper.validate(rawHour);
    const currentMinute = timeHelper.validate(rawMinute);

    if (hour !== currentHour) {
      return false;
    }
    if (quantum && quantum !== timeQuantum) {
      return false;
    }
    if (Math.abs(parseInt(minute) - parseInt(currentMinute)) < 15) {
      return true;
    }
    return false;
  }

  render12Hours() {
    const { colorPalette } = this.props;
    return TIMES_12_MODE.map((hourValue, index) => {
      const timeClass = this.checkTimeIsActive(hourValue)
        ? 'classic_time active'
        : 'classic_time';
      return (
        <div
          key={index}
          onClick={() => {
            this.handle12ModeHourChange(hourValue);
          }}
          className={`${timeClass} ${colorPalette}`}>
          {hourValue}
        </div>
      );
    });
  }

  render24Hours() {
    const { colorPalette } = this.props;
    return TIMES_24_MODE.map((hourValue, index) => {
      const timeClass = this.checkTimeIsActive(hourValue)
        ? 'classic_time active'
        : 'classic_time';
      return (
        <div
          key={index}
          onClick={() => {
            this.handle24ModeHourChange(hourValue);
          }}
          className={`${timeClass} ${colorPalette}`}>
          {hourValue}
        </div>
      );
    });
  }

  render() {
    const { timeMode } = this.props;
    return (
      <div className="classic_theme_container">
        {timeMode === 12 ? this.render12Hours() : this.render24Hours()}
      </div>
    );
  }
}

ClassicTheme.propTypes = propTypes;
ClassicTheme.defaultProps = defaultProps;

export default ClassicTheme;
