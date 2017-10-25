import React from 'react';
import {
  MINUTES,
  HOURS,
  TWELVE_HOURS
} from '../../utils/const_value.js';
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
      return MINUTES.map((m, index) => {
        const angle = (360 * index) / 60;
        if (index % 5 === 0) {
          return (
            <PickerPoint
              index={index}
              key={index}
              angle={angle}
              handleTimeChange={this.props.handleTimePointerClick}
              pointerRotate={this.props.pointerRotate}
            />
          );
        }
        return null;
      });
    }

    renderHourPointes() {
      const hours = parseInt(mode, 10) === 24 ? HOURS : TWELVE_HOURS;
      return hours.map((h, index) => {
        const pointClass = index < 12
          ? 'picker_point point_inner'
          : 'picker_point point_outter';
        const angle = index < 12
          ? (360 * index) / 12
          : (360 * (index - 12)) / 12;
        return (
          <PickerPoint
            index={index}
            key={index}
            angle={angle}
            pointClass={pointClass}
            handleTimeChange={this.props.handleTimePointerClick}
            pointerRotate={this.props.pointerRotate}
          />
        );
      });
    }

    render() {
      return (
        <div
          ref={ref => (this.pickerPointerContainer = ref)}
          id="picker_pointer_container"
        >
          {type === 'hour'
              ? this.renderHourPointes()
              : this.renderMinutePointes()}
        </div>
      );
    }
  };

export default pickerPointGenerator;
