import React from 'react';
import moment from 'moment';

import OutsideClickHandler from './OutsideClickHandler';
import TimePickerModal from './TimePickerModal';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    let {defaultTime} = props;
    let [hour, minute] = moment().format("HH:mm").split(':');
    if (defaultTime) {
      [hour, minute] = defaultTime.split(':');
    }
    this.state = {
      hour: hour,
      minute: minute,
      focused: false
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
    let {placeholder} = this.props;
    let {hour, minute, focused} = this.state;
    let times = `${hour} : ${minute}`;
    return (
      <div className="time_picker_container">
        <div
          onClick={this.onFocus}
          className="time_picker_preview">{placeholder || times}</div>
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
