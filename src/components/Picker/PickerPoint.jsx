import React from 'react';
import PropTypes from 'prop-types';
import darg from '../../utils/drag';

const propTypes = {
  index: PropTypes.number,
  angle: PropTypes.number,
  onClick: PropTypes.func,
  pointClass: PropTypes.string,
};

const defaultProps = {
  index: 0,
  angle: 0,
  onClick: Function.prototype,
  pointClass: 'picker_point point_outter',
};

const PickerPoint = (props) => {
  const {
    index,
    angle,
    onClick,
    pointClass,
    pointerRotate,
  } = props;
  const inlineStyle = darg.inlineRotateStyle(angle);
  const wrapperStyle = darg.rotateStyle(-angle);

  return (
    <div
      style={inlineStyle}
      className={pointClass}
      onClick={() => {
        let relativeRotate = angle - (pointerRotate % 360);
        if (relativeRotate >= 180) {
          relativeRotate -= 360;
        } else if (relativeRotate < -180) {
          relativeRotate += 360;
        }
        onClick && onClick({
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
