import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon-sandbox';

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

      it('should not render the TimeZonePicker', () => {
        expect(wrapper.find('TimeZonePicker')).to.have.lengthOf(0);
      });
    });
  });

  describe('TimeZone Func', () => {
    it('should clear focused onClearFocus', () => {
      const wrapper = shallow(
        <TimeZone
          phrases={phrases}
        />
      );
      wrapper.state().focused = true;

      wrapper.instance().onClearFocus();
      expect(wrapper.state().focused).to.equal(false);
    });

    it('should handleFocusedChange', () => {
      const wrapper = shallow(
        <TimeZone
          phrases={phrases}
        />
      );
      wrapper.state().focused = true;

      wrapper.instance().handleFocusedChange();
      expect(wrapper.state().focused).to.equal(false);

      wrapper.instance().handleFocusedChange();
      expect(wrapper.state().focused).to.equal(true);
    });
  });
});
