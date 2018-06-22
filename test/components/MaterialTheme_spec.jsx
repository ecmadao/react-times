import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import MaterialTheme from '../../src/components/MaterialTheme';
import languageHelper from '../../src/utils/language';
import '../_helpers/adapter';

const phrases = languageHelper.get('en');

describe('MaterialTheme', () => {
  describe('MaterialTheme Timezone render', () => {
    it('should render the Timezone footer', () => {
      const mockTimezone = {
        zoneName: 'Some Zone',
        zoneAbbr: 'SZ'
      };
      const wrapper = shallow(
        <MaterialTheme
          showTimezone
          phrases={phrases}
          timezone={mockTimezone}
        />
      );
      expect(wrapper.find('Timezone')).to.have.lengthOf(1);
    });

    it('should not render the Timezone footer', () => {
      const wrapper = shallow(<MaterialTheme />);
      expect(wrapper.find('Timezone')).to.have.lengthOf(0);
    });
  });

  describe('MaterialTheme render correctly', () => {
    it('should render with className', () => {
      const wrapper = shallow(<MaterialTheme />);
      expect(wrapper.is('.modal_container')).to.equal(true);
      expect(wrapper.is('.time_picker_modal_container')).to.equal(true);
    });
  });
});
