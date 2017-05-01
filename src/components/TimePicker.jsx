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
TIME.timezone = timeHelper.guessUserTz().zoneName;

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
  timezone: PropTypes.string,
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
  theme: 'material',
  time: TIME.current,
  timeMode: TIME.mode,
  timezone: TIME.timezone,
  trigger: null,
  withoutIcon: false
};

class TimePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const {focused} = props;

    const timeData = this.timeData();
    const timezoneData = timeHelper.tzForName(timeData.timezone);
    const localMessages = this.languageData();

    this.state = {
      focused,
      localMessages,
      timeData,
      timezoneData
    };

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

  languageData() {
    const {language} = this.props;
    return languageHelper.get(language);
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
    const {hour24, minute} = this.state.timeData;
    return [hour24, minute];
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
    const {meridiem} = this.state.timeData;
    const {localMessages} = this.state;
    const localMeridiem = localMessages[meridiem.toLowerCase()];

    return localMeridiem;
  }

  renderMaterialTheme() {
    const {autoMode, draggable} = this.props;
    const {localMessages, timeData} = this.state;

    const {hour24, minute, mode} = timeData;
    const localMeridiem = this.meridiem;

    // console.log('state in TimePicker.renderMaterialTheme():', this.state);
    // console.log('props in TimePicker.renderMaterialTheme():', this.props);

    return (
      <MaterialTheme
        autoMode={autoMode}
        clearFocus={this.onClearFocus}
        draggable={draggable}
        handleHourChange={this.handleHourChange}
        handleMeridiemChange={this.handleMeridiemChange}
        handleMinuteChange={this.handleMinuteChange}
        hour={hour24}
        localMessages={localMessages}
        meridiem={localMeridiem}
        minute={minute}
        timeMode={mode}
      />
    );
  }

  renderClassicTheme() {
    const {colorPalette} = this.props;
    const {timeData} = this.state;
    const {hour24, mode, minute} = timeData;
    const localMeridiem = this.meridiem;

    return (
      <ClassicTheme
        colorPalette={colorPalette}
        handleMeridiemChange={this.handleMeridiemChange}
        handleTimeChange={this.handleHourAndMinuteChange}
        hour={hour24}
        meridiem={localMeridiem}
        minute={minute}
        timeMode={parseInt(mode)}
      />
    );
  }

  render() {
    const {
      colorPalette,
      placeholder,
      theme,
      trigger,
      withoutIcon
    } = this.props;

    const {focused, localMessages, timeData} = this.state;
    const {hour12, hour24, minute, mode} = timeData;
    const localMeridiem = this.meridiem;

    const times = (mode === 12)
      ? `${hour12} : ${minute} ${localMeridiem}`
      : `${hour24} : ${minute}`;
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
