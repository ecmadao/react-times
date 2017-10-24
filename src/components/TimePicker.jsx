import React from 'react';
import PropTypes from 'prop-types';

import OutsideClickHandler from './OutsideClickHandler';
import MaterialTheme from './MaterialTheme';
import ClassicTheme from './ClassicTheme';
import timeHelper from '../utils/time.js';
import languageHelper from '../utils/language';
import ICONS from '../utils/icons';
import { is } from '../utils/func';

// aliases for defaultProps readability
const TIME = timeHelper.time();
TIME.current = timeHelper.current();

const propTypes = {
  autoMode: PropTypes.bool,
  colorPalette: PropTypes.string,
  draggable: PropTypes.bool,
  focused: PropTypes.bool,
  language: PropTypes.string,
  meridiem: PropTypes.string,
  onFocusChange: PropTypes.func,
  onHourChange: PropTypes.func,
  onMeridiemChange: PropTypes.func,
  onMinuteChange: PropTypes.func,
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
    PropTypes.instanceOf(React.Component),
    PropTypes.instanceOf(React.PureComponent)
  ]),
  withoutIcon: PropTypes.bool,
  minuteStep: PropTypes.number,
  limitDrag: PropTypes.bool,
  timeFormat: PropTypes.string,
  timeFormatter: PropTypes.func,
};

