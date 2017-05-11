import {Typeahead} from 'react-bootstrap-typeahead';
import React, {PropTypes} from 'react';
import timeHelper from '../../utils/time';

class TimeZonePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const {selection} = props;
    this.state = {selection};
    this.onTimezoneChange = this.onTimezoneChange.bind(this);
  }

  onTimezoneChange(selection) {
    const zoneObject = selection[0];
    if (zoneObject) this.setState({selection: zoneObject.zoneName});
  }

  render() {
    const { focused } = this.props;
    const modalClass = focused
        ? 'timezone_picker_modal_container active'
        : 'timezone_picker_modal_container';
    return (
      <div className={modalClass}>
        <Typeahead
          onChange={this.onTimezoneChange}
          labelKey={option => `Closest City: ${option.city}, Timezone: ${option.zoneAbbr}`}
          options={timeHelper.tzMaps}
          maxResults={5}
          minLength={3}
        />
        <h3>{this.state.selection}</h3>
      </div>
    )
  }
}

TimeZonePicker.propTypes = {
  focus: PropTypes.boolean,
  selection: PropTypes.string
};
TimeZonePicker.defaultProps = {
  focus: false,
  selection: 'No selection yet...'
};

export default TimeZonePicker;
