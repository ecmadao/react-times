import React, { PropTypes } from 'react';

import ClassicTheme from './ClassicTheme';
import ICONS from '../utils/icons';
import MaterialTheme from './MaterialTheme';
import OutsideClickHandler from './OutsideClickHandler';
import language from '../utils/language';
import timeHelper from '../utils/time.js';

let LANGUAGE = language.get();

const propTypes = {
  time: PropTypes.string,
  timeQuantum: PropTypes.string,
  focused: PropTypes.bool,
  autoMode: PropTypes.bool,
  draggable: PropTypes.bool,
  placeholder: PropTypes.string,
  colorPalette: PropTypes.string,
  theme: PropTypes.string,
  timeMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  withoutIcon: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onHourChange: PropTypes.func,
  onMinuteChange: PropTypes.func,
  onTimeChange: PropTypes.func,
  onTimeQuantumChange: PropTypes.func,
  onTimezoneChange: PropTypes.func,
  onShowTimezoneChange: PropTypes.func,
  onEditTimezoneChange: PropTypes.func,
  trigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.instanceOf(React.Component),
    PropTypes.instanceOf(React.PureComponent)
  ]),
  language: PropTypes.string,
  timezone: PropTypes.string,
  showTimezone: PropTypes.bool,
  editableTimezone: PropTypes.bool
};

const defaultProps = {
  time: timeHelper.current(),
  timeQuantum: 'AM',
  focused: false,
  autoMode: true,
  draggable: true,
  placeholder: '',
  colorPalette: 'light',
  timeMode: 24,
  theme: 'material',
  withoutIcon: false,
  onFocusChange: () => {},
  onHourChange: () => {},
  onMinuteChange: () => {},
  onTimeChange: () => {},
  onTimeQuantumChange: () => {},
  onTimezoneChange: () => {},
  onShowTimezoneChange: () => {},
  onEditTimezoneChange: () => {},
  trigger: null,
  language: 'en',
  timezone: timeHelper.guessUserTz(),
  showTimezone: false,
  editableTimezone: false
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

  onFocus() {
    this.setState({ focused: true });
    const { onFocusChange } = this.props;
    onFocusChange && onFocusChange(true);
  }

  getHourAndMinute() {
    const { time } = this.props;
    if(!time) {
      return timeHelper.current().split(':');
    }
    return time.split(':');
  }

  onClearFocus() {
    this.setState({ focused: false });
    const { onFocusChange } = this.props;
    onFocusChange && onFocusChange(false);
  }

  handleHourChange(hour) {
    hour = timeHelper.validate(hour);
    const { onHourChange } = this.props;
    const [ _, minute ] = this.getHourAndMinute();
    onHourChange && onHourChange(hour);
    this.handleTimeChange(`${hour}:${minute}`);
  }

  handleMinuteChange(minute) {
    minute = timeHelper.validate(minute);
    const { onMinuteChange } = this.props;
    const [ hour, _ ] = this.getHourAndMinute();
    onMinuteChange && onMinuteChange(minute);
    this.handleTimeChange(`${hour}:${minute}`);
  }

  handleTimeQuantumChange(timeQuantum) {
    const { onTimeQuantumChange } = this.props;
    onTimeQuantumChange && onTimeQuantumChange(timeQuantum);
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

  get timeQuantum() {
    const { timeQuantum, time, timeMode } = this.props;
    return timeQuantum || timeHelper.validateQuantum(time, timeMode)
  }

  renderMaterialTheme() {
    const {
      timeMode,
      autoMode,
      draggable,
      timezone,
      showTimezone,
      editableTimezone } = this.props;
    const [ hour, minute ] = this.getHourAndMinute();

    console.info(`props passed to MaterialTheme: ${JSON.stringify(this.props)}`);

    return (
      <MaterialTheme
        hour={hour}
        minute={minute}
        autoMode={autoMode}
        language={LANGUAGE}
        timeMode={parseInt(timeMode)}
        clearFocus={this.onClearFocus}
        handleHourChange={this.handleHourChange}
        handleMinuteChange={this.handleMinuteChange}
        handleTimeQuantumChange={this.handleTimeQuantumChange}
        handleTimezoneChange={this.handleTimezoneChange}
        handleEditTimezoneChange={this.handleEditTimezoneChange}
        handleShowTimezoneChange={this.handleShowTimezoneChange}
        timeQuantum={this.timeQuantum}
        draggable={draggable}
        timezone={timezone}
        showTimezone={showTimezone}
        editableTimezone={editableTimezone}
      />
    );
  }

  renderClassicTheme() {
    const { timeMode, colorPalette } = this.props;
    const [ hour, minute ] = this.getHourAndMinute();
    return (
      <ClassicTheme
        hour={hour}
        minute={minute}
        colorPalette={colorPalette}
        timeMode={parseInt(timeMode)}
        timeQuantum={this.timeQuantum}
        handleTimeChange={this.handleHourAndMinuteChange}
        handleTimeQuantumChange={this.handleTimeQuantumChange}
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

    const { focused } = this.state;
    const [hour, minute] = this.getHourAndMinute();
    const validateTimeMode = timeHelper.validateTimeMode(timeMode);
    const quantum = LANGUAGE[this.timeQuantum.toLowerCase()] || this.timeQuantum;

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
