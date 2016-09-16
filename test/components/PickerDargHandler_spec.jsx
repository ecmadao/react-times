import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import PickerDargHandler from '../../src/components/PickerDargHandler';

describe('PickerDargHandler', () => {
  describe('PickerDargHandler Init', () => {
    const wrapper = shallow(<PickerDargHandler />);
    it('should render component correctly', () => {
      expect(wrapper.is('.picker_handler')).to.equal(true);
    });

    it('should render correct draging state', () => {
      expect(wrapper.state().draging).to.equal(false);
    });
  });
});
