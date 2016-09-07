import React from 'react';
import ReactDOM from 'react-dom';

import {
  PICKER_RADIUS,
  MAX_ABSOLUTE_POSITION,
  POINTER_RADIUS
} from '../ConstValue.js';
import {
  degree2Radian,
  mousePosition,
  disableMouseDown,
  getRotateStyle,
  getInlineRotateStyle,
  getInitialPointerStyle,
  getStandardAbsolutePosition
} from '../utils.js';

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
    let {data, minLength, splitNum, datas} = this.props;
    let pointerRotate = 0;
    datas.map((d, index) => {
      if (data === index + 1) {
        pointerRotate = index < splitNum ? 360 * (index + 1) / splitNum : 360 * (index + 1 - splitNum) / splitNum;
      }
    });
    let height = data < splitNum ? minLength - POINTER_RADIUS : MAX_ABSOLUTE_POSITION - POINTER_RADIUS
    let top = data < splitNum ? PICKER_RADIUS - minLength + POINTER_RADIUS : PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS;
    return {
      top,
      height,
      pointerRotate,
      draging: false,
      radian: degree2Radian(pointerRotate)
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
    let {step} = this.props;
    let prevStep = prevProps.step;
    if (step !== prevStep) {
      this.resetState();
    }
  }

  getRadian(x, y) {
    let sRad = Math.atan2(y - this.originY, x - this.originX);
    sRad -= Math.atan2(this.startY - this.originY, this.startX - this.originX);
    sRad += this.state.radian;
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
        let degree = sRad * (360 / (2 * Math.PI));

        let absolutePosition = this.getAbsolutePosition(dragX, dragY);
        absolutePosition = getStandardAbsolutePosition(absolutePosition, MAX_ABSOLUTE_POSITION / 2);
        let height = absolutePosition - POINTER_RADIUS;
        let top = PICKER_RADIUS - height;
        this.setState({
          top,
          height,
          pointerRotate: degree
        });
      }
    }
  }

  handleMouseUp(e) {
    if (this.state.draging) {
      let {minLength} = this.props;

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
      let {height, top} = this.state;
      absolutePosition = getStandardAbsolutePosition(absolutePosition, minLength);
      if (minLength < absolutePosition && absolutePosition < MAX_ABSOLUTE_POSITION) {
        if ((absolutePosition - minLength) > (MAX_ABSOLUTE_POSITION - minLength) / 2) {
          absolutePosition = MAX_ABSOLUTE_POSITION;
        } else {
          absolutePosition = minLength;
        }
      }
      height = absolutePosition - POINTER_RADIUS;
      top = PICKER_RADIUS - height;

      this.setState({
        top,
        height,
        pointerRotate,
        draging: false,
        radian: degree2Radian(pointerRotate)
      });

      if (roundSeg > 12) {
        roundSeg = roundSeg - 12;
      }
      let data = absolutePosition === minLength ? roundSeg : roundSeg + 12;

      let {handleTimeChange} = this.props;
      handleTimeChange && handleTimeChange(data);
    }
  }

  handleTimeChange(time, angle) {
    let {handleTimeChange, minLength, splitNum} = this.props;
    handleTimeChange && handleTimeChange(time);
    let height = time > splitNum ? MAX_ABSOLUTE_POSITION - POINTER_RADIUS : minLength - POINTER_RADIUS;
    let top = time > splitNum ? PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS : PICKER_RADIUS - minLength + POINTER_RADIUS
    this.setState({
      height,
      top,
      pointerRotate: angle,
      radian: degree2Radian(angle)
    });
  }

  renderMinutePointes() {
    let {datas} = this.props;
    return datas.map((m, index) => {
      let angle = 360 * index / 60;
      let inlineStyle = getInlineRotateStyle(angle);
      let wrapperStyle = getRotateStyle(-angle);
      if (index % 5 === 0) {
        return (
          <div
            key={index}
            className="picker_point point_outter"
            style={inlineStyle}
            onClick={this.handleTimeChange.bind(this, index / 5, angle)}
            onMouseDown={disableMouseDown}>
            <div className="point_wrapper" style={wrapperStyle}>
              {index}
            </div>
          </div>
        )
      }
    });
  }

  renderHourPointes() {
    let {datas} = this.props;
    return datas.map((h, index) => {
      let pointClass = index < 12 ? "picker_point point_inner" : "picker_point point_outter";
      let angle = index < 12 ? 360 * (index + 1) / 12 : 360 * (index + 1 - 12) / 12;
      let inlineStyle = getInlineRotateStyle(angle);
      let wrapperStyle = getRotateStyle(-angle);
      return (
        <div
          key={index}
          className={pointClass}
          style={inlineStyle}
          onClick={this.handleTimeChange.bind(this, index + 1, angle)}
          onMouseDown={disableMouseDown}>
          <div className="point_wrapper" style={wrapperStyle}>
            {index + 1}
          </div>
        </div>
      )
    });
  }

  render() {
    let {data, step} = this.props;
    let {pointerRotate, draging, height, top} = this.state;
    let pickerPointerClass = 'picker_pointer';
    if (!draging) {
      pickerPointerClass = `${pickerPointerClass} animation`;
    }

    return (
      <div
        className="picker_container hour_picker_container">
        {step === 0 ? this.renderHourPointes() : this.renderMinutePointes()}
        <div
          ref="dragPointer"
          className={pickerPointerClass}
          style={getInitialPointerStyle(height, top, pointerRotate)}>
          <div
            className="pointer_drag"
            style={getRotateStyle(-pointerRotate)}
            onMouseDown={this.handleMouseDown}>{data}</div>
        </div>
        <div
          className="picker_center"
          ref="pickerCenter"></div>
      </div>
    )
  }
}

export default PickerDargHandler;
