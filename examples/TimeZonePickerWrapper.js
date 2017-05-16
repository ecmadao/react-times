import React from 'react';

import TimeZonePicker from '../src/components/TimeZone/TimeZonePicker';
import timeHelper from '../src/utils/time';
import languageHelper from '../src/utils/language';

const TIME = timeHelper.time();
TIME.current = timeHelper.current();
TIME.tz = timeHelper.guessUserTz();

class TimeZonePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    const {timezone} = this.props;

    this.state = {
      focused: false,
      timezone
    };

    this.onClearFocus = this.onClearFocus.bind(this);
    this.handleFocusedChange = this.handleFocusedChange.bind(this);
    this.handleTimezoneChange = this.handleTimezoneChange.bind(this);
  }

  languageData() {
    const {language = 'en', phrases = {}} = this.props;
    return Object.assign({}, languageHelper.get(language), phrases);
  }

  onClearFocus() {
    this.setState({focused: false});
  }

  handleFocusedChange() {
    const {focused} = this.state;
    this.setState({focused: !focused});
  }

  handleTimezoneChange(timezone) {
    this.setState({timezone});
  }

  render() {
    const {focused, timezone} = this.state;

    return (
      <div>
        <div className="outside_container active">
          <div className='time_picker_modal_container'>
            <div className='time_picker_modal_footer'
              onClick={this.handleFocusedChange}
            >
              <span className='time_picker_modal_footer_timezone'>{timezone.zoneName} {timezone.zoneAbbr}</span>
            </div>
          </div>
          <TimeZonePicker
            {...this.props}
            phrases={this.languageData()}
            focused={focused}
            onClearFocus={this.onClearFocus}
            handleTimezoneChange={this.handleTimezoneChange}
          />
        </div>
      </div>
    )
  }
}

TimeZonePickerWrapper.defaultProps = {
  timezone: TIME.tz
};

export default TimeZonePickerWrapper;
