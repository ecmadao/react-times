import {Typeahead} from 'react-bootstrap-typeahead';
import React, {PropTypes} from 'react';
import timeHelper from '../../utils/time';

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
    const { focused } = this.props;
    const modalClass = focused
        ? 'timezone_picker_modal_container active'
        : 'timezone_picker_modal_container';
    return (
      <div className={modalClass}>
        <Typeahead
          onChange={this.handleTimezoneChange}
          labelKey={option => `Closest City: ${option.city}, Timezone: ${option.zoneAbbr}`}
          options={timeHelper.tzMaps}
          maxResults={5}
          minLength={3}
        />
      </div>
    )
  }
}

TimeZonePicker.propTypes = {
  focused: PropTypes.boolean,
  onClearFocus: PropTypes.func,
  handleTimezoneChange: PropTypes.func
};
TimeZonePicker.defaultProps = {
  focused: false,
  onClearFocus: () => {},
  handleTimezoneChange: () => {}
};

export default TimeZonePicker;
