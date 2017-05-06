import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon-sandbox';

import TwentyFourHoursMode from '../../src/components/MaterialTheme/TwentyFourHoursMode';
import PickerDragHandler from '../../src/components/Picker/PickerDragHandler';

describe('TwentyFourHoursMode', () => {
  describe('TwentyFourHoursMode Init', () => {
    const wrapper = shallow(
      <TwentyFourHoursMode hour={'03'} />
    );
    it('should render component correctly', () => {
      expect(wrapper.is('.time_picker_modal_container')).to.equal(true);
    });

    it('should render PickerDragHandler component', () => {
      expect(wrapper.find(PickerDragHandler)).to.have.lengthOf(1);
    });

    it('should init currect state', () => {
      expect(wrapper.state()).to.deep.equal({
        step: 0,
        pointerRotate: 90
      });
    });
  });

  describe('TwentyFourHoursMode Func', () => {
    const handleHourChange = sinon.stub();
    const handleMinuteChange = sinon.stub();
    const wrapper = shallow(
      <TwentyFourHoursMode
        hour={'01'}
        minute={'45'}
        handleHourChange={handleHourChange}
        handleMinuteChange={handleMinuteChange}
      />
    );

    it('should handleHourChange', () => {
      wrapper.instance().handleTimePointerClick(6, 180);
      expect(wrapper.state().pointerRotate).to.equal(180);
      expect(handleHourChange.callCount).to.equal(1);
    });

    it('should handleStepChange', () => {
      wrapper.instance().handleStepChange(1);
      expect(wrapper.state()).to.deep.equal({
        step: 0,
        pointerRotate: 180
      });
      setTimeout(() => {
        expect(wrapper.state()).to.deep.equal({
          step: 1,
          pointerRotate: 270
        });
      }, 300);
    });

    it('should handleMinuteChange', () => {
      const newWrapper = shallow(
        <TwentyFourHoursMode
          hour={'01'}
          minute={'45'}
          step={1}
          handleHourChange={handleHourChange}
          handleMinuteChange={handleMinuteChange}
        />
      );
      newWrapper.instance().handleTimePointerClick(30, 180);
      // after click minute, we close the panel & reset step state.
      expect(newWrapper.state().pointerRotate).to.equal(30);
      expect(newWrapper.state().step).to.equal(0);
      expect(handleMinuteChange.callCount).to.equal(1);
    });
  });
});
