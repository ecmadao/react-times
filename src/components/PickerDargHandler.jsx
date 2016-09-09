import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {
  PICKER_RADIUS,
  MAX_ABSOLUTE_POSITION,
  POINTER_RADIUS
} from '../ConstValue.js';
import {
  degree2Radian,
  mousePosition,
  getRotateStyle,
  getInitialPointerStyle,
  getStandardAbsolutePosition
} from '../utils.js';

const propTypes = {
  time: PropTypes.number,
  step: PropTypes.number,
  pointerRotate: PropTypes.number,
  minLength: PropTypes.number,
  rotateState: PropTypes.shape({
    top: PropTypes.number,
    height: PropTypes.number,
    pointerRotate: PropTypes.number
  }),
  handleTimeChange: PropTypes.func,
  handleDegreeChange: PropTypes.func
};

const defaultProps = {
  time: 0,
  step: 0,
  pointerRotate: 0,
  rotateState: {
    top: 0,
    height: 0,
    pointerRotate: 0
  },
  minLength: MAX_ABSOLUTE_POSITION,
  handleTimeChange: () => {},
  handleDegreeChange: () => {}
};

class PickerDargHandler extends React.Component {
  constructor(props) {
    super(props);
    this.startX = 0;
    this.startY = 0;
    this.originX = null;
    this.originY = null;
    this.state = this.initialRotationAndLength();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  initialRotationAndLength() {
    let {rotateState} = this.props;
    let {
      top,
      height,
      pointerRotate
    } = rotateState;

    return {
      top,
      height,
      pointerRotate,
      draging: false
    }
  }

  resetState() {
    this.setState(this.initialRotationAndLength());
  }

  componentDidMount() {
    if (document.addEventListener) {
      document.addEventListener('mousemove', this.handleMouseMove, true);
      document.addEventListener('mouseup', this.handleMouseUp, true);
    } else {
      document.attachEvent('onmousemove', this.handleMouseMove);
      document.attachEvent('onmouseup', this.handleMouseUp);
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      document.removeEventListener('mousemove', this.handleMouseMove, true);
      document.removeEventListener('mouseup', this.handleMouseUp, true);
    } else {
      document.detachEvent('onmousemove', this.handleMouseMove);
      document.detachEvent('onmouseup', this.handleMouseUp);
    }
  }

  componentDidUpdate(prevProps) {
    let {step, time, rotateState} = this.props;
    let prevStep = prevProps.step;
    let prevTime = prevProps.time;
    let PrevRotateState = prevProps.rotateState
    if (step !== prevStep || time !== prevTime || rotateState.pointerRotate !== PrevRotateState.pointerRotate) {
      this.resetState();
    }
  }

  getRadian(x, y) {
    let sRad = Math.atan2(y - this.originY, x - this.originX);
    sRad -= Math.atan2(this.startY - this.originY, this.startX - this.originX);
    sRad += degree2Radian(this.props.rotateState.pointerRotate);
    return sRad;
  }

  getAbsolutePosition(x, y) {
    return Math.sqrt(Math.pow((x - this.originX), 2) + Math.pow((y - this.originY), 2));
  }

  handleMouseDown(e) {
    let event = e || window.event;
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      draging: true
    });
    let pos = mousePosition(event);
    this.startX = pos.x;
    this.startY = pos.y;
    if (!this.originX) {
      let centerPoint = ReactDOM.findDOMNode(this.refs.pickerCenter);
      let centerPointPos = centerPoint.getBoundingClientRect();
      this.originX = centerPointPos.left;
      this.originY = centerPointPos.top;
    }
  }

  handleMouseMove(e) {
    if (this.state.draging) {
      let pos = mousePosition(e);
      let dragX = pos.x;
      let dragY = pos.y;
      if (this.originX !== dragX && this.originY !== dragY) {
        let sRad = this.getRadian(dragX, dragY);
        let pointerRotate = sRad * (360 / (2 * Math.PI));
        let absolutePosition = this.getAbsolutePosition(dragX, dragY);
        absolutePosition = getStandardAbsolutePosition(absolutePosition, MAX_ABSOLUTE_POSITION / 2);
        let height = absolutePosition - POINTER_RADIUS;
        let top = PICKER_RADIUS - height;
        this.setState({
          top,
          height,
          pointerRotate
        });
      }
    }
  }

  handleMouseUp(e) {
    if (this.state.draging) {
      this.setState({
        draging: false
      });

      let {
        minLength,
        step,
        handleTimeChange,
        handleDegreeChange
      } = this.props;

      let pos = mousePosition(e);
      let endX = pos.x;
      let endY = pos.y;

      let sRad = this.getRadian(endX, endY);
      let degree = sRad * (360 / (2 * Math.PI));

      if (degree < 0) {
        degree = 360 + degree;
      }
      let roundSeg = Math.round(degree / (360 / 12));
      let pointerRotate = roundSeg * (360 / 12);

      let absolutePosition = this.getAbsolutePosition(endX, endY);

      absolutePosition = getStandardAbsolutePosition(absolutePosition, minLength);
      if (minLength < absolutePosition && absolutePosition < MAX_ABSOLUTE_POSITION) {
        if ((absolutePosition - minLength) > (MAX_ABSOLUTE_POSITION - minLength) / 2) {
          absolutePosition = MAX_ABSOLUTE_POSITION;
        } else {
          absolutePosition = minLength;
        }
      }
      if (roundSeg > 12) {
        roundSeg = roundSeg - 12;
      }
      let time = absolutePosition === minLength ? roundSeg : roundSeg + 12;
      time = step === 0 ? time : time * 5;
      handleTimeChange && handleTimeChange(time);
      handleDegreeChange && handleDegreeChange(pointerRotate);
    }
  }

  render() {
    let {time} = this.props;
    let {draging, height, top, pointerRotate} = this.state;
    let pickerPointerClass = draging ? "picker_pointer" : "picker_pointer animation";

    return (
      <div className="picker_handler">
        <div
          ref="dragPointer"
          className={pickerPointerClass}
          style={getInitialPointerStyle(height, top, pointerRotate)}>
          <div
            className="pointer_drag"
            style={getRotateStyle(-pointerRotate)}
            onMouseDown={this.handleMouseDown}>{time}</div>
        </div>
        <div
          className="picker_center"
          ref="pickerCenter"></div>
      </div>
    )
  }
}

PickerDargHandler.propTypes = propTypes;
PickerDargHandler.defaultProps = defaultProps;

export default PickerDargHandler;
