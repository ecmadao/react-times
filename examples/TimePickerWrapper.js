import ICONS from '../src/utils/icons';
import React from 'react';
import TimePicker from '../src/components/TimePicker';
import timeHelper from '../src/utils/time';

class TimePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    const {
      defaultTime,
      timeQuantum,
      focused,
      timezone,
      showTimezone,
      editableTimezone } = props;

    let hour = '', minute = '';

    if (!defaultTime) {
      [hour, minute] = timeHelper.current().split(':');
    } else {
      [hour, minute] = defaultTime.split(':');
    }

    this.state = {
      hour,
      minute,
      timeQuantum,
      focused,
      timezone,
      showTimezone,
      editableTimezone
    };

    this.onFocusChange = this.onFocusChange.bind(this);
    this.onHourChange = this.onHourChange.bind(this);
    this.onMinuteChange = this.onMinuteChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onTimeQuantumChange = this.onTimeQuantumChange.bind(this);
    this.onTimezoneChange = this.onTimezoneChange.bind(this);
    this.onShowTimezoneChange = this.onShowTimezoneChange.bind(this);
    this.onEditTimezoneChange = this.onEditTimezoneChange.bind(this);
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

  onTimezoneChange(timezone) {
    this.setState({ timezone });
  }

  onShowTimezoneChange(showTimezone) {
    this.setState({ showTimezone });
  }

  onEditTimezoneChange(editableTimezone) {
    this.setState({ editableTimezone });
  }

  handleFocusedChange() {
    const { focused } = this.state;
    this.setState({ focused: !focused });
  }

  get basicTrigger() {
    const { hour, minute } = this.state;
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
    const { customTriggerId } = this.props;
    const triggers = {
      0: (<div></div>),
      1: this.basicTrigger,
      2: this.customTrigger
    };
    return triggers[customTriggerId];
  }

  render() {
    const {
      hour,
      minute,
      timeQuantum,
      focused,
      timezone,
      showTimezone,
      editableTimezone } = this.state;

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
          onTimezoneChange = {this.onTimezoneChange}
          onShowTimezoneChange = {this.onShowTimezoneChange}
          onEditTimezoneChange = {this.onEditTimezoneChange}
          trigger={this.trigger}
          focused={focused}
          timezone={timezone}
          showTimezone={showTimezone}
          editableTimezone={editableTimezone}
        />
      </div>
    )
  }
}

TimePickerWrapper.defaultProps = {
  customTriggerId: null,
  focused: false,
  defaultTime: null,
  timeQuantum: 'AM',
  timezone: '',
  showTimezone: false,
  editableTimezone: false
};

export default TimePickerWrapper;
