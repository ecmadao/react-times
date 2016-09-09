import React from 'react';
import TimePicker from '../src/components/TimePicker';

class TimePickerWrapper extends React.Component {
  onHourChange(hour) {
    console.log(hour);
  }

  onMinuteChange(minute) {
    console.log(minute);
  }

  onTimeChange(time) {
    console.log(time);
  }

  render() {
    return (
      <div className="time_picker_wrapper">
        <TimePicker
          {...this.props}
          onHourChange={this.onHourChange.bind(this)}
          onMinuteChange={this.onMinuteChange.bind(this)}
          onTimeChange={this.onTimeChange.bind(this)}
        />
      </div>
    )
  }
}

export default TimePickerWrapper;
