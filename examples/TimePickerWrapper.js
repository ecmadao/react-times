import React from 'react';
import TimePicker from '../src/components/TimePicker';
import timeHelper from '../src/utils/time';
import ICONS from '../src/utils/icons';
import moment from 'moment';

class TimePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    const {defaultTime, meridiem, focused, showTimezone, timezone} = props;
    let hour = '', minute = '';
    if (!defaultTime) {
      [hour, minute] = timeHelper.current().split(/:/);
    } else {
      [hour, minute] = defaultTime.split(/:/);
    }

    this.state = {
      hour,
      minute,
      meridiem,
      focused,
      timezone,
      showTimezone,
    };

    this.onFocusChange = this.onFocusChange.bind(this);
    this.onHourChange = this.onHourChange.bind(this);
    this.onMeridiemChange = this.onMeridiemChange.bind(this);
    this.onMinuteChange = this.onMinuteChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  onHourChange(hour) {
    this.setState({hour});
  }

  onMinuteChange(minute) {
    this.setState({minute});
  }

  onTimeChange(time) {
    const [hour, minute] = time.split(':');
    this.setState({hour, minute});
  }

  onMeridiemChange(meridiem) {
    this.setState({meridiem});
  }

  onFocusChange(focused) {
    this.setState({focused});
  }

  handleFocusedChange() {
    const {focused} = this.state;
    this.setState({focused: !focused});
  }

  get basicTrigger() {
    const {hour, minute} = this.state;
    return (
      <div
        onClick={this.handleFocusedChange.bind(this)}
        className="time_picker_trigger">
        <div>
          Click to open panel<br/>
          {hour}:{minute}
        </div>
      </div>
    )
  }

  get customTrigger() {
    return (
      <div
        onClick={this.handleFocusedChange.bind(this)}
        className="time_picker_trigger">
        {ICONS.time}
      </div>
    );
  }

  get trigger() {
    const {customTriggerId} = this.props;
    const triggers = {
      0: (<div></div>),
      1: this.basicTrigger,
      2: this.customTrigger
    };
    return triggers[customTriggerId];
  }

  render() {
    const {hour, minute, meridiem, focused, timezone, showTimezone} = this.state;

    return (
      <div className="time_picker_wrapper">
        <TimePicker
          {...this.props}
          focused={focused}
          meridiem={meridiem}
          onFocusChange={this.onFocusChange}
          onHourChange={this.onHourChange}
          onMeridiemChange={this.onMeridiemChange}
          onMinuteChange={this.onMinuteChange}
          onTimeChange={this.onTimeChange}
          showTimezone={showTimezone}
          time={hour && minute ? `${hour}:${minute}` : null}
          timezone={timezone}
          trigger={this.trigger}
        />
      </div>
    )
  }
}

TimePickerWrapper.defaultProps = {
  customTriggerId: null,
  defaultTime: null,
  focused: false,
  meridiem: null,
  showTimezone: false
};

export default TimePickerWrapper;
