import React, { PropTypes } from 'react';
import TwelveHoursMode from './TwelveHoursMode';
import TwentyFourHoursMode from './TwentyFourHoursMode';
import language from '../../language';

const propTypes = {
  hour: PropTypes.string,
  minute: PropTypes.string,
  timeMode: PropTypes.number,
  autoMode: PropTypes.bool,
  dragable: PropTypes.bool,
  language: PropTypes.object,
  timeQuantum: PropTypes.string,
  handleHourChange: PropTypes.func,
  handleMinuteChange: PropTypes.func,
  handleTimeQuantumChange: PropTypes.func
};

const defaultProps = {
  hour: '00',
  minute: '00',
  timeMode: 24,
  autoMode: true,
  timeQuantum: 'AM',
  handleHourChange: () => {},
  handleMinuteChange: () => {},
  handleTimeQuantumChange: () => {}
};

class MaterialTheme extends React.Component {
  renderTwentyFourHoursMode() {
    const {
      hour,
      minute,
      autoMode,
      dragable,
      clearFoucs,
      handleHourChange,
      handleMinuteChange
    } = this.props;
    return (
      <TwentyFourHoursMode
        hour={hour}
        minute={minute}
        dragable={dragable}
        autoMode={autoMode}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        clearFoucs={clearFoucs}
      />
    )
  }

  renderTwelveHoursMode() {
    const {
      hour,
      minute,
      language,
      dragable,
      clearFoucs,
      timeQuantum,
      handleHourChange,
      handleMinuteChange,
      handleTimeQuantumChange
    } = this.props;

    return (
      <TwelveHoursMode
        hour={hour}
        minute={minute}
        dragable={dragable}
        language={language}
        clearFoucs={clearFoucs}
        timeQuantum={timeQuantum}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        handleTimeQuantumChange={handleTimeQuantumChange}
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
