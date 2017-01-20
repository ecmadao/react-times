import React from 'react';
import TimePicker from '../src/components/TimePicker';
import ICONS from '../src/icons';

class TimePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    const { defaultTime, timeQuantum, focused } = props;
    let hour = '', minute = '';
    if (defaultTime) {
      [ hour, minute ] = defaultTime.split(':');
    }
    this.state = {
      hour,
      minute,
      timeQuantum,
      focused
    };
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onHourChange = this.onHourChange.bind(this);
    this.onMinuteChange = this.onMinuteChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onTimeQuantumChange = this.onTimeQuantumChange.bind(this);
  }

  onHourChange(hour) {
    this.setState({ hour });
  }

  onMinuteChange(minute) {
    this.setState({ minute });
  }

  onTimeChange(time) {
    const [ hour, minute ] = time.split(':');
    this.setState({ hour, minute });
  }

  onTimeQuantumChange(timeQuantum) {
    this.setState({ timeQuantum });
  }

  onFocusChange(focused) {
    this.setState({ focused });
  }

  handleFocusedChange() {
    const { focused } = this.state;
    this.setState({ focused: !focused });
  }

  get trigger() {
    const { hour, minute } = this.state;
    return (
      <div
        onClick={this.handleFocusedChange.bind(this)}
        className="time_picker_trigger">
        {ICONS.time}
        <div>
          Click to open panel<br/>
          {hour}:{minute}
        </div>
      </div>
    )
  }

  render() {
    const { customTrigger } = this.props;
    const { hour, minute, timeQuantum, focused } = this.state;
    const trigger = customTrigger ? this.trigger : null;

    return (
      <div className="time_picker_wrapper">
        <TimePicker
          {...this.props}
          time={hour && minute ? `${hour}:${minute}` : null}
          timeQuantum={timeQuantum}
          onHourChange={this.onHourChange}
          onMinuteChange={this.onMinuteChange}
          onTimeChange={this.onTimeChange}
          onFocusChange={this.onFocusChange}
          onTimeQuantumChange={this.onTimeQuantumChange}
          trigger={trigger}
          focused={focused}
        />
      </div>
    )
  }
}

TimePickerWrapper.defaultProps = {
  customTrigger: null,
  focused: false,
  defaultTime: null,
  timeQuantum: 'AM'
}

export default TimePickerWrapper;
