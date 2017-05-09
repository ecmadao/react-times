import ClassicTheme from '../../src/components/ClassicTheme';
import MaterialTheme from '../../src/components/MaterialTheme';
import OutsideClickHandler from '../../src/components/OutsideClickHandler';
import PickerDragHandler from '../../src/components/Picker/PickerDragHandler';
import React from 'react';
import TimePicker from '../../src/components/TimePicker';
import {expect} from 'chai';
import moment from 'moment';
import {shallow} from 'enzyme';
import timeHelper from '../../src/utils/time';

describe('TimePicker initial', () => {
  describe('render basic picker', () => {
    it('should be wrappered by div.time_picker_container', () => {
      const wrapper = shallow(<TimePicker />);
      expect(wrapper.is('.time_picker_container')).to.equal(true);
    });

    it('renders an OutsideClickHandler', () => {
      const wrapper = shallow(<TimePicker />);
      expect(wrapper.find(OutsideClickHandler)).to.have.lengthOf(1);
    });

    it('renders an MaterialTheme', () => {
      const wrapper = shallow(<TimePicker />);
      expect(wrapper.find(MaterialTheme)).to.have.lengthOf(1);
    });

    it('renders an ClassicTheme', () => {
      const wrapper = shallow(<TimePicker theme="classic" />);
      expect(wrapper.find(ClassicTheme)).to.have.lengthOf(1);
    });

    it('renders an PickerDragHandler', () => {
      const wrapper = shallow(<TimePicker />);
      expect(wrapper.find(PickerDragHandler)).to.have.lengthOf(0);
    });
  });

  describe('render with props', () => {
    it('should be wrapped by div.time_picker_container.dark', () => {
      const wrapper = shallow(<TimePicker colorPalette="dark"/>);
      expect(wrapper.is('.time_picker_container.dark')).to.equal(true);
    });

    it('should render with focused', () => {
      const wrapper = shallow(<TimePicker focused={true} />);
      expect(wrapper.find('.time_picker_preview.active')).to.have.lengthOf(1);
    });

    it('should render with focused on child', () => {
      const wrapper = shallow(<TimePicker focused={true} />);
      expect(wrapper.find(OutsideClickHandler).props().focused).to.equal(true);
    });

    it('should render without icon', () => {
      const wrapper = shallow(<TimePicker withoutIcon={true} />);
      expect(wrapper.find('.preview_container.without_icon')).to.have.lengthOf(1);
    });

    it('should render with default time in child props', () => {
      const wrapper = shallow(<TimePicker time="22:23" />);
      const time = timeHelper.time('22:23');
      expect(wrapper.find(MaterialTheme).props().hour).to.equal(time.hour24);
      expect(wrapper.find(MaterialTheme).props().minute).to.equal(time.minute);
    });

    it('should render with default time in DOM', () => {
      const wrapper = shallow(<TimePicker time="22:23" withoutIcon={true} />);
      const time = timeHelper.time('22:23');
      expect(wrapper.find('.preview_container').text()).to.equal(`${time.hour24} : ${time.minute}`);
    });

    it('should render with current time in child props', () => {
      const wrapper = shallow(<TimePicker />);
      const time = timeHelper.time();
      expect(wrapper.find(MaterialTheme).props().hour).to.equal(time.hour24);
      expect(wrapper.find(MaterialTheme).props().minute).to.equal(time.minute);
    });

    it('should render with current time in DOM', () => {
      const wrapper = shallow(<TimePicker withoutIcon={true} />);
      const time = timeHelper.time();
      expect(wrapper.find('.preview_container').text()).to.equal(`${time.hour24} : ${time.minute}`);
    });
  });
});
