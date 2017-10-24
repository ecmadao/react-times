import React from 'react';
import moment from 'moment';
import Timezone from '../src/components/Timezone';
import timeHelper from '../src/utils/time';
import languageHelper from '../src/utils/language';

const TIME = timeHelper.time();
TIME.current = timeHelper.current();
TIME.tz = timeHelper.guessUserTz();

class TimezonePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    const {timezone} = this.props;

    this.state = {
      timezone
    };
  }

  languageData() {
    const {language = 'en', phrases = {}} = this.props;
    return Object.assign({}, languageHelper.get(language), phrases);
  }

  render() {
    const {timezone} = this.state;
    const {onTimezoneChange} = this.props;

    return (
      <div>
        <div className="outside_container active">
          <div className='time_picker_modal_container'>
            <Timezone
              phrases={this.languageData()}
              timezone={timezone}
              timezoneIsEditable={true}
              onTimezoneChange={onTimezoneChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

TimezonePickerWrapper.defaultProps = {
  timezone: TIME.tz
};

export default TimezonePickerWrapper;
