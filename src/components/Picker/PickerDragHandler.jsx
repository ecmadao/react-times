import {
  MAX_ABSOLUTE_POSITION,
  MIN_ABSOLUTE_POSITION,
  PICKER_RADIUS,
  POINTER_RADIUS,
} from '../../utils/const_value.js';
import React, {PropTypes} from 'react';

import ReactDOM from 'react-dom';
import darg from '../../utils/drag';

const propTypes = {
  time: PropTypes.number,
  step: PropTypes.number,
  draggable: PropTypes.bool,
  pointerRotate: PropTypes.number,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  rotateState: PropTypes.shape({
    top: PropTypes.number,
    height: PropTypes.number,
    pointerRotate: PropTypes.number
  }),
  handleTimePointerClick: PropTypes.func
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
  minLength: MIN_ABSOLUTE_POSITION,
  maxLength: MAX_ABSOLUTE_POSITION,
  handleTimePointerClick: () => {}
};

class PickerDragHandler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.startX = 0;
    this.startY = 0;
    this.originX = null;
    this.originY = null;
    this.dragCenterX = null;
    this.dragCenterY = null;
    this.offsetDragCenterX = 0;
    this.offsetDragCenterY = 0;
    this.state = this.initialRotationAndLength();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.resetOrigin = this.resetOrigin.bind(this);
  }

  componentDidMount() {
    this.resetOrigin();
    if (window.addEventListener) {
      window.addEventListener('resize', this.resetOrigin, true);
    } else {
      window.addEventListener('onresize', this.resetOrigin);
    }
    if (document.addEventListener) {
      document.addEventListener('scroll', this.resetOrigin, true);
      document.addEventListener('mousemove', this.handleMouseMove, true);
      document.addEventListener('mouseup', this.handleMouseUp, true);
    } else {
      document.addEventListener('onscroll', this.resetOrigin);
      document.attachEvent('onmousemove', this.handleMouseMove);
      document.attachEvent('onmouseup', this.handleMouseUp);
    }
  }

  componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener('resize', this.resetOrigin, true);
    } else {
      window.detachEvent('onresize', this.resetOrigin);
    }
    if (document.removeEventListener) {
      document.removeEventListener('scroll', this.resetOrigin, true);
      document.removeEventListener('mousemove', this.handleMouseMove, true);
      document.removeEventListener('mouseup', this.handleMouseUp, true);
    } else {
      document.detachEvent('onscroll', this.resetOrigin);
      document.detachEvent('onmousemove', this.handleMouseMove);
      document.detachEvent('onmouseup', this.handleMouseUp);
    }
  }

  componentDidUpdate(prevProps) {
    const {step, time, rotateState} = this.props;
    const prevStep = prevProps.step;
    const prevTime = prevProps.time;
    const PrevRotateState = prevProps.rotateState
    if (step !== prevStep || time !== prevTime || rotateState.pointerRotate !== PrevRotateState.pointerRotate) {
      this.resetState();
    }
  }

  initialRotationAndLength() {
    const {rotateState} = this.props;
    const {
      top,
      height,
      pointerRotate
    } = rotateState;
    this.initialHeight = height;
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

  resetOrigin() {
    const centerPoint = ReactDOM.findDOMNode(this.pickerCenter);
    const centerPointPos = centerPoint.getBoundingClientRect();
    this.originX = centerPointPos.left + centerPoint.clientWidth;
    this.originY = centerPointPos.top + centerPoint.clientHeight;

    this.resetDragCenter();
  }

  resetDragCenter() {
    this.offsetDragCenterX = 0;
    this.offsetDragCenterY = 0;

    const dragCenterPoint = ReactDOM.findDOMNode(this.dragCenter);
    const dragCenterPointPos = dragCenterPoint.getBoundingClientRect();
    this.dragCenterX = dragCenterPointPos.left + dragCenterPoint.clientWidth;
    this.dragCenterY = dragCenterPointPos.top + dragCenterPoint.clientHeight / 2;
  }

  getRadian(x, y) {
    let sRad = Math.atan2(y - this.originY, x - this.originX);
    sRad -= Math.atan2(this.startY - this.originY, this.startX - this.originX);
    sRad += darg.degree2Radian(this.props.rotateState.pointerRotate);
    return sRad;
  }

  getAbsolutePosition(x, y) {
    return Math.sqrt(Math.pow((x - this.originX), 2) + Math.pow((y - this.originY), 2));
  }

  handleMouseDown(e) {
    const event = e || window.event;
    event.preventDefault();
    event.stopPropagation();
    const pos = darg.mousePosition(event);
    this.startX = pos.x;
    this.startY = pos.y;
    if (!this.state.draging) {
      this.resetDragCenter();
      this.offsetDragCenterX = this.dragCenterX - this.startX;
      this.offsetDragCenterY = this.dragCenterY - this.startY;
    }
    this.setState({
      draging: true
    });
  }

  handleMouseMove(e) {
    if (this.state.draging) {
      const {minLength, maxLength} = this.props;
      const pos = darg.mousePosition(e);
      const dragX = pos.x + this.offsetDragCenterX;
      const dragY = pos.y + this.offsetDragCenterY;
      if (this.originX !== dragX && this.originY !== dragY) {
        const sRad = this.getRadian(dragX, dragY);
        const pointerRotate = sRad * (360 / (2 * Math.PI));
        let absolutePosition = this.getAbsolutePosition(dragX, dragY);
        absolutePosition = darg.validatePosition(absolutePosition, minLength, maxLength);
        const height = absolutePosition - POINTER_RADIUS;
        const top = PICKER_RADIUS - height;
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

      const {
        minLength,
        maxLength,
        step,
        handleTimePointerClick
      } = this.props;

      const pos = darg.mousePosition(e);
      const endX = pos.x + this.offsetDragCenterX;
      const endY = pos.y + this.offsetDragCenterY;

      const sRad = this.getRadian(endX, endY);
      let degree = sRad * (360 / (2 * Math.PI));

      if (degree < 0) {
        degree = 360 + degree;
      }
      let roundSeg = Math.round(degree / (360 / 12));
      const pointerRotate = roundSeg * (360 / 12);
      let absolutePosition = this.getAbsolutePosition(endX, endY);

      absolutePosition = darg.validatePosition(absolutePosition, minLength, maxLength);
      if (minLength < absolutePosition && absolutePosition < maxLength) {
        if ((absolutePosition - minLength) > (maxLength - minLength) / 2) {
          absolutePosition = maxLength;
        } else {
          absolutePosition = minLength;
        }
      }
      if (roundSeg > 12) {
        roundSeg = roundSeg - 12;
      }
      let time = absolutePosition === minLength ? roundSeg : roundSeg + 12;
      time = step === 0 ? (time === 24 ? 12 : time) : (time * 5 === 60 ? 0 : time * 5);

      this.setState({pointerRotate});
      handleTimePointerClick && handleTimePointerClick(time, pointerRotate);
    }
  }

  render() {
    const {time, draggable} = this.props;
    const {draging, height, top, pointerRotate} = this.state;
    const pickerPointerClass = draging ? "picker_pointer" : "picker_pointer animation";

    return (
      <div className="picker_handler">
        <div
          ref={d => this.dragPointer = d}
          className={pickerPointerClass}
          style={darg.initialPointerStyle(height, top, pointerRotate)}>
          <div
            ref={r => this.dragCenter = r}
            className={`pointer_drag ${draggable ? 'draggable' : ''}`}
            style={darg.rotateStyle(-pointerRotate)}
            onMouseDown={draggable ? this.handleMouseDown : () => {}}
          >
            {time}
          </div>
        </div>
        <div
          className="picker_center"
          ref={(p) => this.pickerCenter = p}></div>
      </div>
    );
  }
}

PickerDragHandler.propTypes = propTypes;
PickerDragHandler.defaultProps = defaultProps;

export default PickerDragHandler;
