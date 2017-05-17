import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon-sandbox';

import TimeZonePicker from '../../src/components/TimeZone/TimeZonePicker';
import languageHelper from '../../src/utils/language';

const phrases = languageHelper.get('en');
const mockTimezone = {
  zoneName: 'Some Zone',
  zoneAbbr: 'SZ'
};

describe('TimeZonePicker', () => {
  describe('TimeZonePicker render', () => {
    const wrapper = shallow(
      <TimeZonePicker
        phrases={phrases}
      />
    );

    it('should render a header with a title', () => {
      expect(wrapper.find('.timezone_picker_header_title').text()).to.equal(phrases.timezonePickerTitle);
    });

    it('should render a label for the search field', () => {
      expect(wrapper.find('.timezone_picker_search').find('label').text()).to.equal(phrases.timezonePickerLabel);
    });

    it('should render a Typeahead', () => {
      expect(wrapper.find('OnClickOutside(Typeahead)')).to.have.lengthOf(1);
    });

    it('should render a close button', () => {
      expect(wrapper.find('Button').prop('text')).to.equal(phrases.close);
    });
  });

  describe('props', () => {
    describe('when focused is true', () => {
      const wrapper = shallow(
        <TimeZonePicker
          phrases={phrases}
          focused={true}
        />
      );

      it('should render the modal container as active', () => {
        expect(wrapper.find('.timezone_picker_modal_container').hasClass('active')).to.equal(true);
      });
    });

    describe('when focused is false', () => {
      const wrapper = shallow(
        <TimeZonePicker
          phrases={phrases}
          focused={false}
        />
      );

      it('should not render the modal container as active', () => {
        expect(wrapper.find('.timezone_picker_modal_container').hasClass('active')).to.equal(false);
      });
    });

    describe('onClearFocus func', () => {
      it('should callback when onClick header "back" icon', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <TimeZonePicker
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
          <TimeZonePicker
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
          <TimeZonePicker
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
          <TimeZonePicker
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
});
