import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Timezone from '../../src/components/Timezone';
import languageHelper from '../../src/utils/language';
import '../_helpers/adapter';

const phrases = languageHelper.get('en');
const mockTimezone = {
  zoneName: 'Some Zone',
  zoneAbbr: 'SZ'
};

describe('Timezone', () => {
  describe('Timezone render', () => {
    const wrapper = shallow(
      <Timezone
        phrases={phrases}
        timezone={mockTimezone}
      />
    );

    it('should render the Timezone footer', () => {
      expect(wrapper.find('.time_picker_modal_footer_timezone')).to.have.lengthOf(1);
    });

    it('should render the Timezone Name and Abbreviation', () => {
      expect(wrapper.find('.time_picker_modal_footer_timezone').text())
        .to.equal(`${mockTimezone.zoneName} ${mockTimezone.zoneAbbr}`);
    });
  });

  describe('props', () => {
    describe('when timezoneIsEditable is true', () => {
      it('should render the Time Picker modal footer clickable', () => {
        const wrapper = shallow(
          <Timezone
            phrases={phrases}
            timezoneIsEditable
          />
        );

        expect(wrapper.find('.time_picker_modal_footer').hasClass('clickable')).to.equal(true);
      });

      describe('when focused is true', () => {
        it('should render the TimezonePicker', () => {
          const wrapper = shallow(
            <Timezone
              phrases={phrases}
              timezoneIsEditable
            />
          );
          wrapper.setState({ focused: true });

          expect(wrapper.find('TimezonePicker')).to.have.lengthOf(1);
        });
      });

      describe('when focused is false', () => {
        it('should not render the TimezonePicker', () => {
          const wrapper = shallow(
            <Timezone
              phrases={phrases}
              timezoneIsEditable
            />
          );
          wrapper.setState({ focused: false });

          expect(wrapper.find('TimezonePicker')).to.have.lengthOf(0);
        });
      });
    });

    describe('when timezoneIsEditable is false', () => {
      it('should not render the Time Picker modal footer clickable', () => {
        const wrapper = shallow(
          <Timezone
            phrases={phrases}
            timezoneIsEditable={false}
          />
        );

        expect(wrapper.find('.time_picker_modal_footer').hasClass('clickable')).to.equal(false);
      });

      describe('when focused is true', () => {
        it('should not render the TimezonePicker', () => {
          const wrapper = shallow(
            <Timezone
              phrases={phrases}
              timezoneIsEditable={false}
            />
          );
          wrapper.setState({ focused: true });

          expect(wrapper.find('TimezonePicker')).to.have.lengthOf(0);
        });
      });

      describe('when focused is false', () => {
        it('should not render the TimezonePicker', () => {
          const wrapper = shallow(
            <Timezone
              phrases={phrases}
              timezoneIsEditable={false}
            />
          );
          wrapper.setState({ focused: false });

          expect(wrapper.find('TimezonePicker')).to.have.lengthOf(0);
        });
      });
    });
  });

  describe('onClearFocus Func', () => {
    it('should clear focused', () => {
      const wrapper = shallow(
        <Timezone
          phrases={phrases}
        />
      );
      wrapper.setState({ focused: true });

      wrapper.instance().onClearFocus();
      expect(wrapper.state().focused).to.equal(false);
    });
  });

  describe('handleFocusedChange Func', () => {
    const wrapper = shallow(
      <Timezone
        phrases={phrases}
        timezoneIsEditable
      />
    );

    it('should toggle focused', () => {
      wrapper.setState({ focused: true });

      wrapper.instance().handleFocusedChange();
      expect(wrapper.state().focused).to.equal(false);

      wrapper.instance().handleFocusedChange();
      expect(wrapper.state().focused).to.equal(true);
    });

    it('should toggle focused onClick of modal footer', () => {
      wrapper.setState({ focused: false });
      wrapper.find('.time_picker_modal_footer').simulate('click');
      expect(wrapper.state().focused).to.equal(true);
    });
  });

  describe('handleTimezoneChange Func', () => {
    it('should set the timezone', () => {
      const wrapper = shallow(
        <Timezone
          phrases={phrases}
          timezone={{}}
        />
      );

      wrapper.instance().handleTimezoneChange(mockTimezone);
      expect(wrapper.state().timezone).to.equal(mockTimezone);
    });
  });
});
