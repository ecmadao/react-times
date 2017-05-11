import React from 'react';
import TimeZonePicker from '../src/components/TimeZone/TimeZonePicker';

class TimeZonePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
  }

  handleFocusedChange() {
    const {focused} = this.state;
    this.setState({focused: !focused});
  }

  render() {
    const {focused} = this.state;

    return (
      <div>
          <div onClick={this.handleFocusedChange.bind(this)}>
              Click Me
          </div>
        <TimeZonePicker focused={focused} />
      </div>
    )
  }
}

export default TimeZonePickerWrapper;
