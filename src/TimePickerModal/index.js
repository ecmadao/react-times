import React from 'react';

import HourPicker from './HourPicker';
import MinutePicker from './MinutePicker';

class TimePickerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    }
    this.handleHourChange = this.handleHourChange.bind(this);
  }

  handleStepChange(step) {
    let stateStep = this.state.step;
    if (stateStep !== step) {
      this.setState({step});
    }
  }

  handleHourChange(hour) {
    let {handleHourChange} = this.props;
    handleHourChange && handleHourChange(hour);
    // this.handleStepChange(1);
  }

  render() {
    let {
      hour,
      minute,
      focused,
      handleMinuteChange
    } = this.props;
    let {step} = this.state;

    let activeHourClass = step === 0 ? "time_picker_header active" : "time_picker_header";
    let activeMinuteClass = step === 1 ? "time_picker_header active" : "time_picker_header";
    let modalContainerClass = focused ? "time_picker_modal_container active" : "time_picker_modal_container";

    return (
      <div className={modalContainerClass}>
        <div className="time_picker_modal_header">
          <span
            className={activeHourClass}
            onClick={this.handleStepChange.bind(this, 0)}>{hour}</span> : <span className={activeMinuteClass}
            onClick={this.handleStepChange.bind(this, 1)}>{minute}</span>
        </div>
        {step === 0 ? <HourPicker handleHourChange={this.handleHourChange} hour={parseInt(hour)} /> : <MinutePicker handleMinuteChange={handleMinuteChange.bind(this)} minute={parseInt(minute)} />}
      </div>
    )
  }
}

export default TimePickerModal;
