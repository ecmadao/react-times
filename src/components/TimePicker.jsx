import React, { PropTypes } from 'react';

import OutsideClickHandler from './OutsideClickHandler';
import MaterialTheme from './MaterialTheme';
import ClassicTheme from './ClassicTheme';
import timeHelper from '../utils/time.js';
import ICONS from '../utils/icons';
import language from '../utils/language';

let LANGUAGE = language.get();

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
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  time: PropTypes.string,
  timeMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
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
  meridiem: null, // meridiem can be set *or* derived!
  onFocusChange: () => {},
  onHourChange: () => {},
  onMeridiemChange: () => {},
  onMinuteChange: () => {},
  onTimeChange: () => {},
  placeholder: '',
  theme: 'material',
  time: timeHelper.current(),
  timeMode: 24,
  trigger: null,
  withoutIcon: false
};

class TimePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const { focused } = props;
    this.state = { focused };
    LANGUAGE = language.get(props.language);

    this.handleHourAndMinuteChange = this.handleHourAndMinuteChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.onFocus = this.onFocus.bind(this);
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

  handleMeridiemChange(meridiem) {
    const { onMeridiemChange } = this.props;
    onMeridiemChange && onMeridiemChange(meridiem);
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

  get meridiem() {
    const { meridiem, time, timeMode } = this.props;
    return meridiem || timeHelper.validateQuantum(time, timeMode)
  }

  renderMaterialTheme() {
    const { timeMode, autoMode, draggable } = this.props;
    const [ hour, minute ] = this.getHourAndMinute();

    return (
      <MaterialTheme
        autoMode={autoMode}
        clearFoucs={this.onClearFocus}
        draggable={draggable}
        handleHourChange={this.handleHourChange}
        handleMeridiemChange={this.handleMeridiemChange}
        handleMinuteChange={this.handleMinuteChange}
        hour={hour}
        language={LANGUAGE}
        meridiem={this.meridiem}
        minute={minute}
        timeMode={parseInt(timeMode)}
      />
    );
  }

  renderClassicTheme() {
    const { timeMode, colorPalette } = this.props;
    const [ hour, minute ] = this.getHourAndMinute();
    return (
      <ClassicTheme
        colorPalette={colorPalette}
        handleMeridiemChange={this.handleMeridiemChange}
        handleTimeChange={this.handleHourAndMinuteChange}
        hour={hour}
        meridiem={this.meridiem}
        minute={minute}
        timeMode={parseInt(timeMode)}
      />
    );
  }

  render() {
    const {
      colorPalette,
      placeholder,
      theme,
      time,
      timeMode,
      trigger,
      withoutIcon
    } = this.props;

    const { focused } = this.state;
    const [hour, minute] = this.getHourAndMinute();
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
