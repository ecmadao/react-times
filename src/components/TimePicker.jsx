import React, { PropTypes } from 'react';

import ClassicTheme from './ClassicTheme';
import ICONS from '../utils/icons';
import MaterialTheme from './MaterialTheme';
import OutsideClickHandler from './OutsideClickHandler';
import language from '../utils/language';
import timeHelper from '../utils/time';

let LANGUAGE = language.get();

const propTypes = {
  autoMode: PropTypes.bool,
  colorPalette: PropTypes.string,
  draggable: PropTypes.bool,
  focused: PropTypes.bool,
  language: PropTypes.string,
  meridiem: PropTypes.string,
  onEditTimezoneChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  onHourChange: PropTypes.func,
  onMinuteChange: PropTypes.func,
  onShowTimezoneChange: PropTypes.func,
  onTimeChange: PropTypes.func,
  onTimeModeChange: PropTypes.func,
  onTimeQuantumChange: PropTypes.func,
  onTimezoneChange: PropTypes.func,
  placeholder: PropTypes.string,
  showTimezone: PropTypes.bool,
  theme: PropTypes.string,
  time: PropTypes.string,
  timeMode: PropTypes.string,
  timezone: PropTypes.shape({
    city: PropTypes.string,
    zoneAbbr: PropTypes.string,
    zoneName: PropTypes.string
  }),
  timezoneIsEditable: PropTypes.bool,
  trigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.instanceOf(React.Component),
    PropTypes.instanceOf(React.PureComponent)
  ]),
  withoutIcon: PropTypes.bool
};

const defaultProps = {
  autoMode: true,
  colorPalette: 'light',
  draggable: true,
  focused: false,
  language: 'en',
  meridiem: 'AM',
  onEditTimezoneChange: () => {},
  onFocusChange: () => {},
  onHourChange: () => {},
  onMinuteChange: () => {},
  onShowTimezoneChange: () => {},
  onTimeChange: () => {},
  onTimeModeChange: () => {},
  onTimeQuantumChange: () => {},
  onTimezoneChange: () => {},
  placeholder: '',
  showTimezone: false,
  theme: 'material',
  time: timeHelper.current(),
  timeMode: '24h',
  timezone: timeHelper.guessUserTz(),
  timezoneIsEditable: false,
  trigger: null,
  withoutIcon: false
};

class TimePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const { focused } = props;
    this.state = { focused };
    LANGUAGE = language.get(props.language);

    this.onFocus = this.onFocus.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleTimeQuantumChange = this.handleTimeQuantumChange.bind(this);
    this.handleTimeModeChange = this.handleTimeModeChange.bind(this);
    this.handleHourAndMinuteChange = this.handleHourAndMinuteChange.bind(this);
    this.handleTimezoneChange = this.handleTimezoneChange.bind(this);
    this.handleShowTimezoneChange = this.handleShowTimezoneChange.bind(this);
    this.handleEditTimezoneChange = this.handleEditTimezoneChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { focused } = nextProps;
    if (focused !== this.state.focused) {
      this.setState({ focused });
    }
  }

  getHourAndMinute() {
    const { time } = this.props;

    if (!time) { return timeHelper.time(); }

    return time.split(/:/);
  }

  onFocus() {
    this.setState({ focused: true });
    const { onFocusChange } = this.props;
    onFocusChange && onFocusChange(true);
  }

  onClearFocus() {
    this.setState({ focused: false });
    const { onFocusChange } = this.props;
    onFocusChange && onFocusChange(false);
  }

  handleHourChange(hour) {
    hour = timeHelper.validate(hour);
    const { onHourChange } = this.props;
    const [ _, minute, quantum ] = this.getHourAndMinute();
    onHourChange && onHourChange(hour);
    this.handleTimeChange(`${hour}:${minute}`);
  }

  handleMinuteChange(minute) {
    minute = timeHelper.validate(minute);
    const { onMinuteChange } = this.props;
    const [ hour, _, quantum ] = this.getHourAndMinute();
    onMinuteChange && onMinuteChange(minute);
    this.handleTimeChange(`${hour}:${minute}`);
  }

  handleTimeQuantumChange(meridiem) {
    const { onTimeQuantumChange } = this.props;
    onTimeQuantumChange && onTimeQuantumChange(meridiem);
  }

  handleTimeModeChange(timeMode) {
    const { onTimeModeChange } = this.props;
    onTimeModeChange && onTimeModeChange(timeMode);
  }

  handleTimeChange(time) {
    const { onTimeChange } = this.props;
    onTimeChange && onTimeChange(time);
  }

  handleHourAndMinuteChange(time) {
    const { onTimeChange, autoMode } = this.props;
    if (autoMode) {
      this.onClearFocus();
    }
    return onTimeChange && onTimeChange(time);
  }

  handleTimezoneChange(timezone) {
    const { onTimezoneChange } = this.props;
    onTimezoneChange && onTimezoneChange(timezone);
  }

  handleShowTimezoneChange(showTimezone) {
    const { onShowTimezoneChange } = this.props;
    onShowTimezoneChange && onShowTimezoneChange(showTimezone);
  }

  handleEditTimezoneChange(editTimezone) {
    const { onEditTimezoneChange } = this.props;
    onEditTimezoneChange && onEditTimezoneChange(editTimezone);
  }

  get meridiem() {
    const { meridiem, time, timeMode } = this.props;
    return meridiem || timeHelper.time(time, 12)[2];
  }

  get timeMode() {
    // if a dev passes in a timeMode of 12 *or* a meridiem, s/he wants 12h mode
    const { timeMode, meridiem } = this.props;
    const isTimeMode12 = (timeMode && parseInt(timeMode === 12));
    const quantumMatch = meridiem.match(/[AM|PM]/i);
    const isTimeQuantum = !!quantumMatch && quantumMatch.length === 1;
    return (isTimeMode12 || isTimeQuantum) ? 12 : 24;
  }

  renderMaterialTheme() {
    const {
      timeMode,
      autoMode,
      draggable,
      timezone,
      showTimezone,
      timezoneIsEditable } = this.props;
    const [ hour, minute, quantum ] = this.getHourAndMinute();

    return (
      <MaterialTheme
        autoMode={autoMode}
        clearFocus={this.onClearFocus}
        draggable={draggable}
        timezoneIsEditable={timezoneIsEditable}
        handleEditTimezoneChange={this.handleEditTimezoneChange}
        handleHourChange={this.handleHourChange}
        handleMinuteChange={this.handleMinuteChange}
        handleShowTimezoneChange={this.handleShowTimezoneChange}
        handleTimeQuantumChange={this.handleTimeQuantumChange}
        handleTimezoneChange={this.handleTimezoneChange}
        hour={hour}
        language={LANGUAGE}
        meridiem={this.meridiem}
        minute={minute}
        showTimezone={showTimezone}
        timeMode={parseInt(timeMode)}
        timezone={timezone}
      />
    );
  }

  renderClassicTheme() {
    const { timeMode, colorPalette } = this.props;
    const [ hour, minute, quantum ] = this.getHourAndMinute();
    return (
      <ClassicTheme
        colorPalette={colorPalette}
        handleTimeChange={this.handleHourAndMinuteChange}
        handleTimeQuantumChange={this.handleTimeQuantumChange}
        hour={hour}
        meridiem={this.meridiem}
        minute={minute}
        timeMode={timeMode}
      />
    );
  }

  render() {
    const {
      time,
      theme,
      trigger,
      timeMode,
      placeholder,
      withoutIcon,
      colorPalette
    } = this.props;
    console.log(`rendering TimePicker with time ${time} and timeMode ${timeMode}`);

    const { focused } = this.state;
    const [ hour, minute, meridiem ] = this.getHourAndMinute();
    const validateTimeMode = timeHelper.validateTimeMode(timeMode);
    const quantum = LANGUAGE[this.meridiem.toLowerCase()] || this.meridiem;

    const times = validateTimeMode === 12
      ? `${time} ${quantum}`
      : `${hour} : ${minute}`;
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
        { trigger ? trigger : (
          <div
            onClick={this.onFocus}
            className={pickerPreviewClass}>
            <div className={previewContainerClass}>
              {withoutIcon ? '' : (ICONS.time)}
              {placeholder || times}
            </div>
          </div>
        ) }
        <OutsideClickHandler
          onOutsideClick={this.onClearFocus}
          focused={focused}>
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
