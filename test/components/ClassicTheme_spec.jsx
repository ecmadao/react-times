import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import '../_helpers/adapter';


import ClassicTheme from '../../src/components/ClassicTheme';

describe('ClassicTheme', () => {
  describe('ClassicTheme render', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<ClassicTheme />);
      expect(wrapper.is('.classic_theme_container')).to.equal(true);
    });
  });
});
