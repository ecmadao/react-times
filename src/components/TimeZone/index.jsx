import React, { PropTypes } from 'react';

import timeHelper from '../../utils/time';

import TimeZonePicker from './TimeZonePicker';

const TIME = timeHelper.time();
TIME.tz = timeHelper.guessUserTz();

class TimeZone extends React.PureComponent {
  constructor(props) {
    super(props);
    const {timezone} = this.props;

    this.state = {
      focused: false,
      timezone
    };

    this.onClearFocus = this.onClearFocus.bind(this);
    this.handleFocusedChange = this.handleFocusedChange.bind(this);
  }

  onClearFocus() {
    this.setState({focused: false});
  }

  handleFocusedChange() {
    const {focused} = this.state;
    this.setState({focused: !focused});
  }

  render() {
    const {focused, timezone} = this.state;
    const {phrases, timezoneIsEditable} = this.props;

    return (
      <div className='time_picker_modal_container'>
        <div className='time_picker_modal_footer'>
          <span className='time_picker_modal_footer_timezone'>{timezone.zoneName} {timezone.zoneAbbr}</span>
        </div>
        {timezoneIsEditable
          ? <TimeZonePicker
              phrases={phrases}
              focused={focused}
              onClearFocus={this.onClearFocus}
            />
          : ''
        }
      </div>
    );
  }
}

TimeZone.propTypes = {
  phrases: PropTypes.object,
  timezone: PropTypes.shape({
    city: PropTypes.string,
    zoneAbbr: PropTypes.string,
    zoneName: PropTypes.string
  }),
  timezoneIsEditable: PropTypes.bool
};
TimeZone.defaultProps = {
  timezone: TIME.tz,
  timezoneIsEditable: false
};

export default TimeZone;
