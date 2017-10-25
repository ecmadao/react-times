import React from 'react';
import PropTypes from 'prop-types';
import darg from '../../utils/drag';

const propTypes = {
  index: PropTypes.number,
  angle: PropTypes.number,
  pointClass: PropTypes.string,
  handleTimeChange: PropTypes.func
};

const defaultProps = {
  index: 0,
  angle: 0,
  pointClass: 'picker_point point_outter',
  handleTimeChange: () => {}
};

const PickerPoint = (props) => {
  const {
    index,
    angle,
    pointClass,
    pointerRotate,
    handleTimeChange,
  } = props;
  const inlineStyle = darg.inlineRotateStyle(angle);
  const wrapperStyle = darg.rotateStyle(-angle);

  return (
    <div
      className={pointClass}
      style={inlineStyle}
      onClick={() => {
        let relativeRotate = angle - (pointerRotate % 360);
        if (relativeRotate >= 180) {
          relativeRotate -= 360;
        } else if (relativeRotate < -180) {
          relativeRotate += 360;
        }
        handleTimeChange && handleTimeChange({
          time: index,
          pointerRotate: relativeRotate + pointerRotate
        });
      }}
      onMouseDown={darg.disableMouseDown}
    >
      <div className="point_wrapper" style={wrapperStyle}>
        {index}
      </div>
    </div>
  );
};

PickerPoint.propTypes = propTypes;
PickerPoint.defaultProps = defaultProps;

export default PickerPoint;
