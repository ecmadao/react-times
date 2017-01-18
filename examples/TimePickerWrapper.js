import React from 'react';
import TimePicker from '../src/components/TimePicker';
import timeHelper from '../src/time';

class TimePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    const { defaultTime, timeQuantum } = props;
    let hour = '', minute = '';
    if (defaultTime) {
      [ hour, minute ] = defaultTime.split(':');
    }
    this.state = {
      hour,
      minute,
      timeQuantum
    };
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

  render() {
    const { hour, minute, timeQuantum } = this.state;

    return (
      <div className="time_picker_wrapper">
        <TimePicker
          time={hour && minute ? `${hour}:${minute}` : null}
          timeQuantum={timeQuantum}
          onHourChange={this.onHourChange}
          onMinuteChange={this.onMinuteChange}
          onTimeChange={this.onTimeChange}
          onTimeQuantumChange={this.onTimeQuantumChange}
          {...this.props}
        />
      </div>
    )
  }
}

export default TimePickerWrapper;
