
import React from 'react';
import TimePicker from '../src/components/TimePicker';
import timeHelper from '../src/utils/time';
import ICONS from '../src/utils/icons';

class TimePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    const { defaultTime, meridiem, focused, showTimezone, timezone } = props;
    let hour = '';
    let minute = '';
    if (!defaultTime) {
      [hour, minute] = timeHelper.current().split(/:/);
    } else {
      [hour, minute] = defaultTime.split(/:/);
    }

    this.state = {
      1: {
        hour,
        minute,
        meridiem,
        focused,
        timezone,
        showTimezone,
      },
      2: {
        hour,
        minute,
        meridiem,
        focused,
        timezone,
        showTimezone,
      }
    };

    this.onFocusChange = this.onFocusChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.handleFocusedChange = this.handleFocusedChange.bind(this);
  }

  onTimeChange(section) {

    return (options) => {
      const {
        hour,
        minute,
        meridiem
      } = options;

      this.setState({
        [section]: Object.assign({}, this.state[section], {
          hour, minute, meridiem
        })
      });
    };
  }

  onFocusChange(section) {
    return focused => this.setState({
      [section]: Object.assign({}, this.state[section], {
        focused
      })
    });
  }

  handleFocusedChange(section) {
    return () => this.setState({
      [section]: Object.assign({}, this.state[section], {
        focused: !this.state[section].focused
      })
    });
  }

  getBasicTrigger() {
    const { hour, minute } = this.state;
    return (
      <div
        onClick={this.handleFocusedChange}
        className="time_picker_trigger"
      >
        <div>
          Click to open panel<br />
          {hour}:{minute}
        </div>
      </div>
    );
  }

  getCustomTrigger() {
    return (
      <div
        onClick={this.handleFocusedChange}
        className="time_picker_trigger"
      >
        {ICONS.time}
      </div>
    );
  }

  getTrigger(section) {
    const { customTriggerId } = this.props;
    const triggers = {
      0: (<div />),
      1: this.getBasicTrigger(section),
      2: this.getCustomTrigger()
    };
    return triggers[customTriggerId] || null;
  }

  renderTrigger(section) {
    const {
      hour,
      minute,
      focused,
      meridiem,
      timezone,
      showTimezone,
    } = this.state[section];

    return (
      <TimePicker
        id={section}
        trigger={this.getTrigger(section)}
        {...this.props}
        focused={focused}
        meridiem={meridiem}
        timezone={timezone}
        onFocusChange={this.onFocusChange(section)}
        onTimeChange={this.onTimeChange(section)}
        showTimezone={showTimezone}
        time={hour && minute ? `${hour}:${minute}` : null}
      />
    );
  }

  render() {
    return (
      <div className="time_picker_wrapper2">
        {this.renderTrigger(1)}
        <div className="gap" />
        {this.renderTrigger(2)}
      </div>
    );
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
