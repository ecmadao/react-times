import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon-sandbox';

import TwelveHoursMode from '../../src/components/MaterialTheme/TwelveHoursMode';
import PickerDragHandler from '../../src/components/Picker/PickerDragHandler';
import languageHelper from '../../src/utils/language';

const phrases = languageHelper.get('en');

describe('TwelveHoursMode', () => {
  describe('TwelveHoursMode init with defaultTime', () => {
    const wrapper = shallow(
      <TwelveHoursMode
        hour={'01'}
        minute={'45'}
        focused={true}
        phrases={phrases}
      />
    );
    it('should render component correctly', () => {
      expect(wrapper.is('.time_picker_modal_container')).to.equal(true);
      expect(wrapper.find('.meridiem')).to.have.lengthOf(1);
    });

    it('should render PickerDragHandler component', () => {
      expect(wrapper.find(PickerDragHandler)).to.have.lengthOf(2);
    });

    it('should init correct state', () => {
      expect(wrapper.state()).to.deep.equal({
        hourPointerRotate: 30,
        minutePointerRotate: 270
      });
    });
  });

  describe('TwelveHoursMode Func', () => {
    const handleHourChange = sinon.stub();
    const handleMinuteChange = sinon.stub();
    const handleMeridiemChange = sinon.stub();
    const wrapper = shallow(
      <TwelveHoursMode
        focused
        hour={'01'}
        minute={'45'}
        meridiem={'AM'}
        phrases={phrases}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        handleMeridiemChange={handleMeridiemChange}
      />
    );
    it('should handleHourPointerClick', () => {
      wrapper.instance().handleHourPointerClick({
        time: 3,
        pointerRotate: 90
      });
      expect(wrapper.state().hourPointerRotate).to.equal(90);
      expect(handleHourChange.callCount).to.equal(1);
    });

    it('should handleHourPointerClick', () => {
      wrapper.instance().handleMinutePointerClick({
        time: 30,
        pointerRotate: 180
      });
      expect(wrapper.state().minutePointerRotate).to.equal(180);
      expect(handleMinuteChange.callCount).to.equal(1);
    });

    it('should handleMeridiemChange', () => {
      wrapper.instance().handleMeridiemChange();
      expect(handleMeridiemChange.callCount).to.equal(1);
      wrapper.instance().handleMeridiemChange();
      expect(handleMeridiemChange.callCount).to.equal(2);
    });
  });

  describe('Timezone handling', () => {
    describe('when showTimezone is true', () => {
      const mockTimezone = {
        zoneName: 'Some Zone',
        zoneAbbr: 'SZ'
      };
      const wrapper = shallow(
        <TwelveHoursMode
          hour={'01'}
          minute={'45'}
          focused={true}
          phrases={phrases}
          timezone={mockTimezone}
          showTimezone={true}
        />
      );

      it('should render the Timezone footer', () => {
        expect(wrapper.find('Timezone')).to.have.lengthOf(1);
      });
    });

    describe('when showTimezone is false', () => {
      const wrapper = shallow(
        <TwelveHoursMode
          hour={'01'}
          minute={'45'}
          focused={true}
          phrases={phrases}
          showTimezone={false}
        />
      );

      it('should not render the Timezone footer', () => {
        expect(wrapper.find('Timezone')).to.have.lengthOf(0);
      });
    });
  });
});
