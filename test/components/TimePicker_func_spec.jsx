import React from 'react';
import TimePicker from '../../src/components/TimePicker';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon-sandbox';

describe('TimePicker func', () => {
  describe('handle focus change func', () => {
    it('should focus', () => {
      const wrapper = shallow(<TimePicker />);
      wrapper.instance().onFocus();
      expect(wrapper.state().focused).to.equal(true);
    });

    it('should clear focus', () => {
      const wrapper = shallow(<TimePicker />);
      wrapper.instance().onClearFocus();
      expect(wrapper.state().focused).to.equal(false);
    });

    it('should callback when focuse', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(<TimePicker onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onFocus();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('should callback when clear focuse', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(<TimePicker onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onClearFocus();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });
  });

  describe('handle hour change func', () => {
    // it('should change hour', () => {
    //   const wrapper = shallow(<TimePicker />);
    //   wrapper.instance().handleHourChange(11);
    //   expect(wrapper.props().time.split(':')[0]).to.equal('11');
    // });
    //
    // it('should change to validate hour', () => {
    //   const wrapper = shallow(<TimePicker />);
    //   wrapper.instance().handleHourChange(1);
    //   expect(wrapper.props().time.split(':')[1]).to.equal('01');
    // });

    it('should change callback when hour change', () => {
      const onHourChangeStub = sinon.stub();
      const wrapper = shallow(<TimePicker onHourChange={onHourChangeStub} />);
      wrapper.instance().handleHourChange(1);
      expect(onHourChangeStub.callCount).to.equal(1);
    });
  });

  describe('handle minute change func', () => {
    // it('should change minute', () => {
    //   const wrapper = shallow(<TimePicker />);
    //   wrapper.instance().handleMinuteChange(59);
    //   expect(wrapper.state().minute).to.equal('59');
    // });
    //
    // it('should change to validate minute', () => {
    //   const wrapper = shallow(<TimePicker />);
    //   wrapper.instance().handleMinuteChange(9);
    //   expect(wrapper.state().minute).to.equal('09');
    // });

    it('should change callback when minute change', () => {
      const onMinuteChangeStub = sinon.stub();
      const wrapper = shallow(<TimePicker onMinuteChange={onMinuteChangeStub} />);
      wrapper.instance().handleMinuteChange(1);
      expect(onMinuteChangeStub.callCount).to.equal(1);
    });
  });
});
