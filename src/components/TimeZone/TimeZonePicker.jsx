import {Typeahead} from 'react-bootstrap-typeahead';
import React, {PropTypes} from 'react';
import timeHelper from '../../utils/time';

class TimezonePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const {selection} = props;
    this.state = {selection};
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(selection) {
    const zoneObject = selection[0];
    if (zoneObject) this.setState({selection: zoneObject.zoneName});
  }

  render() {
    return (
      <div>
        <Typeahead
          onChange={this.handleSelection}
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

TimezonePicker.propTypes = {
  selection: PropTypes.string
};
TimezonePicker.defaultProps = {
  selection: 'No selection yet...'
};

export default TimezonePicker;
