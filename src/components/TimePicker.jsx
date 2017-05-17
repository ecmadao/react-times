import React, {PropTypes} from 'react';

import OutsideClickHandler from './OutsideClickHandler';
import MaterialTheme from './MaterialTheme';
import ClassicTheme from './ClassicTheme';
import timeHelper from '../utils/time.js';
import languageHelper from '../utils/language';
import ICONS from '../utils/icons';

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
  withoutIcon: PropTypes.bool
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
  placeholder: '',
  showTimezone: false,
  theme: 'material',
  time: TIME.current,
  timeMode: TIME.mode,
  trigger: null,
  withoutIcon: false
};

class TimePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const {focused} = props;

    this.state = {focused};

    this.handleHourAndMinuteChange = this.handleHourAndMinuteChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  timeData() {
    const {meridiem, time, timeMode, timezone} = this.props;
    const timeData = timeHelper.time(time, meridiem, timeMode, timezone);

    return timeData;
  }

  timezoneData() {
    const timeData = this.timeData();
    return timeHelper.tzForName(timeData.timezone);
  }

  languageData() {
    const {language, phrases = {}} = this.props;
    return Object.assign({}, languageHelper.get(language), phrases);
  }

  componentWillReceiveProps(nextProps) {
    const {focused} = nextProps;
    if (focused !== this.state.focused) {
      this.setState({focused});
    }
  }

  onFocus() {
    this.setState({focused: true});
    const {onFocusChange} = this.props;
    onFocusChange && onFocusChange(true);
  }

  getHourAndMinute() {
    const {timeMode} = this.props;
    const timeData = this.timeData();
    // Since someone might pass a time in 24h format, etc., we need to get it from
    // timeData to 'translate' it into the local format, including its accurate meridiem
    const hour = (parseInt(timeMode) === 12) ? timeData.hour12 : timeData.hour24;
    const minute = timeData.minute;
    return [hour, minute];
  }

  onClearFocus() {
    this.setState({focused: false});
    const {onFocusChange} = this.props;
    onFocusChange && onFocusChange(false);
  }

  handleHourChange(hour) {
    hour = timeHelper.validate(hour);
    const {onHourChange} = this.props;
    const [_, minute] = this.getHourAndMinute();
    onHourChange && onHourChange(hour);
    this.handleTimeChange(`${hour}:${minute}`);
  }

  handleMinuteChange(minute) {
    minute = timeHelper.validate(minute);
    const {onMinuteChange} = this.props;
    const [hour, _] = this.getHourAndMinute();
    onMinuteChange && onMinuteChange(minute);
    this.handleTimeChange(`${hour}:${minute}`);
  }

  handleMeridiemChange(meridiem) {
    const {onMeridiemChange} = this.props;
    onMeridiemChange && onMeridiemChange(meridiem);
  }

  handleTimeChange(time) {
    const {onTimeChange} = this.props;
    onTimeChange && onTimeChange(time);
  }

  handleHourAndMinuteChange(time) {
    const {onTimeChange, autoMode} = this.props;
    if (autoMode) {
      this.onClearFocus();
    }
    return onTimeChange && onTimeChange(time);
  }

  get meridiem() {
    const {meridiem} = this.props;

    const timeData = this.timeData();
    const localMessages = this.languageData();
    // eslint-disable-next-line no-unneeded-ternary
    const m = (meridiem) ? meridiem : timeData.meridiem;
    // eslint-disable-next-line no-extra-boolean-cast
    const localMeridiem = !!(m.match(/^am|pm/i)) ? localMessages[m.toLowerCase()] : m;

    return localMeridiem;
  }

  renderMaterialTheme() {
    const {timeMode, showTimezone, timezoneIsEditable, autoMode, draggable, language} = this.props;
    const [hour, minute] = this.getHourAndMinute();
    const timezoneData = this.timezoneData();

    return (
      <MaterialTheme
        autoMode={autoMode}
        clearFocus={this.onClearFocus}
        draggable={draggable}
        handleHourChange={this.handleHourChange}
        handleMeridiemChange={this.handleMeridiemChange}
        handleMinuteChange={this.handleMinuteChange}
        hour={hour}
        language={language}
        meridiem={this.meridiem}
        minute={minute}
        phrases={this.languageData()}
        showTimezone={showTimezone}
        timeMode={parseInt(timeMode)}
        timezone={timezoneData}
        timezoneIsEditable={timezoneIsEditable}
      />
    );
  }

  renderClassicTheme() {
    const {timeMode, colorPalette} = this.props;
    const [hour, minute] = this.getHourAndMinute();

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
      theme,
      trigger,
      timeMode,
      placeholder,
      withoutIcon,
      colorPalette
    } = this.props;

    const {focused} = this.state;
    const [hour, minute] = this.getHourAndMinute();
    const validTimeMode = timeHelper.validateTimeMode(timeMode);

    const times = (validTimeMode === 12)
      ? `${hour} : ${minute} ${this.meridiem}`
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
        { trigger || (
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
