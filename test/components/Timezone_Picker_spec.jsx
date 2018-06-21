import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import TimezonePicker from '../../src/components/Timezone/TimezonePicker';
import languageHelper from '../../src/utils/language';
import '../_helpers/adapter';

const phrases = languageHelper.get('en');
const mockTimezone = {
  zoneName: 'Some Zone',
  zoneAbbr: 'SZ'
};

describe('TimezonePicker', () => {
  describe('TimezonePicker render', () => {
    const wrapper = shallow(
      <TimezonePicker
        phrases={phrases}
      />
    );

    it('should render a header with a title', () => {
      expect(wrapper.find('.timezone_picker_header_title').text()).to.equal(phrases.timezonePickerTitle);
    });

    it('should render a Typeahead', () => {
      expect(wrapper.find('OnClickOutside(Typeahead)')).to.have.lengthOf(1);
    });

    it('should render a close button', () => {
      expect(wrapper.find('Button').prop('children')).to.equal(phrases.close);
    });
  });

  describe('onClearFocus func', () => {
    it('should callback when onClick header "back" icon', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(
        <TimezonePicker
          phrases={phrases}
          onClearFocus={onFocusChangeStub}
        />
      );
      wrapper.find('.timezone_picker_modal_header').find('svg').parent().simulate('click');
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('should callback when onClick Button', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(
        <TimezonePicker
          phrases={phrases}
          onClearFocus={onFocusChangeStub}
        />
      );
      wrapper.find('Button').simulate('click');
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('should callback when timezone change', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(
        <TimezonePicker
          phrases={phrases}
          onClearFocus={onFocusChangeStub}
        />
      );
      wrapper.instance().handleTimezoneChange([mockTimezone]);
      expect(onFocusChangeStub.callCount).to.equal(1);
    });
  });

  describe('handle timezone change func', () => {
    it('should callback when timezone change', () => {
      const onTimezoneChangeStub = sinon.stub();
      const wrapper = shallow(
        <TimezonePicker
          phrases={phrases}
          handleTimezoneChange={onTimezoneChangeStub}
        />
      );
      wrapper.instance().handleTimezoneChange([mockTimezone]);
      expect(onTimezoneChangeStub.callCount).to.equal(1);
      expect(onTimezoneChangeStub.calledWith(mockTimezone));
    });
  });
});
