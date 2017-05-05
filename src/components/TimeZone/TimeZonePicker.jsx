import {Typeahead} from 'react-bootstrap-typeahead';
import React, {PropTypes} from 'react';
import timeHelper from '../../utils/time'
import Fuse from 'fuse.js';

class TimezonePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const {selection} = props;
    this.state = {selection};
    this.handleSelection = this.handleSelection.bind(this);
    const abbrOpts = {
      threshold: 0.4,
      keys: [{
        name: 'city',
        weight: 0.5
      }, {
        name: 'zoneAbbr',
        weight: 0.2
      }]
    }

    this.searcher = new Fuse(timeHelper.tzMaps, abbrOpts);

  }

  handleSelection(selection) {
    this.setState({selection: selection[0].zoneName});
  }

  search(term) {
    return Promise(this.searcher.search(term))
      .then();
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
