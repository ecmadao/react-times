import {
  MAX_ABSOLUTE_POSITION,
  MINUTES,
  MIN_ABSOLUTE_POSITION,
  PICKER_RADIUS,
  POINTER_RADIUS,
  TWELVE_HOURS,
} from '../../utils/const_value.js';
import React, {PropTypes} from 'react';

import timeHelper from '../../utils/time';

import Button from '../Common/Button';
import PickerDragHandler from '../Picker/PickerDragHandler';
import pickerPointGenerator from '../Picker/PickerPointGenerator';
import Timezone from '../Timezone';

const TIME = timeHelper.time();

const propTypes = {
  hour: PropTypes.string,
  language: PropTypes.string,
  minute: PropTypes.string,
  draggable: PropTypes.bool,
  meridiem: PropTypes.string,
  phrases: PropTypes.object,
  showTimezone: PropTypes.bool,
  timezone: PropTypes.shape({
    city: PropTypes.string,
    zoneAbbr: PropTypes.string,
    zoneName: PropTypes.string
  }),
  timezoneIsEditable: PropTypes.bool,
  handleHourChange: PropTypes.func,
  handleMinuteChange: PropTypes.func,
  handleTimezoneChange: PropTypes.func,
  handleEditTimezoneChange: PropTypes.func,
  handleShowTimezoneChange: PropTypes.func,
};

const defaultProps = {
  hour: TIME.hour12,
  language: 'en',
  minute: TIME.minute,
  draggable: false,
  meridiem: TIME.meridiem,
  showTimezone: false,
  handleHourChange: () => {},
  handleMinuteChange: () => {},
  handleTimezoneChange: () => {},
  handleEditTimezoneChange: () => {},
  handleShowTimezoneChange: () => {}
};

class TwelveHoursMode extends React.PureComponent {
  constructor(props) {
    super(props);
    const hourPointerRotate = this.resetHourDegree();
    const minutePointerRotate = this.resetMinuteDegree();
    this.state = {
      hourPointerRotate,
      minutePointerRotate
    };
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleDegreeChange = this.handleDegreeChange.bind(this);
    this.handleHourPointerClick = this.handleHourPointerClick.bind(this);
    this.handleMinutePointerClick = this.handleMinutePointerClick.bind(this);
  }

  resetHourDegree() {
    const hour = parseInt(this.props.hour);
    let pointerRotate = 0;
    TWELVE_HOURS.map((h, index) => {
      if (hour === index + 1) {
        pointerRotate = 360 * (index + 1) / 12;
      }
    });
    return pointerRotate;
  }

  resetMinuteDegree() {
    const minute = parseInt(this.props.minute);
    let pointerRotate = 0;
    MINUTES.map((m, index) => {
      if (minute === index) {
        pointerRotate = 360 * index / 60;
      }
    });
    return pointerRotate;
  }

  getHourTopAndHeight() {
    const height = MIN_ABSOLUTE_POSITION - POINTER_RADIUS;
    const top = PICKER_RADIUS - MIN_ABSOLUTE_POSITION + POINTER_RADIUS;
    return [top, height];
  }

  getMinuteTopAndHeight() {
    const height = MAX_ABSOLUTE_POSITION - POINTER_RADIUS;
    const top = PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS;
    return [top, height];
  }

  handleMeridiemChange(meridiem) {
    if (meridiem !== this.props.meridiem) {
      const {handleMeridiemChange} = this.props;
      handleMeridiemChange && handleMeridiemChange(meridiem);
    }
  }

  handleHourPointerClick(time, hourPointerRotate) {
    this.handleHourChange(time);
    this.handleDegreeChange({hourPointerRotate});
  }

  handleMinutePointerClick(time, minutePointerRotate) {
    this.handleMinuteChange(time);
    this.handleDegreeChange({minutePointerRotate});
  }

  handleDegreeChange(pointerRotate) {
    this.setState(pointerRotate);
  }

  handleHourChange(time) {
    const hour = parseInt(time);
    const {handleHourChange} = this.props;
    handleHourChange && handleHourChange(hour);
  }

  handleMinuteChange(time) {
    const minute = parseInt(time);
    const {handleMinuteChange} = this.props;
    handleMinuteChange && handleMinuteChange(minute);
  }

  render() {
    const {
      hour,
      minute,
      meridiem,
      draggable,
      clearFocus,
      phrases,
      showTimezone,
      timezone,
      timezoneIsEditable
    } = this.props;

    const {hourPointerRotate, minutePointerRotate} = this.state;

    const [top, height] = this.getHourTopAndHeight();
    const hourRotateState = {
      top,
      height,
      pointerRotate: hourPointerRotate
    };
    const [minuteTop, minuteHeight] = this.getMinuteTopAndHeight();
    const minuteRotateState = {
      top: minuteTop,
      height: minuteHeight,
      pointerRotate: minutePointerRotate
    };

    const HourPickerPointGenerator = pickerPointGenerator('hour', 12);
    const MinutePickerPointGenerator = pickerPointGenerator('minute', 12);
    const newMeridiem = (meridiem === 'AM' || meridiem === phrases['am'])
      ? phrases['pm'] : phrases['am'];

    const handleMeridiemChange = this.handleMeridiemChange.bind(
      this,
      newMeridiem
    );

    return (
      <div className='time_picker_modal_container'>
        <div className='time_picker_modal_header'>
          <span
            className='time_picker_header active'>{hour}:{minute}</span>&nbsp;
          <span
            onClick={handleMeridiemChange}
            className='time_picker_header meridiem'>{meridiem}</span>
        </div>
        <div className='picker_container'>
          <HourPickerPointGenerator
            handleTimePointerClick={this.handleHourPointerClick}
          />
          <MinutePickerPointGenerator
            handleTimePointerClick={this.handleMinutePointerClick}
          />
          <PickerDragHandler
            step={1}
            rotateState={minuteRotateState}
            time={parseInt(minute)}
            minLength={MAX_ABSOLUTE_POSITION}
            draggable={draggable}
            handleTimePointerClick={this.handleMinutePointerClick} />
          <PickerDragHandler
            step={0}
            rotateState={hourRotateState}
            time={parseInt(hour)}
            maxLength={MIN_ABSOLUTE_POSITION}
            draggable={draggable}
            handleTimePointerClick={this.handleHourPointerClick} />
        </div>
        {showTimezone
          ? <Timezone
            phrases={phrases}
            timezone={timezone}
            timezoneIsEditable={timezoneIsEditable}
          />
          : ''
        }
        <div className='buttons_wrapper'>
          <Button
            onClick={clearFocus}
            text={phrases.close}
          />
        </div>
      </div>
    );
  }
}

TwelveHoursMode.propTypes = propTypes;
TwelveHoursMode.defaultProps = defaultProps;

export default TwelveHoursMode;
