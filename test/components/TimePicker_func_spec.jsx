import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import languageHelper from '../../src/utils/language';
import TimePicker from '../../src/components/TimePicker';
import '../_helpers/adapter';

describe('TimePicker func', () => {
  describe('handle focus change func', () => {
    it('should focus', () => {
      const wrapper = shallow(<TimePicker />);
      wrapper.instance().onFocus();
      expect(wrapper.state().focused).to.equal(true);
    });

    it('should clear focus', () => {
      const wrapper = shallow(<TimePicker />);
      wrapper.instance().onBlur();
      expect(wrapper.state().focused).to.equal(false);
    });

    it('should callback when focus', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(<TimePicker onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onFocus();
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
      const onTimeChangeStub = sinon.stub();
      const wrapper = shallow(<TimePicker onTimeChange={onTimeChangeStub} />);
      wrapper.instance().handleHourChange(1);
      expect(onTimeChangeStub.callCount).to.equal(1);
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
      const onTimeChangeStub = sinon.stub();
      const wrapper = shallow(<TimePicker onTimeChange={onTimeChangeStub} />);
      wrapper.instance().handleMinuteChange(1);
      expect(onTimeChangeStub.callCount).to.equal(1);
    });
  });

  describe('languageData func', () => {
    it('should return the default language messages when no phrases provided', () => {
      const wrapper = shallow(<TimePicker />);
      const messages = wrapper.instance().languageData;
      expect(messages).to.deep.equal(languageHelper.get('en'));
    });

    it('should return the phrases when all phrases provided', () => {
      const phrases = {
        confirm: 'foo',
        cancel: 'bar',
        close: 'baz',
        timezonePickerLabel: 'This is a Label',
        timezonePickerTitle: 'This is a Title',
        am: 'fizz',
        pm: 'buzz'
      };
      const wrapper = shallow(<TimePicker phrases={phrases} />);
      const messages = wrapper.instance().languageData;
      expect(messages).to.deep.equal(phrases);
    });

    it('should return the default language messages for any phrases not provided', () => {
      const phrases = {
        cancel: 'bar',
        close: 'baz'
      };
      const expectedMessages = Object.assign({}, languageHelper.get('en'), phrases);
      const wrapper = shallow(<TimePicker phrases={phrases} />);
      const messages = wrapper.instance().languageData;
      expect(messages).to.deep.equal(expectedMessages);
    });
  });
});
