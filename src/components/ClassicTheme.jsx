import React from 'react';
import {
  TIMES_24_MODE
} from '../ConstValue';
import '../../css/classic/base.css';

class ClassicTheme extends React.Component {
  constructor(props) {
    super(props);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleTimeChange(time) {
    const {
      handleHourChange,
      handleMinuteChange
    } = this.props;
    const [hour, minute] = time.split(':');
    handleHourChange && handleHourChange(hour);
    handleMinuteChange && handleMinuteChange(minute);
  }

  renderTimes() {
    return TIMES_24_MODE.map((hourValue, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            this.handleTimeChange(hourValue);
          }}
          className="classic_time">
          {hourValue}
        </div>
      );
    });
  }

  render() {
    const {
      hour,
      minute
    } = this.props;
    return (
      <div className="classic_theme_container">
        {this.renderTimes()}
      </div>
    )
  }
}

export default ClassicTheme;