const defaultProps = {
  autoMode: true,
  colorPalette: 'light',
  draggable: true,
  focused: false,
  language: 'en',
  meridiem: TIME.meridiem,
  onFocusChange: () => {},
  onHourChange: () => {},
  onMeridiemChange: () => {},
  onMinuteChange: () => {},
  onTimeChange: () => {},
  onTimezoneChange: () => {},
  placeholder: '',
  showTimezone: false,
  theme: 'material',
  time: TIME.current,
  timeMode: TIME.mode,
  trigger: null,
  withoutIcon: false,
  minuteStep: 5,
  limitDrag: false,
  timeFormat: '',
  timeFormatter: null,
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

    this.timeData = this.timeData.bind(this);
    this.handleHourAndMinuteChange = this.handleHourAndMinuteChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.onFocus = this.onFocus.bind(this);

    // if a timezone value was not passed in,
    // call the callback with the default value used for timezone
    if (!timezone) {
      onTimezoneChange(timezoneData);
    }
  }

  timeData(timeChanged) {
    const {
      time,
      timeMode,
      timezone,
      meridiem,
    } = this.props;
    const timeData = timeHelper.time({
      time,
      meridiem,
      timeMode,
      tz: timezone,
      useTz: !timeChanged
    });
    return timeData;
  }

  languageData() {
    const { language, phrases = {} } = this.props;
    return Object.assign({}, languageHelper.get(language), phrases);
  }

  componentWillReceiveProps(nextProps) {
    const { focused } = nextProps;
    if (focused !== this.state.focused) {
      this.setState({ focused });
    }
  }

  onFocus() {
    this.setState({
      focused: true
    });
    const { onFocusChange } = this.props;
    onFocusChange && onFocusChange(true);
  }

  getHourAndMinute() {
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

  getFormattedTime() {
    const {
      timeMode,
      timeFormat,
      timeFormatter,
    } = this.props;

    const [hour, minute] = this.getHourAndMinute();
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

  onClearFocus() {
    this.setState({
      focused: false
    });
    const { onFocusChange } = this.props;
    onFocusChange && onFocusChange(false);
  }

  onTimeChanged(timeChanged) {
    this.setState({
      timeChanged
    });
  }

  handleHourChange(hour) {
    const validateHour = timeHelper.validate(hour);
    const { onHourChange } = this.props;
    const minute = this.getHourAndMinute()[1];
    onHourChange && onHourChange(validateHour);
    this.handleTimeChange(`${validateHour}:${minute}`);
  }

  handleMinuteChange(minute) {
    const validateMinute = timeHelper.validate(minute);
    const { onMinuteChange } = this.props;
    const hour = this.getHourAndMinute()[0];
    onMinuteChange && onMinuteChange(validateMinute);
    this.handleTimeChange(`${hour}:${validateMinute}`);
  }

  handleMeridiemChange(meridiem) {
    const { onMeridiemChange } = this.props;
    onMeridiemChange && onMeridiemChange(meridiem);
  }

  handleTimeChange(time) {
    const { onTimeChange } = this.props;
    onTimeChange && onTimeChange(time);
    this.onTimeChanged(true);
  }

  handleHourAndMinuteChange(time) {
    this.onTimeChanged(true);
    const { onTimeChange, autoMode } = this.props;
    if (autoMode) {
      this.onClearFocus();
    }
    return onTimeChange && onTimeChange(time);
  }

  get meridiem() {
    const { meridiem } = this.props;
    const timeData = this.timeData(this.state.timeChanged);
    const localMessages = this.languageData();
    // eslint-disable-next-line no-unneeded-ternary
    const m = (meridiem) ? meridiem : timeData.meridiem;
    // eslint-disable-next-line no-extra-boolean-cast
    return !!(m.match(/^am|pm/i)) ? localMessages[m.toLowerCase()] : m;
  }

  renderMaterialTheme() {
    const {
      timeMode,
      autoMode,
      draggable,
      language,
      limitDrag,
      minuteStep,
      showTimezone,
      onTimezoneChange,
      timezoneIsEditable,
    } = this.props;

    const { timezoneData } = this.state;
    const [hour, minute] = this.getHourAndMinute();

    return (
      <MaterialTheme
        limitDrag={limitDrag}
        minuteStep={parseInt(minuteStep, 10)}
        autoMode={autoMode}
        clearFocus={this.onClearFocus}
        draggable={draggable}
        handleHourChange={this.handleHourChange}
        handleMeridiemChange={this.handleMeridiemChange}
        handleMinuteChange={this.handleMinuteChange}
        onTimezoneChange={onTimezoneChange}
        hour={hour}
        language={language}
        meridiem={this.meridiem}
        minute={minute}
        phrases={this.languageData()}
        showTimezone={showTimezone}
        timeMode={parseInt(timeMode, 10)}
        timezone={timezoneData}
        timezoneIsEditable={timezoneIsEditable}
      />
    );
  }

  renderClassicTheme() {
    const { timeMode, colorPalette } = this.props;
    const [hour, minute] = this.getHourAndMinute();

    return (
      <ClassicTheme
        colorPalette={colorPalette}
        handleMeridiemChange={this.handleMeridiemChange}
        handleTimeChange={this.handleHourAndMinuteChange}
        hour={hour}
        meridiem={this.meridiem}
        minute={minute}
        timeMode={parseInt(timeMode, 10)}
      />
    );
  }

  render() {
    const {
      theme,
      trigger,
      placeholder,
      withoutIcon,
      colorPalette,
    } = this.props;

    const { focused } = this.state;
    const times = this.getFormattedTime();

    const pickerPreviewClass = focused
      ? 'time_picker_preview active'
      : 'time_picker_preview';
    const containerClass = colorPalette === 'dark'
      ? 'time_picker_container dark'
      : 'time_picker_container';
    const previewContainerClass = withoutIcon
      ? 'preview_container without_icon'
      : 'preview_container';

    return (
      <div className={containerClass}>
        { trigger || (
          <div
            onClick={this.onFocus}
            className={pickerPreviewClass}
          >
            <div className={previewContainerClass}>
              {withoutIcon ? '' : (ICONS.time)}
              {placeholder || times}
            </div>
          </div>
        ) }
        <OutsideClickHandler
          onOutsideClick={this.onClearFocus}
          focused={focused}
        >
          {theme === 'material'
            ? this.renderMaterialTheme()
            : this.renderClassicTheme()}
        </OutsideClickHandler>
      </div>
    );
  }
}

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;

export default TimePicker;
