import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PickerPoint from '../../src/components/Picker/PickerPoint';
import '../_helpers/adapter';

describe('PickerPoint', () => {
  const wrapper = shallow(
    <PickerPoint
      index={12}
      angle={360}
    />
  );

  it('should render with currect wrapper', () => {
    expect(wrapper.is('.picker_point.point_outter')).to.equal(true);
  });
});
