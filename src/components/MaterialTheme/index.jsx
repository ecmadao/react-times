import React, {PropTypes} from 'react';

import {
  HOURS,
  MINUTES,
  MAX_ABSOLUTE_POSITION,
  MIN_ABSOLUTE_POSITION
} from '../../ConstValue.js';

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

import PickerDargHandler from '../PickerDargHandler';
import PickerPoint from '../PickerPoint.jsx';

class MaterialTheme extends React.Component {
  constructor(props) {
    super(props);
    let hour = parseInt(this.props.hour);
    let pointerRotate = 0;
    HOURS.map((h, index) => {
      if (hour === index + 1) {
        pointerRotate = index < 12 ? 360 * (index + 1) / 12 : 360 * (index + 1 - 12) / 12;
      }
    });
    this.state = {
      step: 0,
      pointerRotate
    }
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDegreeChange = this.handleDegreeChange.bind(this);
    this.handleTimePointerClick = this.handleTimePointerClick.bind(this);
  }

  handleStepChange(step) {
    let stateStep = this.state.step;
    if (stateStep !== step) {
      this.setState({step});
    }
  }

  handleTimePointerClick(time, pointerRotate) {
    this.setState({pointerRotate});
    this.handleTimeChange(time);
  }

  handleDegreeChange(pointerRotate) {
    this.setState({pointerRotate});
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
        <PickerDargHandler
          step={step}
          pointerRotate={pointerRotate}
          time={step === 0 ? parseInt(hour) : parseInt(minute)}
          minLength={step === 0 ? MIN_ABSOLUTE_POSITION : MAX_ABSOLUTE_POSITION}
          splitNum={step === 0 ? 12 : 60}
          handleTimeChange={this.handleTimeChange}
          handleDegreeChange={this.handleDegreeChange}>
          {step === 0 ? this.renderHourPointes() : this.renderMinutePointes()}
        </PickerDargHandler>
      </div>
    )
  }
}

MaterialTheme.propTypes = propTypes;
MaterialTheme.defaultProps = defaultProps;

export default MaterialTheme;
