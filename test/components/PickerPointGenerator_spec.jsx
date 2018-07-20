import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PickerPoint from '../../src/components/Picker/PickerPoint';
import pickerPointGenerator from '../../src/components/Picker/PickerPointGenerator';
import '../_helpers/adapter';

describe('PickerPointGenerator', () => {
  describe('Render 24 hours', () => {
    const PickerPointGenerator = pickerPointGenerator('hour');
    const wrapper = shallow(<PickerPointGenerator handleTimePointerClick={Function.prototype}/>);
    it('should render with currect wrapper', () => {
      expect(wrapper.is('.picker_pointer_container')).to.equal(true);
    });

    it('should render with 24 PickerPoint', () => {
      expect(wrapper.find(PickerPoint)).to.have.lengthOf(24);
    });
  });

  describe('Render 12 hours', () => {
    const PickerPointGenerator = pickerPointGenerator('hour', 12);
    const wrapper = shallow(<PickerPointGenerator handleTimePointerClick={Function.prototype}/>);
    it('should render with currect wrapper', () => {
      expect(wrapper.is('.picker_pointer_container')).to.equal(true);
    });

    it('should render with 12 PickerPoint', () => {
      expect(wrapper.find(PickerPoint)).to.have.lengthOf(12);
    });
  });

  describe('Render minutes', () => {
    const PickerPointGenerator = pickerPointGenerator('minute');
    const wrapper = shallow(<PickerPointGenerator handleTimePointerClick={Function.prototype}/>);
    it('should render with 12 PickerPoint', () => {
      expect(wrapper.find(PickerPoint)).to.have.lengthOf(12);
    });
  });
});
