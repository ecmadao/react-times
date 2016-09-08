import React, {PropTypes} from 'react';

import {
  HOURS,
  MINUTES,
  MAX_ABSOLUTE_POSITION,
  MIN_ABSOLUTE_POSITION
} from '../ConstValue.js';

const propTypes = {
  hour: PropTypes.string,
  minute: PropTypes.string,
  focused: PropTypes.bool,
  handleHourChange: PropTypes.func,
  handleMinuteChange: PropTypes.func
};

const defaultProps = {
  hour: '00',
  minute: '00',
  focused: false,
  handleHourChange: () => {},
  handleMinuteChange: () => {}
};

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
    time = parseInt(time);
    let {step} = this.state;
    let {handleHourChange, handleMinuteChange} = this.props;
    if (step === 0) {
      handleHourChange && handleHourChange(time);
    } else {
      handleMinuteChange && handleMinuteChange(time);
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

TimePickerModal.propTypes = propTypes;
TimePickerModal.defaultProps = defaultProps;

export default TimePickerModal;
