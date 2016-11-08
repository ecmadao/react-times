import React from 'react';
import TwelveHoursMode from './TwelveHoursMode';
import TwentyFourHoursMode from './TwentyFourHoursMode';

class MaterialTheme extends React.Component {
  renderTwentyFourHoursMode() {
    let {
      hour,
      minute,
      handleHourChange,
      handleMinuteChange
    } = this.props;
    return (
      <TwentyFourHoursMode
        hour={hour}
        minute={minute}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
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
    const {timeMode} = this.props;
    return (
      <div>
        {timeMode === 24 ? this.renderTwentyFourHoursMode() : this.renderTwelveHoursMode()}
      </div>
    )
  }
}

export default MaterialTheme;
