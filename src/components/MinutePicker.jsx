import React from 'react';
import ReactDOM from 'react-dom';

import {
  MINUTES,
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

class MinutePicker extends React.Component {
  constructor(props) {
    super(props);
    this.startX = 0;
    this.startY = 0;
    this.originX = null;
    this.originY = null;

    let {minute} = this.props;
    let pointerRotate = 0;
    MINUTES.map((h, index) => {
      if (minute === index + 1) {
        pointerRotate = 360 * (index + 1) / 60;
      }
    });
    this.state = {
      pointerRotate,
      draging: false,
      radian: degree2Radian(pointerRotate),
      height: MAX_ABSOLUTE_POSITION - POINTER_RADIUS,
      top: PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS
    }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
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

  handleMinuteChange(minute, angle) {
    let {handleMinuteChange} = this.props;
    handleMinuteChange && handleMinuteChange(minute);
    this.setState({
      pointerRotate: angle,
      radian: degree2Radian(angle)
    });
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
      let pos = mousePosition(e);
      let endX = pos.x;
      let endY = pos.y;

      let sRad = this.getRadian(endX, endY);
      let degree = sRad * (360 / (2 * Math.PI));

      if (degree < 0) {
        degree = 360 + degree;
      }
      let minute = Math.round(degree / (360 / 12));
      let pointerRotate = minute * (360 / 12);

      let absolutePosition = this.getAbsolutePosition(endX, endY);
      let {height, top} = this.state;
      absolutePosition = getStandardAbsolutePosition(absolutePosition, MAX_ABSOLUTE_POSITION);
      height = absolutePosition - POINTER_RADIUS;
      top = PICKER_RADIUS - height;

      this.setState({
        top,
        height,
        pointerRotate,
        draging: false,
        radian: degree2Radian(pointerRotate)
      });

      if (minute > 12) {
        minute = minute - 12;
      }
      let {handleMinuteChange} = this.props;
      handleMinuteChange && handleMinuteChange(minute * 5);
    }
  }

  renderMinutePointes() {
    return MINUTES.map((m, index) => {
      let angle = 360 * index / 60;
      let inlineStyle = getInlineRotateStyle(angle);
      let wrapperStyle = getRotateStyle(-angle);
      if (index % 5 === 0) {
        return (
          <div
            key={index}
            className="picker_point point_outter"
            style={inlineStyle}
            onClick={this.handleMinuteChange.bind(this, index, angle)}
            onMouseDown={disableMouseDown}>
            <div className="point_wrapper" style={wrapperStyle}>
              {index}
            </div>
          </div>
        )
      }
    });
  }

  render() {
    let {minute} = this.props;
    let {pointerRotate, draging, height, top} = this.state;
    let pickerPointerClass = 'picker_pointer';
    if (!draging) {
      pickerPointerClass = `${pickerPointerClass} animation`;
    }

    return (
      <div
        className="picker_container minute_picker_container">
        {this.renderMinutePointes()}
        <div
          ref="dragPointer"
          className={pickerPointerClass}
          style={getInitialPointerStyle(height, top, pointerRotate)}>
          <div
            className="pointer_drag"
            style={getRotateStyle(-pointerRotate)}
            onMouseDown={this.handleMouseDown}>{minute}</div>
        </div>
        <div
          className="picker_center"
          ref="pickerCenter"></div>
      </div>
    )
  }
}

export default MinutePicker;
