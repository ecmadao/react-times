import React, {PropTypes} from 'react';
import TwelveHoursMode from './TwelveHoursMode';
import TwentyFourHoursMode from './TwentyFourHoursMode';

const propTypes = {
  hour: PropTypes.string,
  minute: PropTypes.string,
  timeMode: PropTypes.number,
  autoMode: PropTypes.bool,
  timeInterval: PropTypes.string,
  handleHourChange: PropTypes.func,
  handleMinuteChange: PropTypes.func,
  handleTimeIntervalChange: PropTypes.func
};

const defaultProps = {
  hour: '00',
  minute: '00',
  timeMode: 24,
  autoMode: true,
  timeInterval: 'AM',
  handleHourChange: () => {},
  handleMinuteChange: () => {},
  handleTimeIntervalChange: () => {}
};

class MaterialTheme extends React.Component {
  renderTwentyFourHoursMode() {
    let {
      hour,
      minute,
      autoMode,
      clearFoucs,
      handleHourChange,
      handleMinuteChange
    } = this.props;
    return (
      <TwentyFourHoursMode
        hour={hour}
        minute={minute}
        autoMode={autoMode}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        clearFoucs={clearFoucs}
      />
    )
  }

  renderTwelveHoursMode() {
    let {
      hour,
      minute,
      timeInterval,
      handleHourChange,
      handleMinuteChange,
      handleTimeIntervalChange
    } = this.props;
    return (
      <TwelveHoursMode
        hour={hour}
        minute={minute}
        timeInterval={timeInterval}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        handleTimeIntervalChange={handleTimeIntervalChange}
      />
    )
  }

  render() {
    const { timeMode } = this.props;
    return (
      <div>
        {parseInt(timeMode) === 24 ? this.renderTwentyFourHoursMode() : this.renderTwelveHoursMode()}
      </div>
    )
  }
}

MaterialTheme.propTypes = propTypes;
MaterialTheme.defaultProps = defaultProps;

export default MaterialTheme;
