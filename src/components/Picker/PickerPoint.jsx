import React, { PropTypes } from 'react';
import {
  getRotateStyle,
  disableMouseDown,
  getInlineRotateStyle
} from '../../utils/drag.js';

const propTypes = {
  index: PropTypes.number,
  angle: PropTypes.number,
  pointClass: PropTypes.string,
  handleTimeChange: PropTypes.func
};

const defaultProps = {
  index: 0,
  angle: 0,
  pointClass: "picker_point point_outter",
  handleTimeChange: () => {}
};

class PickerPoint extends React.Component {
  render() {
    const { index, handleTimeChange, pointClass, angle } = this.props;
    const inlineStyle = getInlineRotateStyle(angle);
    const wrapperStyle = getRotateStyle(-angle);

    return (
      <div
        className={pointClass}
        style={inlineStyle}
        onClick={() => {
          handleTimeChange(index, angle)
        }}
        onMouseDown={disableMouseDown}>
        <div className="point_wrapper" style={wrapperStyle}>
          {index}
        </div>
      </div>
    )
  }
}

PickerPoint.propTypes = propTypes;
PickerPoint.defaultProps = defaultProps;

export default PickerPoint;
