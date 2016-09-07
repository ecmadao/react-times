import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
// import moment from 'moment';

import TimePicker from '../../src/components/TimePicker';
import TimePickerModal from '../../src/components/TimePickerModal';
import OutsideClickHandler from '../../src/components/OutsideClickHandler';
import PickerDargHandler from '../../src/components/PickerDargHandler';

describe('TimePicker', () => {
  describe('render basical picker', () => {
    it('should be wrappered by div.time_picker_container', () => {
      const wrapper = shallow(<TimePicker />);
      expect(wrapper.is('.time_picker_container')).to.equal(true);
    });

    it('renders an OutsideClickHandler', () => {
      const wrapper = shallow(<TimePicker />);
      expect(wrapper.find(OutsideClickHandler)).to.have.lengthOf(1);
    });

    it('renders an TimePickerModal', () => {
      const wrapper = shallow(<TimePicker />);
      expect(wrapper.find(TimePickerModal)).to.have.lengthOf(1);
    });

    it('renders an PickerDargHandler', () => {
      const wrapper = shallow(<TimePicker />);
      expect(wrapper.find(PickerDargHandler)).to.have.lengthOf(0);
    });
  });

  describe('render with props', () => {
    it('should be wrappered by div.time_picker_container.dark', () => {
      const wrapper = shallow(<TimePicker colorPalette="dark"/>);
      expect(wrapper.is('.time_picker_container.dark')).to.equal(true);
    });

    it('should rendered with focused', () => {
      const wrapper = shallow(<TimePicker focused={true} />);
      expect(wrapper.find('.time_picker_preview.active')).to.have.lengthOf(1);
    });

    it('should rendered withoutIcon', () => {
      const wrapper = shallow(<TimePicker withoutIcon={true} />);
      expect(wrapper.find('.preview_container.without_icon')).to.have.lengthOf(1);
    });
  });
});
