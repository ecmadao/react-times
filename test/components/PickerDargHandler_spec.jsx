import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import PickerDragHandler from '../../src/components/Picker/PickerDragHandler';

describe('PickerDragHandler', () => {
  describe('PickerDragHandler Init', () => {
    const wrapper = shallow(<PickerDragHandler />);
    it('should render component correctly', () => {
      expect(wrapper.is('.picker_handler')).to.equal(true);
    });

    it('should render correct draging state', () => {
      expect(wrapper.state().draging).to.equal(false);
    });
  });
});
