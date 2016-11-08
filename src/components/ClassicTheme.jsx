import React, {PropTypes} from 'react';
import {
  TIMES_24_MODE
} from '../ConstValue';
import {
  getValidateTime
} from '../utils';

const propTypes = {
  hour: PropTypes.string,
  minute: PropTypes.string,
  handleHourChange: PropTypes.func,
  handleMinuteChange: PropTypes.func,
  handleModalClose: PropTypes.func
};

const defaultProps = {
  hour: '00',
  minute: '00',
  handleHourChange: () => {},
  handleMinuteChange: () => {},
  handleModalClose: () => {}
};

class ClassicTheme extends React.Component {
  constructor(props) {
    super(props);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleTimeChange(time) {
    const {
      handleHourChange,
      handleMinuteChange,
      handleModalClose
    } = this.props;
    const [hour, minute] = time.split(':');
    handleHourChange && handleHourChange(hour);
    handleMinuteChange && handleMinuteChange(minute);
    handleModalClose && handleModalClose();
  }

  checkTimeIsActive(time) {
    const {hour, minute} = this.props;
    const times = time.split(':');
    const currentHour = getValidateTime(times[0]);
    const currentMinute = getValidateTime(times[1]);
    if (hour !== currentHour) {
      return false;
    }
    if (Math.abs(minute - currentMinute) < 15) {
      return true;
    }
    return false;
  }

  renderTimes() {
    return TIMES_24_MODE.map((hourValue, index) => {
      const timeClass = this.checkTimeIsActive(hourValue) ? 'classic_time active' : 'classic_time';
      return (
        <div
          key={index}
          onClick={() => {
            this.handleTimeChange(hourValue);
          }}
          className={timeClass}>
          {hourValue}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="classic_theme_container">
        {this.renderTimes()}
      </div>
    )
  }
}

ClassicTheme.propTypes = propTypes;
ClassicTheme.defaultProps = defaultProps;

export default ClassicTheme;
