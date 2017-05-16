import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import TimeZone from '../../src/components/TimeZone';
import languageHelper from '../../src/utils/language';

const phrases = languageHelper.get('en');
const mockTimezone = {
  zoneName: 'Some Zone',
  zoneAbbr: 'SZ'
};

describe('TimeZone', () => {
  describe('TimeZone render', () => {
    const wrapper = shallow(
      <TimeZone
        phrases={phrases}
        timezone={mockTimezone}
      />
    );

    it('should render the TimeZone footer', () => {
      expect(wrapper.find('.time_picker_modal_footer_timezone')).to.have.lengthOf(1);
    });

    it('should render the TimeZone Name and Abbreviation', () => {
      expect(wrapper.find('.time_picker_modal_footer_timezone').text())
        .to.equal(`${mockTimezone.zoneName} ${mockTimezone.zoneAbbr}`);
    });
  });

  describe('TimeZone props', () => {
    describe('when timezoneIsEditable is true', () => {
      const wrapper = shallow(
        <TimeZone
          phrases={phrases}
          timezoneIsEditable={true}
        />
      );

      it('should render the Time Picker modal footer clickable', () => {
        expect(wrapper.find('.time_picker_modal_footer').hasClass('clickable')).to.equal(true);
      });

      it('should render the TimeZonePicker', () => {
        expect(wrapper.find('TimeZonePicker')).to.have.lengthOf(1);
      });
    });

    describe('when timezoneIsEditable is false', () => {
      const wrapper = shallow(
        <TimeZone
          phrases={phrases}
          timezoneIsEditable={false}
        />
      );

      it('should not render the Time Picker modal footer clickable', () => {
        expect(wrapper.find('.time_picker_modal_footer').hasClass('clickable')).to.equal(false);
      });

      it('should not render the TimeZonePicker', () => {
        expect(wrapper.find('TimeZonePicker')).to.have.lengthOf(0);
      });
    });
  });

  describe('onClearFocus Func', () => {
    it('should clear focused', () => {
      const wrapper = shallow(
        <TimeZone
          phrases={phrases}
        />
      );
      wrapper.state().focused = true;

      wrapper.instance().onClearFocus();
      expect(wrapper.state().focused).to.equal(false);
    });
  });

  describe('handleFocusedChange Func', () => {
    const wrapper = shallow(
      <TimeZone
        phrases={phrases}
        timezoneIsEditable={true}
      />
    );

    it('should toggle focused', () => {
      wrapper.state().focused = true;

      wrapper.instance().handleFocusedChange();
      expect(wrapper.state().focused).to.equal(false);

      wrapper.instance().handleFocusedChange();
      expect(wrapper.state().focused).to.equal(true);
    });

    it('should toggle focused onClick of modal footer', () => {
      wrapper.state().focused = false;
      wrapper.find('.time_picker_modal_footer').simulate('click');
      expect(wrapper.state().focused).to.equal(true);
    });
  });

  describe('handleTimezoneChange Func', () => {
    it('should set the timezone', () => {
      const wrapper = shallow(
        <TimeZone
          phrases={phrases}
          timezone={{}}
        />
      );

      wrapper.instance().handleTimezoneChange(mockTimezone);
      expect(wrapper.state().timezone).to.equal(mockTimezone);
    });
  });
});
