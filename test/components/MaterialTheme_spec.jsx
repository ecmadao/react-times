import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon-sandbox';

import MaterialTheme from '../../src/components/MaterialTheme';
import PickerDargHandler from '../../src/components/PickerDargHandler';

describe('MaterialTheme', () => {
  describe('MaterialTheme Init', () => {
    const wrapper = shallow(
      <MaterialTheme hour={'03'} />
    );
    it('should render component correctly', () => {
      expect(wrapper.is('.time_picker_modal_container')).to.equal(true);
    });

    it('should render PickerDargHandler component', () => {
      expect(wrapper.find(PickerDargHandler)).to.have.lengthOf(1);
    });

    it('should init currect state', () => {
      expect(wrapper.state()).to.deep.equal({
        step: 0,
        pointerRotate: 90
      });
    });
  });

  describe('MaterialTheme Func', () => {
    const handleHourChange = sinon.stub();
    const handleMinuteChange = sinon.stub();
    const wrapper = shallow(
      <MaterialTheme
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
        <MaterialTheme
          hour={'01'}
          minute={'45'}
          step={1}
          handleHourChange={handleHourChange}
          handleMinuteChange={handleMinuteChange}
        />
      );
      newWrapper.instance().handleTimePointerClick(30, 180);
      expect(newWrapper.state().pointerRotate).to.equal(180);
      expect(newWrapper.state().step).to.equal(1);
      expect(handleMinuteChange.callCount).to.equal(1);
    });
  });
});
