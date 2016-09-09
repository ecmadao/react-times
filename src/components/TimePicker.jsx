import React, {PropTypes} from 'react';
import moment from 'moment';

import OutsideClickHandler from './OutsideClickHandler';
import MaterialTheme from './MaterialTheme/index';
import TwelveHoursTheme from './TwelveHoursTheme/index';
import TimeIcon from '../svg/time.svg';

import {
  initialTime,
  getValidateTime,
  getValidateTimeMode
} from '../utils.js';

const propTypes = {
  defaultTime: PropTypes.string,
  focused: PropTypes.bool,
  placeholder: PropTypes.string,
  colorPalette: PropTypes.string,
  theme: PropTypes.string,
  timeMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  withoutIcon: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onHourChange: PropTypes.func,
  onMinuteChange: PropTypes.func,
  handleTimeChange: PropTypes.func
};

const defaultProps = {
  defaultTime: moment().format("HH:mm"),
  focused: false,
  placeholder: '',
  colorPalette: "light",
  timeMode: "24",
  theme: "material",
  withoutIcon: false,
  onFocusChange: () => {},
  onHourChange: () => {},
  onMinuteChange: () => {},
  handleTimeChange: () => {}
};

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    let {defaultTime, focused, timeMode} = props;
    let [hour, minute, timeInterval] = initialTime(defaultTime, getValidateTimeMode(timeMode));
    this.state = {
      hour,
      minute,
      focused,
      timeInterval
    }
    this.onFocus = this.onFocus.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleTimeIntervalChange = this.handleTimeIntervalChange.bind(this);
  }

  onFocus() {
    this.setState({
      focused: true
    });
    let {onFocusChange} = this.props;
    onFocusChange && onFocusChange(true);
  }

  onClearFocus() {
    this.setState({
      focused: false
    });
    let {onFocusChange} = this.props;
    onFocusChange && onFocusChange(false);
  }

  handleHourChange(hour) {
    hour = getValidateTime(hour);
    this.setState({hour});
    let {onHourChange} = this.props;
    onHourChange && onHourChange(hour);
    this.handleTimeChange({hour});
  }

  handleMinuteChange(minute) {
    minute = getValidateTime(minute);
    this.setState({minute});
    let {onMinuteChange} = this.props;
    onMinuteChange && onMinuteChange(minute);
    this.handleTimeChange({minute});
  }

  handleTimeIntervalChange(timeInterval) {
    this.setState({timeInterval});
    this.handleTimeChange({timeInterval});
  }

  handleTimeChange(timeObject) {
    let {timeInterval, hour, minute} = this.state;
    timeInterval = timeObject["timeInterval"] ? timeObject["timeInterval"] : timeInterval;
    hour = timeObject["hour"] ? timeObject["hour"] : hour;
    minute = timeObject["minute"] ? timeObject["minute"] : minute;

    let {onTimeChange} = this.props;
    if (timeInterval) {
      return onTimeChange && onTimeChange(`${hour}:${minute} ${timeInterval}`);
    }
    return onTimeChange && onTimeChange(`${hour}:${minute}`);
  }

  renderMaterialTheme() {
    let {hour, minute, focused} = this.state;
    return (
      <MaterialTheme
        hour={hour}
        minute={minute}
        focused={focused}
        handleHourChange={this.handleHourChange}
        handleMinuteChange={this.handleMinuteChange}
      />
    )
  }

  renderTwelveHoursTheme() {
    let {hour, minute, focused, timeInterval} = this.state;
    return (
      <TwelveHoursTheme
        hour={hour}
        minute={minute}
        focused={focused}
        timeInterval={timeInterval}
        handleHourChange={this.handleHourChange}
        handleMinuteChange={this.handleMinuteChange}
        handleTimeIntervalChange={this.handleTimeIntervalChange}
      />
    )
  }

  render() {
    let {placeholder, colorPalette, withoutIcon, timeMode} = this.props;
    let {hour, minute, focused, timeInterval} = this.state;
    timeMode = getValidateTimeMode(timeMode);
    let times = `${hour} : ${minute}`;
    if (timeMode === 12) {
      times = `${times} ${timeInterval}`
    }
    let pickerPreviewClass = focused ? "time_picker_preview active" : "time_picker_preview";
    let containerClass = colorPalette === 'dark' ? "time_picker_container dark" : "time_picker_container";
    let previewContainerClass = withoutIcon ? "preview_container without_icon" : "preview_container";

    return (
      <div className={containerClass}>
        <div
          onClick={this.onFocus}
          className={pickerPreviewClass}>
          <div className={previewContainerClass}>
            {withoutIcon ? '' : <TimeIcon />}
            {placeholder || times}
          </div>
        </div>
        <OutsideClickHandler onOutsideClick={this.onClearFocus}>
          {timeMode === 24 ? this.renderMaterialTheme() : this.renderTwelveHoursTheme()}
        </OutsideClickHandler>
      </div>
    )
  }
}

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;

export default TimePicker;
