import React from 'react';
import ReactDOM from 'react-dom';

import {
  HOURS,
  PICKER_RADIUS,
  MAX_ABSOLUTE_POSITION,
  MIN_ABSOLUTE_POSITION,
  POINTER_RADIUS
} from '../ConstValue.js';
import {
  degree2Radian,
  mousePosition,
  disableMouseDown,
  getInlineRotateStyle,
  getInitialPointerStyle
} from '../utils.js';

class HourPicker extends React.Component {
  constructor(props) {
    super(props);
    this.startX = 0;
    this.startY = 0;
    this.originX = null;
    this.originY = null;

    let {hour} = this.props;
    let pointerRotate = 0;
    HOURS.map((h, index) => {
      if (hour === index + 1) {
        pointerRotate = index < 12 ? 360 * (index + 1) / 12 : 360 * (index + 1 - 12) / 12;
      }
    });
    let height = hour < 12 ? MIN_ABSOLUTE_POSITION - POINTER_RADIUS : MAX_ABSOLUTE_POSITION - POINTER_RADIUS
    let top = hour < 12 ? PICKER_RADIUS - MIN_ABSOLUTE_POSITION + POINTER_RADIUS : PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS;
    this.state = {
      top,
      height,
      pointerRotate,
      draging: false,
      radian: degree2Radian(pointerRotate)
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

  handleHourChange(hour, angle) {
    let {handleHourChange} = this.props;
    handleHourChange && handleHourChange(hour);
    let height = hour > 12 ? MAX_ABSOLUTE_POSITION - POINTER_RADIUS : MIN_ABSOLUTE_POSITION - POINTER_RADIUS;
    let top = hour > 12 ? PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS : PICKER_RADIUS - MIN_ABSOLUTE_POSITION + POINTER_RADIUS
    this.setState({
      height,
      top,
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

  getStandardAbsolutePosition(absolutePosition) {
    if (absolutePosition < MIN_ABSOLUTE_POSITION) {
      absolutePosition = MIN_ABSOLUTE_POSITION;
    }
    if (absolutePosition > MAX_ABSOLUTE_POSITION) {
      absolutePosition = MAX_ABSOLUTE_POSITION;
    }
    return absolutePosition;
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
        absolutePosition = this.getStandardAbsolutePosition(absolutePosition);
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
      let cacheHour = Math.round(degree / (360 / 12));
      let pointerRotate = cacheHour * (360 / 12);

      let absolutePosition = this.getAbsolutePosition(endX, endY);
      let {height, top} = this.state;
      absolutePosition = this.getStandardAbsolutePosition(absolutePosition);
      if (MIN_ABSOLUTE_POSITION < absolutePosition && absolutePosition < MAX_ABSOLUTE_POSITION) {
        if ((absolutePosition - MIN_ABSOLUTE_POSITION) > (MAX_ABSOLUTE_POSITION - MIN_ABSOLUTE_POSITION) / 2) {
          absolutePosition = MAX_ABSOLUTE_POSITION;
        } else {
          absolutePosition = MIN_ABSOLUTE_POSITION;
        }
        height = absolutePosition - POINTER_RADIUS;
        top = PICKER_RADIUS - height;
      }

      this.setState({
        top,
        height,
        pointerRotate,
        draging: false,
        radian: degree2Radian(pointerRotate)
      });

      if (cacheHour > 12) {
        cacheHour = cacheHour - 12;
      }
      let hour = absolutePosition === MIN_ABSOLUTE_POSITION ? cacheHour : cacheHour + 12;
      let {handleHourChange} = this.props;
      handleHourChange && handleHourChange(hour);
    }
  }

  renderHourPointes() {
    return HOURS.map((h, index) => {
      let pointClass = index < 12 ? "picker_point point_inner" : "picker_point point_outter";
      let angle = index < 12 ? 360 * (index + 1) / 12 : 360 * (index + 1 - 12) / 12;
      let inlineStyle = getInlineRotateStyle(angle);
      return (
        <div
          key={index}
          className={pointClass}
          style={inlineStyle}
          onClick={this.handleHourChange.bind(this, index + 1, angle)}
          onMouseDown={disableMouseDown}>
          {index + 1}
        </div>
      )
    });
  }

  render() {
    let {hour} = this.props;
    let {pointerRotate, draging, height, top} = this.state;
    let pickerPointerClass = 'picker_pointer';
    if (!draging) {
      pickerPointerClass = `${pickerPointerClass} animation`;
    }

    return (
      <div
        className="picker_container hour_picker_container">
        {this.renderHourPointes()}
        <div
          ref="dragPointer"
          className={pickerPointerClass}
          style={getInitialPointerStyle(height, top, pointerRotate)}>
          <div
            className="pointer_drag"
            onMouseDown={this.handleMouseDown}>{hour}</div>
        </div>
        <div
          className="picker_center"
          ref="pickerCenter"></div>
      </div>
    )
  }
}

export default HourPicker;
