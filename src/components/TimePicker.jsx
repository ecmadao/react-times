import React, {PropTypes} from 'react';
import moment from 'moment';

import OutsideClickHandler from './OutsideClickHandler';
import MaterialTheme from './MaterialTheme';
import ClassicTheme from './ClassicTheme';
import TimeIcon from '../svg/time.svg';

import {
  initialTime,
  getValidateTime,
  getValidateTimeMode
} from '../utils.js';

const propTypes = {
  defaultTime: PropTypes.string,
  focused: PropTypes.bool,
  autoMode: PropTypes.bool,
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
  onTimeChange: PropTypes.func
};

const defaultProps = {
  defaultTime: moment().format("HH:mm"),
  focused: false,
  autoMode: true,
  placeholder: '',
  colorPalette: "light",
  timeMode: 24,
  theme: "material",
  withoutIcon: false,
  onFocusChange: () => {},
  onHourChange: () => {},
  onMinuteChange: () => {},
  onTimeChange: () => {},
};

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    const {defaultTime, focused, timeMode} = props;
    const [hour, minute, timeInterval] = initialTime(defaultTime, getValidateTimeMode(timeMode));
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
    this.handleHourAndMinuteChange = this.handleHourAndMinuteChange.bind(this);
  }

  onFocus() {
    this.setState({
      focused: true
    });
    const { onFocusChange } = this.props;
    onFocusChange && onFocusChange(true);
  }

  onClearFocus() {
    this.setState({
      focused: false
    });
    const { onFocusChange } = this.props;
    onFocusChange && onFocusChange(false);
  }

  handleHourChange(hour) {
    hour = getValidateTime(hour);
    this.setState({hour});
    const { onHourChange } = this.props;
    onHourChange && onHourChange(hour);
    this.handleTimeChange({ hour });
  }

  handleMinuteChange(minute) {
    minute = getValidateTime(minute);
    this.setState({ minute });
    const { onMinuteChange } = this.props;
    onMinuteChange && onMinuteChange(minute);
    this.handleTimeChange({ minute });
  }

  handleTimeIntervalChange(timeInterval) {
    this.setState({ timeInterval });
    this.handleTimeChange({ timeInterval });
  }

  handleHourAndMinuteChange(time) {
    const { onTimeChange, autoMode } = this.props;
    let [hour, minute] = time.split(':');
    hour = getValidateTime(hour);
    minute = getValidateTime(minute);
    this.setState({ hour, minute });
    if (autoMode) {
      this.onClearFocus();
    }
    return onTimeChange && onTimeChange(time);
  }

  handleTimeChange(timeObject) {
    let { timeInterval, hour, minute } = this.state;

    timeInterval = timeObject["timeInterval"] ? timeObject["timeInterval"] : timeInterval;
    hour = timeObject["hour"] ? timeObject["hour"] : hour;
    minute = timeObject["minute"] ? timeObject["minute"] : minute;

    const { onTimeChange } = this.props;
    if (timeInterval) {
      return onTimeChange && onTimeChange(`${hour}:${minute} ${timeInterval}`);
    }
    return onTimeChange && onTimeChange(`${hour}:${minute}`);
  }

  renderMaterialTheme() {
    const { hour, minute, timeInterval } = this.state;
    const { timeMode, autoMode } = this.props;

    return (
      <MaterialTheme
        hour={hour}
        minute={minute}
        timeMode={timeMode}
        autoMode={autoMode}
        timeInterval={timeInterval}
        clearFoucs={this.onClearFocus}
        handleHourChange={this.handleHourChange}
        handleMinuteChange={this.handleMinuteChange}
        handleTimeIntervalChange={this.handleTimeIntervalChange}
      />
    )
  }

  renderClassicTheme() {
    const { hour, minute } = this.state;
    return (
      <ClassicTheme
        hour={hour}
        minute={minute}
        handleTimeChange={this.handleHourAndMinuteChange}
      />
    )
  }

  componentWillReceiveProps(nextProps) {
    this.handleHourAndMinuteChange(nextProps.defaultTime);
  }

  render() {
    const { placeholder, colorPalette, withoutIcon, timeMode, theme } = this.props;
    const { hour, minute, focused, timeInterval } = this.state;
    const validateTimeMode = getValidateTimeMode(timeMode);
    let times = `${hour} : ${minute}`;
    if (validateTimeMode === 12) {
      times = `${times} ${timeInterval}`
    }
    const pickerPreviewClass = focused ? "time_picker_preview active" : "time_picker_preview";
    const containerClass = colorPalette === 'dark' ? "time_picker_container dark" : "time_picker_container";
    const previewContainerClass = withoutIcon ? "preview_container without_icon" : "preview_container";

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
        <OutsideClickHandler
          onOutsideClick={this.onClearFocus}
          focused={focused}>
          {theme === 'material' ? this.renderMaterialTheme() : this.renderClassicTheme()}
        </OutsideClickHandler>
      </div>
    )
  }
}

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;

export default TimePicker;
