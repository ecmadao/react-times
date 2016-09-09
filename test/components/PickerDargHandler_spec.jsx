import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

// import {
//   MIN_ABSOLUTE_POSITION,
//   MAX_ABSOLUTE_POSITION,
//   POINTER_RADIUS,
//   PICKER_RADIUS
// } from '../../src/ConstValue';

import PickerDargHandler from '../../src/components/PickerDargHandler';

describe('PickerDargHandler', () => {
  describe('PickerDargHandler Init', () => {
    it('should render component correctly', () => {
      const wrapper = shallow(<PickerDargHandler />);
      expect(wrapper.is('.picker_handler')).to.equal(true);
    });

    // it('should render correct top state', () => {
    //   const wrapper = shallow(
    //     <PickerDargHandler
    //       step={0}
    //       time={1}
    //       minLength={MIN_ABSOLUTE_POSITION}
    //     />);
    //   expect(wrapper.state().top).to.equal(PICKER_RADIUS - MIN_ABSOLUTE_POSITION + POINTER_RADIUS);
    // });
    //
    // it('should render correct top state', () => {
    //   const wrapper = shallow(
    //     <PickerDargHandler
    //       step={0}
    //       time={13}
    //       minLength={MIN_ABSOLUTE_POSITION}
    //     />);
    //   expect(wrapper.state().top).to.equal(PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS);
    // });
    //
    // it('should render correct top state', () => {
    //   const wrapper = shallow(
    //     <PickerDargHandler
    //       step={1}
    //       time={1}
    //     />);
    //   expect(wrapper.state().top).to.equal(PICKER_RADIUS - MAX_ABSOLUTE_POSITION + POINTER_RADIUS);
    // });
    //
    // it('should render correct height state', () => {
    //   const wrapper = shallow(
    //     <PickerDargHandler
    //       step={0}
    //       time={1}
    //       minLength={MIN_ABSOLUTE_POSITION}
    //     />);
    //   expect(wrapper.state().height).to.equal(MIN_ABSOLUTE_POSITION - POINTER_RADIUS);
    // });
    //
    // it('should render correct height state', () => {
    //   const wrapper = shallow(<PickerDargHandler step={1} time={1} />);
    //   expect(wrapper.state().height).to.equal(MAX_ABSOLUTE_POSITION - POINTER_RADIUS);
    // });
  });
});
