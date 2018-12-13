import React from 'react';
import PropTypes from 'prop-types';
import {
  HOURS,
  MINUTES,
  PICKER_RADIUS,
  POINTER_RADIUS,
  MAX_ABSOLUTE_POSITION,
  MIN_ABSOLUTE_POSITION,
} from '../../utils/constant.js';
import PickerDragHandler from '../Picker/PickerDragHandler';
import pickerPointGenerator from '../Picker/PickerPointGenerator';

const propTypes = {
  step: PropTypes.number,
  hour: PropTypes.string,
  autoMode: PropTypes.bool,
  minute: PropTypes.string,
  handleHourChange: PropTypes.func,
  handleMinuteChange: PropTypes.func,
  clearFocus: PropTypes.func
};

const defaultProps = {
  step: 0,
  hour: '00',
  minute: '00',
  autoMode: true,
  clearFocus: Function.prototype,
  handleHourChange: Function.prototype,
  handleMinuteChange: Function.prototype,
};

class TwentyFourHoursMode extends React.PureComponent {
  constructor(props) {
    super(props);
    const pointerRotate = this.resetHourDegree();
    const { step } = props;
    this.state = {
      step,
      pointerRotate
    };
    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimePointerClick = this.handleTimePointerClick.bind(this);
  }

  handleStepChange(step) {
    const stateStep = this.state.step;
    if (stateStep !== step) {
      this.pickerPointerContainer && this.pickerPointerContainer.addAnimation();
      setTimeout(() => {
        this.pickerPointerContainer && this.pickerPointerContainer.removeAnimation();
        this.setStep(step);
      }, 300);
    }
  }

  setStep(step) {
    const pointerRotate = step === 0
      ? this.resetHourDegree()
      : this.resetMinuteDegree();
    this.setState({
      step,
      pointerRotate
    });
  }

  clearFocus() {
    const { autoClose, clearFocus } = this.props;
    autoClose && clearFocus && clearFocus();
  }

  handleTimePointerClick(options) {
    const {
      time,
      autoMode = null,
      pointerRotate = null,
    } = options;

    const isInteger = function(num) {
      return (num ^ 0) === +num;
    }
    if (Number.isInteger) {
      Number.isInteger(pointerRotate) && this.setState({ pointerRotate: pointerRotate });
    } else {
      isInteger(pointerRotate) && this.setState({ pointerRotate: pointerRotate });
    }
    this.handleTimeChange(time, autoMode);
  }

  handleTimeChange(time, autoMode = null) {
    const validateTime = parseInt(time, 10);
    const { step } = this.state;
    const auto = autoMode === null ? this.props.autoMode : autoMode;

    const {
      handleHourChange,
      handleMinuteChange,
    } = this.props;

    if (step === 0) {
      handleHourChange && handleHourChange(validateTime);
    } else {
      handleMinuteChange && handleMinuteChange(validateTime);
    }
    if (!auto) return;

    if (step === 0) {
      this.handleStepChange(1);
    } else {
      this.clearFocus();
      this.setStep(0);
    }
  }

  resetHourDegree() {
    const hour = parseInt(this.props.hour, 10);
    let pointerRotate = 0;
    HOURS.forEach((h, index) => {
      if (hour === index + 1) {
        pointerRotate = index < 12
          ? (360 * (index + 1)) / 12
          : (360 * ((index + 1) - 12)) / 12;
      }
    });
    return pointerRotate;
  }

  resetMinuteDegree() {
    const minute = parseInt(this.props.minute, 10);
    let pointerRotate = 0;
    MINUTES.forEach((m, index) => {
      if (minute === index) {
        pointerRotate = (360 * index) / 60;
      }
    });
    return pointerRotate;
  }

  getTopAndHeight() {
    const { step } = this.state;
    const { hour, minute } = this.props;
    const time = step === 0 ? hour : minute;
    const splitNum = step === 0 ? 12 : 60;
    const minLength = step === 0
      ? MIN_ABSOLUTE_POSITION
      : MAX_ABSOLUTE_POSITION;
    const height = time < splitNum
      ? minLength - POINTER_RADIUS
      : MAX_ABSOLUTE_POSITION - POINTER_RADIUS;
    const top = time < splitNum
      ? (PICKER_RADIUS - minLength) + POINTER_RADIUS
      : (PICKER_RADIUS - MAX_ABSOLUTE_POSITION) + POINTER_RADIUS;
    return [top, height];
  }

  render() {
    const {
      hour,
      minute,
      timeMode,
      draggable,
      limitDrag,
      minuteStep,
    } = this.props;

    const { step, pointerRotate } = this.state;

    const activeHourClass = step === 0
      ? 'time_picker_header active'
      : 'time_picker_header';
    const activeMinuteClass = step === 1
      ? 'time_picker_header active'
      : 'time_picker_header';
    const [top, height] = this.getTopAndHeight();
    const rotateState = {
      top,
      height,
      pointerRotate
    };
    const type = step === 0 ? 'hour' : 'minute';
    const PickerPointGenerator = pickerPointGenerator(type);

    return (
      <React.Fragment>
        <div className="time_picker_modal_header">
          <span
            className={activeHourClass}
            onClick={() => this.handleStepChange(0)}
          >
            {hour}
          </span>
          <span className="time_picker_header_delivery">:</span>
          <span
            className={activeMinuteClass}
            onClick={() => this.handleStepChange(1)}
          >
            {minute}
          </span>
        </div>
        <div className="picker_container">
          <PickerPointGenerator
            ref={ref => (this.pickerPointerContainer = ref)}
            handleTimePointerClick={this.handleTimePointerClick}
            pointerRotate={pointerRotate}
          />
          <PickerDragHandler
            step={step}
            timeMode={timeMode}
            limitDrag={limitDrag}
            minuteStep={minuteStep}
            draggable={draggable}
            rotateState={rotateState}
            time={step === 0 ? parseInt(hour, 10) : parseInt(minute, 10)}
            minLength={step === 0
              ? MIN_ABSOLUTE_POSITION
              : MAX_ABSOLUTE_POSITION}
            handleTimePointerClick={this.handleTimePointerClick}
          />
        </div>
      </React.Fragment>
    );
  }
}

TwentyFourHoursMode.propTypes = propTypes;
TwentyFourHoursMode.defaultProps = defaultProps;

export default TwentyFourHoursMode;
