import React, {PropTypes} from 'react';
import moment from 'moment';

import OutsideClickHandler from './OutsideClickHandler';
import TimePickerModal from './TimePickerModal';
import TimeIcon from '../svg/time.svg';

import {
  initialTime,
  getValidateTime
} from '../utils.js';

const propTypes = {
  defaultTime: PropTypes.string,
  focused: PropTypes.bool,
  placeholder: PropTypes.string,
  colorPalette: PropTypes.string,
  withoutIcon: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onHourChange: PropTypes.func,
  onMinuteChange: PropTypes.func
};

const defaultProps = {
  defaultTime: moment().format("HH:mm"),
  focused: false,
  placeholder: '',
  colorPalette: 'light',
  withoutIcon: false,
  onFocusChange: () => {},
  onHourChange: () => {},
  onMinuteChange: () => {}
};

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    let {defaultTime, focused} = props;
    let [hour, minute] = initialTime(defaultTime);
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
    hour = getValidateTime(hour);
    this.setState({hour});
    let {onHourChange} = this.props;
    onHourChange && onHourChange(hour);
  }

  handleMinuteChange(minute) {
    minute = getValidateTime(minute);
    this.setState({minute});
    let {onMinuteChange} = this.props;
    onMinuteChange && onMinuteChange(minute);
  }

  render() {
    let {placeholder, colorPalette, withoutIcon} = this.props;
    let {hour, minute, focused} = this.state;
    let times = `${hour} : ${minute}`;
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

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;

export default TimePicker;
