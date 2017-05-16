import React, { PropTypes } from 'react';

class TimeZone extends React.PureComponent {
  constructor(props) {
    super(props);
    const {timezone} = this.props;

    this.state = {
      timezone
    };
  }

  render() {
    const {timezone} = this.state;

    return (
      <div className='time_picker_modal_footer'>
        <span className='time_picker_modal_footer_timezone'>{timezone.zoneName} {timezone.zoneAbbr}</span>
      </div>
    )
  }
}

TimeZone.propTypes = {
  phrases: PropTypes.object,
  timezone: PropTypes.timezone
};

export default TimeZone;
