import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import timeHelper from '../../utils/time';

import TimezonePicker from './TimezonePicker';

const TIME = timeHelper.time();
TIME.tz = timeHelper.guessUserTz();

class Timezone extends React.PureComponent {
  constructor(props) {
    super(props);
    const {timezone} = this.props;

    this.state = {
      focused: false,
      timezone
    };

    this.onClearFocus = this.onClearFocus.bind(this);
    this.handleFocusedChange = this.handleFocusedChange.bind(this);
    this.handleTimezoneChange = this.handleTimezoneChange.bind(this);
  }

  onClearFocus() {
    this.setState({focused: false});
  }

  handleFocusedChange() {
    if (!this.props.timezoneIsEditable) return;

    const {focused} = this.state;
    this.setState({focused: !focused});
  }

  handleTimezoneChange(timezone) {
    this.setState({timezone});
    const {onTimezoneChange} = this.props;
    onTimezoneChange && onTimezoneChange(timezone);
  }

  render() {
    const {focused, timezone} = this.state;
    const {phrases, timezoneIsEditable} = this.props;
    const footerClass = timezoneIsEditable
      ? 'time_picker_modal_footer clickable'
      : 'time_picker_modal_footer';

    const timeZonePicker = () => {
      if (!timezoneIsEditable || !focused) return '';

      return (
        <TimezonePicker
          key="timezonePicker"
          phrases={phrases}
          onClearFocus={this.onClearFocus}
          handleTimezoneChange={this.handleTimezoneChange}
        />
      );
    };

    return (
      <div>
        <div className={footerClass} onClick={this.handleFocusedChange}>
          <span className='time_picker_modal_footer_timezone'>{timezone.zoneName} {timezone.zoneAbbr}</span>
        </div>
        <CSSTransitionGroup
          transitionName="timezone_picker_modal_container"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          {timeZonePicker()}
        </CSSTransitionGroup>
      </div>
    );
  }
}

Timezone.propTypes = {
  phrases: PropTypes.object,
  timezone: PropTypes.shape({
    city: PropTypes.string,
    zoneAbbr: PropTypes.string,
    zoneName: PropTypes.string
  }),
  timezoneIsEditable: PropTypes.bool,
  onTimezoneChange: PropTypes.func,
};
Timezone.defaultProps = {
  timezone: TIME.tz,
  timezoneIsEditable: false,
  onTimezoneChange: () => {}
};

export default Timezone;
