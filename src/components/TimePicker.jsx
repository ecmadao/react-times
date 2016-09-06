import React from 'react';

import OutsideClickHandler from './OutsideClickHandler';
import TimePickerModal from './TimePickerModal';

import {
  initialTime
} from '../utils.js';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    let {defaultTime, focused} = props;
    let [hour, minute] = initialTime(defaultTime);
    if (typeof focused === 'undefined') {
      focused = false;
    }
    this.state = {
      hour: hour,
      minute: minute,
      focused: focused
    }
    this.onFocus = this.onFocus.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
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
    if (hour < 10) {
      hour = `0${hour}`;
    }
    this.setState({hour});
    let {onHourChange} = this.props;
    onHourChange && onHourChange(hour);
  }

  handleMinuteChange(minute) {
    if (minute < 10) {
      minute = `0${minute}`;
    }
    this.setState({minute});
    let {onMinuteChange} = this.props;
    onMinuteChange && onMinuteChange(minute);
  }

  render() {
    let {placeholder, theme} = this.props;
    let {hour, minute, focused} = this.state;
    let times = `${hour} : ${minute}`;
    let pickerPreviewClass = focused ? "time_picker_preview active" : "time_picker_preview";
    let containerClass = theme === 'dark' ? "time_picker_container dark" : "time_picker_container";

    return (
      <div className={containerClass}>
        <div
          onClick={this.onFocus}
          className={pickerPreviewClass}>{placeholder || times}</div>
        <OutsideClickHandler onOutsideClick={this.onClearFocus}>
          <TimePickerModal
            hour={hour}
            minute={minute}
            focused={focused}
            handleHourChange={this.handleHourChange}
            handleMinuteChange={this.handleMinuteChange}
          />
        </OutsideClickHandler>
      </div>
    )
  }
}

export default TimePicker;
