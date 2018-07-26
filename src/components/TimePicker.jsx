import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import OutsideClickHandler from './OutsideClickHandler';
import Button from './Common/Button';
import timeHelper from '../utils/time.js';
import languageHelper from '../utils/language';
import ICONS from '../utils/icons';
import { is } from '../utils/func';
import asyncComponent from './Common/AsyncComponent';

const DialPlates = {
  material: asyncComponent(
    () => System.import('./MaterialTheme')
      .then(component => component.default)
  ),
  classic: asyncComponent(
    () => System.import('./ClassicTheme')
      .then(component => component.default)
  ),
};

// aliases for defaultProps readability
const TIME = timeHelper.time({ useTz: false });
TIME.current = timeHelper.current();

const propTypes = {
  autoMode: PropTypes.bool,
  autoClose: PropTypes.bool,
  colorPalette: PropTypes.string,
  draggable: PropTypes.bool,
  focused: PropTypes.bool,
  language: PropTypes.string,
  meridiem: PropTypes.string,
  onFocusChange: PropTypes.func,
  onTimeChange: PropTypes.func,
  onTimezoneChange: PropTypes.func,
  phrases: PropTypes.object,
  placeholder: PropTypes.string,
  showTimezone: PropTypes.bool,
  theme: PropTypes.string,
  time: PropTypes.string,
  timeMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  timezone: PropTypes.string,
  timezoneIsEditable: PropTypes.bool,
  trigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element,
    PropTypes.array,
    PropTypes.node,
    PropTypes.instanceOf(React.Component),
    PropTypes.instanceOf(React.PureComponent)
  ]),
  withoutIcon: PropTypes.bool,
  minuteStep: PropTypes.number,
  limitDrag: PropTypes.bool,
  timeFormat: PropTypes.string,
  timeFormatter: PropTypes.func,
  useTz: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  timeConfig: PropTypes.object,
};

const defaultProps = {
  autoMode: true,
  autoClose: true,
  colorPalette: 'light',
  draggable: true,
  focused: false,
  language: 'en',
  meridiem: TIME.meridiem,
  onFocusChange: Function.prototype,
  onTimeChange: Function.prototype,
  onTimezoneChange: Function.prototype,
  placeholder: '',
  showTimezone: false,
  theme: 'material',
  time: '',
  timeMode: TIME.mode,
  trigger: null,
  withoutIcon: false,
  minuteStep: 5,
  limitDrag: false,
  timeFormat: '',
  timeFormatter: null,
  useTz: true,
  closeOnOutsideClick: true,
  timeConfig: {
    step: 30,
    unit: 'minutes'
  }
};

class TimePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const { focused, timezone, onTimezoneChange } = props;
    const timeData = this.timeData(false);
    const timezoneData = timeHelper.tzForName(timeData.timezone);

    this.state = {
      focused,
      timezoneData,
      timeChanged: false
    };

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.timeData = this.timeData.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
    this.handleHourAndMinuteChange = this.handleHourAndMinuteChange.bind(this);

    // if a timezone value was not passed in,
    // call the callback with the default value used for timezone
    if (!timezone) {
      onTimezoneChange(timezoneData);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { focused } = nextProps;
    if (focused !== this.props.focused) {
      this.setState({ focused });
    }
  }

  onFocus() {
    const { focused } = this.state;
    if (!focused) {
      this.onFocusChange(!focused);
    }
  }

  onBlur() {
    const { focused } = this.state;
    if (focused) {
      this.onFocusChange(!focused);
    }
  }

  onFocusChange(focused) {
    this.setState({ focused });
    const { onFocusChange } = this.props;
    onFocusChange && onFocusChange(focused);
  }

  timeData(timeChanged) {
    const {
      time,
      useTz,
      timeMode,
      timezone,
      meridiem,
    } = this.props;
    const timeData = timeHelper.time({
      time,
      meridiem,
      timeMode,
      tz: timezone,
      useTz: !time && !timeChanged && useTz
    });
    return timeData;
  }

  get languageData() {
    const { language, phrases = {} } = this.props;
    return Object.assign({}, languageHelper.get(language), phrases);
  }

  get hourAndMinute() {
    const { timeMode } = this.props;
    const timeData = this.timeData(this.state.timeChanged);
    // Since someone might pass a time in 24h format, etc., we need to get it from
    // timeData to 'translate' it into the local format, including its accurate meridiem
    const hour = (parseInt(timeMode, 10) === 12)
      ? timeData.hour12
      : timeData.hour24;
    const minute = timeData.minute;
    return [hour, minute];
  }

  get formattedTime() {
    const {
      timeMode,
      timeFormat,
      timeFormatter,
    } = this.props;

    const [hour, minute] = this.hourAndMinute;
    const validTimeMode = timeHelper.validateTimeMode(timeMode);

    let times = '';
    if (timeFormatter && is.func(timeFormatter)) {
      times = timeFormatter({
        hour,
        minute,
        meridiem: this.meridiem
      });
    } else if (timeFormat && is.string(timeFormat)) {
      times = timeFormat;
      if (/HH?/.test(times) || /MM?/.test(times)) {
        if (validTimeMode === 12) {
          console.warn('It seems you are using 12 hours mode with 24 hours time format. Please check your timeMode and timeFormat props');
        }
      } else if (/hh?/.test(times) || /mm?/.test(times)) {
        if (validTimeMode === 24) {
          console.warn('It seems you are using 24 hours mode with 12 hours time format. Please check your timeMode and timeFormat props');
        }
      }
      times = times.replace(/(HH|hh)/g, hour);
      times = times.replace(/(MM|mm)/g, minute);
      times = times.replace(/(H|h)/g, Number(hour));
      times = times.replace(/(M|m)/g, Number(minute));
    } else {
      times = (validTimeMode === 12)
        ? `${hour} : ${minute} ${this.meridiem}`
        : `${hour} : ${minute}`;
    }
    return times;
  }

  get meridiem() {
    const { meridiem } = this.props;
    const timeData = this.timeData(this.state.timeChanged);
    const localMessages = this.languageData;
    // eslint-disable-next-line no-unneeded-ternary
    const m = (meridiem) ? meridiem : timeData.meridiem;
    // eslint-disable-next-line no-extra-boolean-cast
    return m && !!(m.match(/^am|pm/i)) ? localMessages[m.toLowerCase()] : m;
  }

  onTimeChanged(timeChanged) {
    this.setState({ timeChanged });
  }

  handleHourChange(hour) {
    const validateHour = timeHelper.validate(hour);
    const minute = this.hourAndMinute[1];
    this.handleTimeChange({
      hour: validateHour,
      minute,
      meridiem: this.meridiem
    });
  }

  handleMinuteChange(minute) {
    const validateMinute = timeHelper.validate(minute);
    const hour = this.hourAndMinute[0];

    this.handleTimeChange({
      hour,
      minute: validateMinute,
      meridiem: this.meridiem
    });
  }

  handleMeridiemChange(meridiem) {
    const [hour, minute] = this.hourAndMinute;
    this.handleTimeChange({
      hour,
      minute,
      meridiem
    });
  }

  handleTimeChange(options) {
    const { onTimeChange } = this.props;
    onTimeChange && onTimeChange(options);
    this.onTimeChanged(true);
  }

  handleHourAndMinuteChange(time) {
    this.onTimeChanged(true);
    const { onTimeChange, autoClose } = this.props;
    if (autoClose) this.onBlur();
    return onTimeChange && onTimeChange(time);
  }

  renderDialPlate() {
    const {
      theme,
      timeMode,
      autoMode,
      autoClose,
      draggable,
      language,
      limitDrag,
      minuteStep,
      timeConfig,
      colorPalette,
      showTimezone,
      onTimezoneChange,
      timezoneIsEditable,
    } = this.props;

    const dialTheme = theme === 'material' ? theme : 'classic';
    const DialPlate = DialPlates[dialTheme];

    const { timezoneData } = this.state;
    const [hour, minute] = this.hourAndMinute;

    return (
      <DialPlate
        hour={hour}
        minute={minute}
        autoMode={autoMode}
        autoClose={autoClose}
        language={language}
        draggable={draggable}
        limitDrag={limitDrag}
        timezone={timezoneData}
        meridiem={this.meridiem}
        timeConfig={timeConfig}
        showTimezone={showTimezone}
        phrases={this.languageData}
        colorPalette={colorPalette}
        clearFocus={this.onBlur}
        timeMode={parseInt(timeMode, 10)}
        onTimezoneChange={onTimezoneChange}
        minuteStep={parseInt(minuteStep, 10)}
        timezoneIsEditable={timezoneIsEditable}
        handleHourChange={this.handleHourChange}
        handleTimeChange={this.handleTimeChange}
        handleMinuteChange={this.handleMinuteChange}
        handleMeridiemChange={this.handleMeridiemChange}
      />
    );
  }

  render() {
    const {
      trigger,
      placeholder,
      withoutIcon,
      colorPalette,
      closeOnOutsideClick
    } = this.props;

    const { focused } = this.state;
    const times = this.formattedTime;

    const pickerPreviewClass = cx(
      'time_picker_preview',
      focused && 'active'
    );
    const containerClass = cx(
      'time_picker_container',
      colorPalette === 'dark' && 'dark'
    );
    const previewContainerClass = cx(
      'preview_container',
      withoutIcon && 'without_icon'
    );

    return (
      <div className={containerClass}>
        {trigger || (
          <Button
            onClick={this.onFocus}
            className={pickerPreviewClass}
          >
            <div className={previewContainerClass}>
              {withoutIcon ? '' : (ICONS.time)}
              {placeholder || times}
            </div>
          </Button>
        )}
        <OutsideClickHandler
          focused={focused}
          onOutsideClick={this.onBlur}
          closeOnOutsideClick={closeOnOutsideClick}
        >
          {this.renderDialPlate()}
        </OutsideClickHandler>
      </div>
    );
  }
}

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;

export default TimePicker;
