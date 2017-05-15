import {Typeahead} from 'react-bootstrap-typeahead';
import React, {PropTypes} from 'react';

import timeHelper from '../../utils/time';
import ICONS from '../../utils/icons';
import Button from '../Common/Button';

class TimeZonePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleTimezoneChange = this.handleTimezoneChange.bind(this);
  }

  handleTimezoneChange(selection) {
    const {handleTimezoneChange, onClearFocus} = this.props;
    const zoneObject = selection[0];
    if (zoneObject) {
      handleTimezoneChange && handleTimezoneChange(zoneObject);
      onClearFocus();
    }
  }

  render() {
    const { focused, phrases, onClearFocus } = this.props;
    const modalClass = focused
        ? 'timezone_picker_modal_container active'
        : 'timezone_picker_modal_container';
    return (
      <div className={modalClass}>
        <div className="timezone_picker_modal_header">
          <span onClick={onClearFocus}>
            {ICONS.chevronLeft}
          </span>
          <span className="timezone_picker_header_title">
            {phrases.timezonePickerTitle}
          </span>
        </div>
        <div className="timezone_picker_container">
          <div className="timezone_picker_search">
            <label>{phrases.timezonePickerLabel}</label>
            <Typeahead
              onChange={this.handleTimezoneChange}
              // TODO: Remove labels 'Closest City' and 'Timezone' as they're being matched in the search
              labelKey={option => `Closest City: ${option.city}, Timezone: ${option.zoneAbbr}`}
              options={timeHelper.tzMaps}
              maxResults={5}
              minLength={3}
            />
          </div>
        </div>
        <div className='buttons_wrapper'>
          <Button
            onClick={onClearFocus}
            text={phrases.closeTimePicker}
          />
        </div>
      </div>
    )
  }
}

TimeZonePicker.propTypes = {
  focused: PropTypes.bool,
  phrases: PropTypes.object,
  onClearFocus: PropTypes.func,
  handleTimezoneChange: PropTypes.func
};
TimeZonePicker.defaultProps = {
  focused: false,
  phrases: {
    closeTimePicker: 'close',
    timezonePickerTitle: 'Pick a TimeZone',
    timezonePickerLabel: 'Closest City or TimeZone'
  },
  onClearFocus: () => {},
  handleTimezoneChange: () => {}
};

export default TimeZonePicker;
