import {
  HOURS,
  MAX_ABSOLUTE_POSITION,
  MINUTES,
  MIN_ABSOLUTE_POSITION,
  PICKER_RADIUS,
  POINTER_RADIUS,
} from '../../utils/const_value.js';
import React, {PropTypes} from 'react';

import timeHelper from '../../utils/time';

import PickerDragHandler from '../Picker/PickerDragHandler';
import pickerPointGenerator from '../Picker/PickerPointGenerator';
import TimeZone from '../TimeZone';

const TIME = timeHelper.time();
TIME.current = timeHelper.current();
TIME.tz = timeHelper.guessUserTz();

const propTypes = {
  step: PropTypes.number,
  hour: PropTypes.string,
  autoMode: PropTypes.bool,
  minute: PropTypes.string,
  showTimezone: PropTypes.bool,
  timezone: PropTypes.shape({
    city: PropTypes.string,
    zoneAbbr: PropTypes.string,
    zoneName: PropTypes.string
  }),
  handleHourChange: PropTypes.func,
  handleMinuteChange: PropTypes.func,
  handleTimezoneChange: PropTypes.func,
  handleEditTimezoneChange: PropTypes.func,
  handleShowTimezoneChange: PropTypes.func,
  clearFocus: PropTypes.func
};

const defaultProps = {
  step: 0,
  hour: '00',
  minute: '00',
  autoMode: true,
  showTimezone: false,
  timezone: TIME.tz,
  timezoneIsEditable: false,
  handleHourChange: () => {},
  handleMinuteChange: () => {},
  clearFocus: () => {},
  handleTimezoneChange: () => {},
  handleEditTimezoneChange: () => {},
  handleShowTimezoneChange: () => {}
};

class TwentyFourHoursMode extends React.PureComponent {
  constructor(props) {
    super(props);
    const pointerRotate = this.resetHourDegree();
    const {step} = props;
    this.state = {
      step,
      pointerRotate
    };
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
    const pointerRotate = step === 0 ? this.resetHourDegree() : this.resetMinuteDegree();
    this.setState({
      step,
      pointerRotate
    });
  }

  handleTimePointerClick(time, pointerRotate) {
    this.setState({pointerRotate});
    this.handleTimeChange(time);
  }

  handleTimeChange(time) {
    time = parseInt(time);
    const {step} = this.state;
    const {
      handleHourChange,
      handleMinuteChange,
      autoMode,
      clearFocus
    } = this.props;
    if (step === 0) {
      handleHourChange && handleHourChange(time);
    } else {
      handleMinuteChange && handleMinuteChange(time);
    }
    if (!autoMode) { return }
    if (step === 0) {
      this.handleStepChange(1);
    } else {
      clearFocus();
      this.setStep(0);
    }
  }

  resetHourDegree() {
    const hour = parseInt(this.props.hour);
    let pointerRotate = 0;
    HOURS.forEach((h, index) => {
      if (hour === index + 1) {
        pointerRotate = index < 12 ? 360 * (index + 1) / 12 : 360 * (index + 1 - 12) / 12;
      }
    });
    return pointerRotate;
  }

  resetMinuteDegree() {
    const minute = parseInt(this.props.minute);
    let pointerRotate = 0;
    MINUTES.forEach((m, index) => {
      if (minute === index) {
        pointerRotate = 360 * index / 60;
      }
    });
    return pointerRotate;
  }

  getTopAndHeight() {
    let {step} = this.state;
    let {hour, minute} = this.props;
    let time = step === 0 ? hour : minute;
    let splitNum = step === 0 ? 12 : 60;
    let minLength = step === 0 ? MIN_ABSOLUTE_POSITION : MAX_ABSOLUTE_POSITION;
    let height = time < splitNum
      ? minLength - POINTER_RADIUS
      : MAX_ABSOLUTE_POSITION - POINTER_RADIUS;
    let top = time < splitNum
      ? PICKER_RADIUS - minLength + POINTER_RADIUS
      : PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS;
    return [top, height];
  }

  render() {
    const {
      hour,
      minute,
      draggable,
      phrases,
      showTimezone,
      timezone
    } = this.props;

    const {step, pointerRotate} = this.state;

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
      <div className='time_picker_modal_container'>
        <div className='time_picker_modal_header'>
          <span
            className={activeHourClass}
            onClick={this.handleStepChange.bind(this, 0)}>{hour}</span>
          <span className='time_picker_header_delivery'>:</span>
          <span className={activeMinuteClass}
            onClick={this.handleStepChange.bind(this, 1)}>{minute}</span>
        </div>
        <div className='picker_container'>
          <PickerPointGenerator
            ref={ref => this.pickerPointerContainer = ref}
            handleTimePointerClick={this.handleTimePointerClick}
          />
          <PickerDragHandler
            step={step}
            draggable={draggable}
            rotateState={rotateState}
            time={step === 0 ? parseInt(hour) : parseInt(minute)}
            minLength={step === 0 ? MIN_ABSOLUTE_POSITION : MAX_ABSOLUTE_POSITION}
            handleTimePointerClick={this.handleTimePointerClick} />
        </div>
        {showTimezone
          ? <TimeZone
            phrases={phrases}
            timezone={timezone}
          />
          : ''
        }
      </div>
    );
  }
}

TwentyFourHoursMode.propTypes = propTypes;
TwentyFourHoursMode.defaultProps = defaultProps;

export default TwentyFourHoursMode;
