import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {
  HOURS,
  MINUTES,
  POINTER_RADIUS,
  PICKER_RADIUS,
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
import PickerPoint from './PickerPoint';

class MaterialTheme extends React.Component {
  constructor(props) {
    super(props);
    let pointerRotate = this.resetHourDegree();
    this.state = {
      step: 0,
      pointerRotate
    }
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimePointerClick = this.handleTimePointerClick.bind(this);
  }

  handleStepChange(step) {
    let stateStep = this.state.step;
    if (stateStep !== step) {
      ReactDOM.findDOMNode(this.pickerPointerContainer).className = "animation";
      setTimeout(() => {
        ReactDOM.findDOMNode(this.pickerPointerContainer).className = "";
        let pointerRotate = 0;
        if (step === 0) {
          pointerRotate = this.resetHourDegree();
        } else {
          pointerRotate = this.resetMinuteDegree();
        }
        this.setState({
          step,
          pointerRotate
        });
      }, 300);
    }
  }

  handleTimePointerClick(time, pointerRotate) {
    this.setState({pointerRotate});
    this.handleTimeChange(time);
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

  resetHourDegree() {
    let hour = parseInt(this.props.hour);
    let pointerRotate = 0;
    HOURS.forEach((h, index) => {
      if (hour === index + 1) {
        pointerRotate = index < 12 ? 360 * (index + 1) / 12 : 360 * (index + 1 - 12) / 12;
      }
    });
    return pointerRotate;
  }

  resetMinuteDegree() {
    let minute = parseInt(this.props.minute);
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
    let height = time <= splitNum ? minLength - POINTER_RADIUS : MAX_ABSOLUTE_POSITION - POINTER_RADIUS;
    let top = time <= splitNum ? PICKER_RADIUS - minLength + POINTER_RADIUS : PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS;
    return [top, height];
  }

  renderMinutePointes() {
    return MINUTES.map((m, index) => {
      let angle = 360 * index / 60;
      if (index % 5 === 0) {
        return (
          <PickerPoint
            index={index}
            key={index}
            angle={angle}
            handleTimeChange={this.handleTimePointerClick}
          />
        )
      }
    });
  }

  renderHourPointes() {
    return HOURS.map((h, index) => {
      let pointClass = index < 12 ? "picker_point point_inner" : "picker_point point_outter";
      let angle = index < 12 ? 360 * (index + 1) / 12 : 360 * (index + 1 - 12) / 12;
      return (
        <PickerPoint
          index={index + 1}
          key={index}
          angle={angle}
          pointClass={pointClass}
          handleTimeChange={this.handleTimePointerClick}
        />
      )
    });
  }

  render() {
    let {
      hour,
      minute,
      focused
    } = this.props;
    let {step, pointerRotate} = this.state;

    let activeHourClass = step === 0 ? "time_picker_header active" : "time_picker_header";
    let activeMinuteClass = step === 1 ? "time_picker_header active" : "time_picker_header";
    let modalContainerClass = focused ? "time_picker_modal_container active" : "time_picker_modal_container";
    let [top, height] = this.getTopAndHeight();
    let rotateState = {
      top,
      height,
      pointerRotate
    };

    return (
      <div className={modalContainerClass}>
        <div className="time_picker_modal_header">
          <span
            className={activeHourClass}
            onClick={this.handleStepChange.bind(this, 0)}>{hour}</span>
          &nbsp;:&nbsp;
          <span className={activeMinuteClass}
            onClick={this.handleStepChange.bind(this, 1)}>{minute}</span>
        </div>
        <div className="picker_container">
          <div
            ref={(container) => this.pickerPointerContainer = container}
            id="picker_pointer_container">
            {step === 0 ? this.renderHourPointes() : this.renderMinutePointes()}
          </div>
          <PickerDargHandler
            step={step}
            rotateState={rotateState}
            time={step === 0 ? parseInt(hour) : parseInt(minute)}
            minLength={step === 0 ? MIN_ABSOLUTE_POSITION : MAX_ABSOLUTE_POSITION}
            handleTimePointerClick={this.handleTimePointerClick} />
        </div>
      </div>
    )
  }
}

MaterialTheme.propTypes = propTypes;
MaterialTheme.defaultProps = defaultProps;

export default MaterialTheme;
