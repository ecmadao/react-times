import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MaterialTheme from '../../src/components/MaterialTheme';
import TwelveHoursMode from '../../src/components/MaterialTheme/TwelveHoursMode';
import TwentyFourHoursMode from '../../src/components/MaterialTheme/TwentyFourHoursMode';

describe('MaterialTheme', () => {
  describe('MaterialTheme render', () => {
    it('should render 24HoursMode by default', () => {
      const wrapper = shallow(<MaterialTheme />);
      expect(wrapper.find(TwentyFourHoursMode)).to.have.lengthOf(1);
    });

    it('should render 12HoursMode', () => {
      const wrapper = shallow(<MaterialTheme timeMode={12} />);
      expect(wrapper.find(TwelveHoursMode)).to.have.lengthOf(1);
    });
  });

  describe('MaterialTheme props', () => {
    it('should send correct props', () => {
      const wrapper = shallow(<MaterialTheme hour="22" minute="23" />);
      expect(wrapper.find(TwentyFourHoursMode).props().hour).to.equal("22");
      expect(wrapper.find(TwentyFourHoursMode).props().minute).to.equal("23");
    });
  });
});
