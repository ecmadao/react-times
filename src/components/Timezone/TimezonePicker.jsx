import {Typeahead} from 'react-bootstrap-typeahead';
import React from 'react';
import PropTypes from 'prop-types';

import timeHelper from '../../utils/time';
import ICONS from '../../utils/icons';
import Button from '../Common/Button';

class TimezonePicker extends React.PureComponent {
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
    const { phrases, onClearFocus } = this.props;
    return (
      <div className="timezone_picker_modal_container">
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
              labelKey={option => `${option.city} - ${option.zoneAbbr}`}
              options={timeHelper.tzMaps}
              maxResults={5}
              minLength={3}
            />
          </div>
        </div>
        <div className='buttons_wrapper'>
          <Button
            onClick={onClearFocus}
            text={phrases.close}
          />
        </div>
      </div>
    )
  }
}

TimezonePicker.propTypes = {
  phrases: PropTypes.object,
  onClearFocus: PropTypes.func,
  handleTimezoneChange: PropTypes.func
};
TimezonePicker.defaultProps = {
  onClearFocus: () => {},
  handleTimezoneChange: () => {}
};

export default TimezonePicker;
