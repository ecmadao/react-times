import React from 'react';
import {
  HOURS,
  MINUTES,
  TWELVE_HOURS
} from '../../utils/constant.js';
import PickerPoint from './PickerPoint';

const pickerPointGenerator = (type = 'hour', mode = 24) =>
  class PickerPointGenerator extends React.PureComponent {
    addAnimation() {
      this.pickerPointerContainer.className = 'animation';
    }

    removeAnimation() {
      this.pickerPointerContainer.className = '';
    }

    renderMinutePointes() {
      return MINUTES.map((_, index) => {
        const angle = (360 * index) / 60;
        if (index % 5 === 0) {
          return (
            <PickerPoint
              key={index}
              angle={angle}
              index={index}
              pointerRotate={this.props.pointerRotate}
              onClick={this.props.handleTimePointerClick}
            />
          );
        }
        return null;
      });
    }

    renderHourPointes() {
      const hours = parseInt(mode, 10) === 24 ? HOURS : TWELVE_HOURS;
      return hours.map((_, index) => {
        const pointClass = index < 12
          ? 'picker_point point_inner'
          : 'picker_point point_outter';
        const angle = index < 12
          ? (360 * index) / 12
          : (360 * (index - 12)) / 12;
        return (
          <PickerPoint
            key={index}
            angle={angle}
            index={index}
            pointClass={pointClass}
            pointerRotate={this.props.pointerRotate}
            onClick={this.props.handleTimePointerClick}
          />
        );
      });
    }

    render() {
      return (
        <div
          ref={ref => (this.pickerPointerContainer = ref)}
          className="picker_pointer_container"
        >
          {type === 'hour'
            ? this.renderHourPointes()
            : this.renderMinutePointes()}
        </div>
      );
    }
  };

export default pickerPointGenerator;
