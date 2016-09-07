import React from 'react';

import {
  HOURS,
  MINUTES,
  MAX_ABSOLUTE_POSITION,
  MIN_ABSOLUTE_POSITION
} from '../ConstValue.js';

import PickerDargHandler from './PickerDargHandler';

class TimePickerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    }
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleStepChange(step) {
    let stateStep = this.state.step;
    if (stateStep !== step) {
      this.setState({step});
    }
  }

  handleTimeChange(time) {
    let {step} = this.state;
    let {handleHourChange, handleMinuteChange} = this.props;
    if (step === 0) {
      handleHourChange && handleHourChange(time);
    } else {
      handleMinuteChange && handleMinuteChange(time * 5);
    }
  }

  render() {
    let {
      hour,
      minute,
      focused
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
        <PickerDargHandler
          step={step}
          data={step === 0 ? parseInt(hour) : parseInt(minute)}
          datas={step === 0 ? HOURS : MINUTES}
          minLength={step === 0 ? MIN_ABSOLUTE_POSITION : MAX_ABSOLUTE_POSITION}
          splitNum={step === 0 ? 12 : 60}
          handleTimeChange={this.handleTimeChange}>
        </PickerDargHandler>
      </div>
    )
  }
}

export default TimePickerModal;
