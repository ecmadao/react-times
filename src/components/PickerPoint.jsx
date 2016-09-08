import React, {PropTypes} from 'react';

import {
  getRotateStyle,
  disableMouseDown,
  getInlineRotateStyle
} from '../utils.js';

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
    let {index, handleTimeChange, pointClass, angle} = this.props;
    let inlineStyle = getInlineRotateStyle(angle);
    let wrapperStyle = getRotateStyle(-angle);

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
