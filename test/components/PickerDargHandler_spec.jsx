import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import {
  HOURS,
  MINUTES,
  MIN_ABSOLUTE_POSITION,
  MAX_ABSOLUTE_POSITION,
  POINTER_RADIUS,
  PICKER_RADIUS
} from '../../src/ConstValue';
import {
  degree2Radian
} from '../../src/utils';

import PickerDargHandler from '../../src/components/PickerDargHandler';
import PickerPoint from '../../src/components/PickerPoint';

describe('PickerDargHandler', () => {
  describe('PickerDargHandler Init', () => {
    it('should render component correctly', () => {
      const wrapper = shallow(<PickerDargHandler />);
      expect(wrapper.is('.picker_container')).to.equal(true);
    });

    it('should render component with hours correctly', () => {
      const wrapper = shallow(<PickerDargHandler datas={HOURS} />);
      expect(wrapper.find(PickerPoint)).to.have.length(24);
    });

    it('should render component with minutes correctly', () => {
      const wrapper = shallow(<PickerDargHandler datas={MINUTES} />);
      expect(wrapper.find(PickerPoint)).to.have.length(60);
    });

    it('should render correct pointerRotate state', () => {
      const wrapper = shallow(<PickerDargHandler datas={HOURS} data={1} splitNum={12} />);
      expect(wrapper.state().pointerRotate).to.equal(30);
    });

    it('should render correct pointerRotate state', () => {
      const wrapper = shallow(<PickerDargHandler datas={MINUTES} data={1} />);
      expect(wrapper.state().pointerRotate).to.equal(6);
    });

    it('should render correct radian state', () => {
      const wrapper = shallow(<PickerDargHandler datas={HOURS} data={1} splitNum={12} />);
      expect(wrapper.state().radian).to.equal(degree2Radian(30));
    });

    it('should render correct radian state', () => {
      const wrapper = shallow(<PickerDargHandler datas={MINUTES} data={1} />);
      expect(wrapper.state().radian).to.equal(degree2Radian(6));
    });

    it('should render correct top state', () => {
      const wrapper = shallow(
        <PickerDargHandler
          datas={HOURS}
          data={1}
          splitNum={12}
          minLength={MIN_ABSOLUTE_POSITION}
        />);
      expect(wrapper.state().top).to.equal(PICKER_RADIUS - MIN_ABSOLUTE_POSITION + POINTER_RADIUS);
    });

    it('should render correct top state', () => {
      const wrapper = shallow(
        <PickerDargHandler
          datas={HOURS}
          data={13}
          splitNum={12}
          minLength={MIN_ABSOLUTE_POSITION}
        />);
      expect(wrapper.state().top).to.equal(PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS);
    });

    it('should render correct top state', () => {
      const wrapper = shallow(<PickerDargHandler datas={MINUTES} data={1} />);
      expect(wrapper.state().top).to.equal(PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS);
    });

    it('should render correct height state', () => {
      const wrapper = shallow(
        <PickerDargHandler
          datas={HOURS}
          data={1}
          splitNum={12}
          minLength={MIN_ABSOLUTE_POSITION}
        />);
      expect(wrapper.state().height).to.equal(MIN_ABSOLUTE_POSITION - POINTER_RADIUS);
    });

    it('should render correct height state', () => {
      const wrapper = shallow(<PickerDargHandler datas={MINUTES} data={1} />);
      expect(wrapper.state().height).to.equal(MAX_ABSOLUTE_POSITION - POINTER_RADIUS);
    });
  });
});
