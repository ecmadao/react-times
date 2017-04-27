import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon-sandbox';

import TwelveHoursMode from '../../src/components/MaterialTheme/TwelveHoursMode';
import PickerDragHandler from '../../src/components/Picker/PickerDragHandler';

describe('TwelveHoursMode', () => {
  describe('TwelveHoursMode init with defaultTime in 12h format', () => {
    const wrapper = shallow(
      <TwelveHoursMode
        hour={'01'}
        minute={'45'}
        focused={true}
      />
    );
    it('should render component correctly', () => {
      expect(wrapper.is('.time_picker_modal_container')).to.equal(true);
      expect(wrapper.find('.quantum')).to.have.lengthOf(1);
      expect(wrapper.find('.quantum').html()).to.equal(`<span class="time_picker_header quantum">AM</span>`);
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

  describe('TwelveHoursMode', () => {
    describe('TwelveHoursMode init with defaultTime in 24h format', () => {
      const wrapper = shallow(
        <TwelveHoursMode
            hour={'13'}
            minute={'45'}
            focused={true}
        />
      );

      it('should render component correctly', () => {
        expect(wrapper.is('.time_picker_modal_container')).to.equal(true);
        expect(wrapper.find('.quantum')).to.have.lengthOf(1);
        expect(wrapper.find('.quantum').html()).to.equal(`<span class="time_picker_header quantum">PM</span>`);
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
  });

  describe('TwelveHoursMode Func', () => {
    const handleHourChange = sinon.stub();
    const handleMinuteChange = sinon.stub();
    const handleTimeQuantumChange = sinon.stub();
    const wrapper = shallow(
      <TwelveHoursMode
        hour={'01'}
        minute={'45'}
        focused={true}
        meridiem={'AM'}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
        handleTimeQuantumChange={handleTimeQuantumChange}
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

    it('should handleTimeQuantumChange', () => {
      wrapper.instance().handleTimeQuantumChange('AM');
      expect(handleTimeQuantumChange.callCount).to.equal(0);
      wrapper.instance().handleTimeQuantumChange('PM');
      expect(handleTimeQuantumChange.callCount).to.equal(1);
    });
  });
});
