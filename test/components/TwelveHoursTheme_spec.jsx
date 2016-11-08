import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon-sandbox';

import TwelveHoursMode from '../../src/components/TwelveHoursMode';
import PickerDargHandler from '../../src/components/PickerDargHandler';

describe('TwelveHoursMode', () => {
  describe('TwelveHoursMode Init', () => {
    const wrapper = shallow(
      <TwelveHoursMode
        hour={'01'}
        minute={'45'}
        focused={true}
      />
    );
    it('should render component correctly', () => {
      expect(wrapper.is('.time_picker_modal_container')).to.equal(true);
    });

    it('should render PickerDargHandler component', () => {
      expect(wrapper.find(PickerDargHandler)).to.have.lengthOf(2);
    });

    it('should init currect state', () => {
      expect(wrapper.state()).to.deep.equal({
        hourPointerRotate: 30,
        minutePointerRotate: 270
      });
    });
  });

  describe('TwelveHoursMode Func', () => {
    const handleHourChange = sinon.stub();
    const handleMinuteChange = sinon.stub();
    const handleTimeIntervalChange = sinon.stub();
    const wrapper = shallow(
      <TwelveHoursMode
        hour={'01'}
        minute={'45'}
        focused={true}
        timeInterval={'AM'}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        handleTimeIntervalChange={handleTimeIntervalChange}
      />
    );
    it('should handleHourPointerClick', () => {
      wrapper.instance().handleHourPointerClick(3, 90);
      expect(wrapper.state().hourPointerRotate).to.equal(90);
      expect(handleHourChange.callCount).to.equal(1);
    });

    it('should handleHourPointerClick', () => {
      wrapper.instance().handleMinutePointerClick(30, 180);
      expect(wrapper.state().minutePointerRotate).to.equal(180);
      expect(handleMinuteChange.callCount).to.equal(1);
    });

    it('should handleTimeIntervalChange', () => {
      wrapper.instance().handleTimeIntervalChange('AM');
      expect(handleTimeIntervalChange.callCount).to.equal(0);
      wrapper.instance().handleTimeIntervalChange('PM');
      expect(handleTimeIntervalChange.callCount).to.equal(1);
    });
  });
});
