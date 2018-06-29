
import React from 'react';
import PropTypes from 'prop-types';
import {
  TIMES_12_MODE,
  TIMES_24_MODE
} from '../../utils/constant';
import timeHelper from '../../utils/time';

const propTypes = {
  hour: PropTypes.string,
  minute: PropTypes.string,
  timeMode: PropTypes.number,
  meridiem: PropTypes.string,
  clearFocus: PropTypes.func,
  colorPalette: PropTypes.string,
  handleTimeChange: PropTypes.func,
  handleMeridiemChange: PropTypes.func
};

const defaultProps = {
  hour: '00',
  minute: '00',
  timeMode: 24,
  meridiem: 'AM',
  colorPalette: 'light',
  clearFocus: () => {},
  handleTimeChange: () => {},
  handleMeridiemChange: () => {}
};

class ClassicTheme extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleTimeChange(timeData) {
    const [time, meridiem] = timeData.split(' ');
    const [hour, minute] = time.split(':');
    const { handleTimeChange, clearFocus } = this.props;
    handleTimeChange && handleTimeChange({
      hour,
      minute,
      meridiem: meridiem || null
    });
    clearFocus && clearFocus();
  }

  checkTimeIsActive(time) {
    const { hour, minute, meridiem } = this.props;
    const [times, rawMeridiem] = time.split(' ');
    const [rawHour, rawMinute] = times.split(':');
    const currentHour = timeHelper.validate(rawHour);
    const currentMinute = timeHelper.validate(rawMinute);

    if (hour !== currentHour) {
      return false;
    }
    if (meridiem && meridiem !== rawMeridiem) {
      return false;
    }
    if (Math.abs(parseInt(minute, 10) - parseInt(currentMinute, 10)) < 15) {
      return true;
    }
    return false;
  }

  renderTimes(timeDatas) {
    const { colorPalette } = this.props;

    return timeDatas.map((timeData, index) => {
      const timeClass = this.checkTimeIsActive(timeData)
        ? 'classic_time active'
        : 'classic_time';
      const [time, meridiem] = timeData.split(' ');
      return (
        <div
          key={index}
          onClick={() => {
            this.handleTimeChange(timeData);
          }}
          className={`${timeClass} ${colorPalette}`}
        >
          {time}
          {meridiem ? <span className="meridiem">{meridiem}</span> : null}
        </div>
      );
    });
  }

  render() {
    const { timeMode } = this.props;
    const timeDatas = timeMode === 12 ? TIMES_12_MODE : TIMES_24_MODE;
    return (
      <div className="modal_container classic_theme_container">
        {this.renderTimes(timeDatas)}
      </div>
    );
  }
}

ClassicTheme.propTypes = propTypes;
ClassicTheme.defaultProps = defaultProps;

export default ClassicTheme;
