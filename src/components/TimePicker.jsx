import React, { PropTypes } from 'react';

import OutsideClickHandler from './OutsideClickHandler';
import MaterialTheme from './MaterialTheme';
import ClassicTheme from './ClassicTheme';
import {
  initialTime,
  getValidateTime,
  getValidateTimeMode,
  getValidateTimeQuantum
} from '../utils.js';
import timeHelper from '../time.js';
import ICONS from '../icons';
import language from '../language';

let LANGUAGE = language.get();

const propTypes = {
  time: PropTypes.string,
  timeQuantum: PropTypes.string,
  focused: PropTypes.bool,
  autoMode: PropTypes.bool,
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
  trigger: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.instanceOf(React.Component)
  ]),
  language: PropTypes.string
};

const defaultProps = {
  time: timeHelper.current(),
  timeQuantum: 'AM',
  focused: false,
  autoMode: true,
  placeholder: '',
  colorPalette: "light",
  timeMode: 24,
  theme: "material",
  withoutIcon: false,
  onFocusChange: () => {},
  onHourChange: () => {},
  onMinuteChange: () => {},
  onTimeChange: () => {},
  onTimeQuantumChange: () => {},
  trigger: null,
  language: 'en'
};

class TimePicker extends React.Component {
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
    hour = getValidateTime(hour);
    const { onHourChange } = this.props;
    const [ _, minute ] = this.getHourAndMinute();
    onHourChange && onHourChange(hour);
    this.handleTimeChange(`${hour}:${minute}`);
  }

  handleMinuteChange(minute) {
    minute = getValidateTime(minute);
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

  get timeQuantum() {
    const { timeQuantum, time, timeMode } = this.props;
    return timeQuantum || getValidateTimeQuantum(time, timeMode)
  }

  renderMaterialTheme() {
    const { timeMode, autoMode } = this.props;
    const [ hour, minute ] = this.getHourAndMinute();

    return (
      <MaterialTheme
        hour={hour}
        minute={minute}
        autoMode={autoMode}
        language={LANGUAGE}
        timeMode={parseInt(timeMode)}
        clearFoucs={this.onClearFocus}
        handleHourChange={this.handleHourChange}
        handleMinuteChange={this.handleMinuteChange}
        handleTimeQuantumChange={this.handleTimeQuantumChange}
        timeQuantum={this.timeQuantum}
      />
    )
  }

  renderClassicTheme() {
    const { timeMode } = this.props;
    const [ hour, minute ] = this.getHourAndMinute();
    return (
      <ClassicTheme
        hour={hour}
        minute={minute}
        timeMode={parseInt(timeMode)}
        timeQuantum={this.timeQuantum}
        handleTimeChange={this.handleHourAndMinuteChange}
        handleTimeQuantumChange={this.handleTimeQuantumChange}
      />
    )
  }

  componentWillReceiveProps(nextProps) {
    const { focused } = nextProps;
    if (focused !== this.state.focused) {
      this.setState({ focused });
    }
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
    const validateTimeMode = getValidateTimeMode(timeMode);
    const quantum = LANGUAGE[this.timeQuantum.toLowerCase()] || this.timeQuantum;

    let times = `${hour} : ${minute}`;
    if (validateTimeMode === 12) {
      times = `${times} ${quantum}`;
    }
    const pickerPreviewClass = focused ? "time_picker_preview active" : "time_picker_preview";
    const containerClass = colorPalette === 'dark' ? "time_picker_container dark" : "time_picker_container";
    const previewContainerClass = withoutIcon ? "preview_container without_icon" : "preview_container";

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
          {theme === 'material' ? this.renderMaterialTheme() : this.renderClassicTheme()}
        </OutsideClickHandler>
      </div>
    )
  }
}

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;

export default TimePicker;
