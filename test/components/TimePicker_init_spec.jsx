import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import moment from 'moment';

import TimePicker from '../../src/components/TimePicker';
import TimePickerModal from '../../src/components/TimePickerModal';
import OutsideClickHandler from '../../src/components/OutsideClickHandler';
import PickerDargHandler from '../../src/components/PickerDargHandler';

describe('TimePicker initial', () => {
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

    it('should rendered with focused on child', () => {
      const wrapper = shallow(<TimePicker focused={true} />);
      expect(wrapper.find(TimePickerModal).props().focused).to.equal(true);
    });

    it('should rendered without icon', () => {
      const wrapper = shallow(<TimePicker withoutIcon={true} />);
      expect(wrapper.find('.preview_container.without_icon')).to.have.lengthOf(1);
    });

    it('should rendered with default time', () => {
      const wrapper = shallow(<TimePicker defaultTime="22:23" />);
      expect(wrapper.find(TimePickerModal).props().hour).to.equal("22");
      expect(wrapper.find(TimePickerModal).props().minute).to.equal("23");
    });

    it('should rendered with current time', () => {
      const wrapper = shallow(<TimePicker />);
      let [hour, minute] = moment().format("HH:mm").split(':');
      expect(wrapper.find(TimePickerModal).props().hour).to.equal(hour);
      expect(wrapper.find(TimePickerModal).props().minute).to.equal(minute);
    });
  });
});
