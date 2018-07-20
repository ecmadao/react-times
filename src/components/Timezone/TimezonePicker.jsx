import React from 'react';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';

import timeHelper from '../../utils/time';
import ICONS from '../../utils/icons';
import Button from '../Common/Button';

class TimezonePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleTimezoneChange = this.handleTimezoneChange.bind(this);
  }

  handleTimezoneChange(selection) {
    const { handleTimezoneChange, onClearFocus } = this.props;
    const zoneObject = selection[0];
    if (zoneObject) {
      handleTimezoneChange && handleTimezoneChange(zoneObject);
      onClearFocus();
    }
  }

  render() {
    const { phrases, onClearFocus } = this.props;
    return (
      <div className="timezone_picker_modal_container">
        <div className="timezone_picker_modal_header">
          <span onClick={onClearFocus} className="icon">
            {ICONS.chevronLeft}
          </span>
          <span className="timezone_picker_header_title">
            {phrases.timezonePickerTitle}
          </span>
        </div>
        <div className="timezone_picker_container">
          <div className="timezone_picker_search">
            <Typeahead
              onChange={this.handleTimezoneChange}
              labelKey={option => `${option.city} - ${option.zoneAbbr}`}
              options={timeHelper.tzMaps}
              maxResults={5}
              minLength={3}
              placeholder={phrases.timezonePickerLabel}
            />
          </div>
        </div>
        <div className="buttons_wrapper">
          <Button
            onClick={onClearFocus}
            className="time_picker_button"
          >
            {phrases.close}
          </Button>
        </div>
      </div>
    );
  }
}

TimezonePicker.propTypes = {
  phrases: PropTypes.object,
  onClearFocus: PropTypes.func,
  handleTimezoneChange: PropTypes.func
};
TimezonePicker.defaultProps = {
  onClearFocus: Function.prototype,
  handleTimezoneChange: Function.prototype
};

export default TimezonePicker;
