// import React from 'react';
// import {expect} from 'chai';
// import {shallow} from 'enzyme';
// import sinon from 'sinon-sandbox';
//
// import TimePickerModal from '../../src/components/TimePickerModal';
// import PickerDargHandler from '../../src/components/PickerDargHandler';
//
// describe('TimePickerModal', () => {
//   describe('TimePickerModal Init', () => {
//     it('should render component correctly', () => {
//       const wrapper = shallow(<TimePickerModal />);
//       expect(wrapper.is('.time_picker_modal_container')).to.equal(true);
//     });
//
//     it('should render component with correct state', () => {
//       const wrapper = shallow(<TimePickerModal />);
//       expect(wrapper.state().step).to.equal(0);
//     });
//
//     it('should render PickerDargHandler', () => {
//       const wrapper = shallow(<TimePickerModal />);
//       expect(wrapper.find(PickerDargHandler)).to.have.lengthOf(1);
//     });
//   });
//
//   describe('TimePickerModal Func', () => {
//     it('should change step correctly', () => {
//       const wrapper = shallow(<TimePickerModal />);
//       wrapper.instance().handleStepChange(1);
//       expect(wrapper.state().step).to.equal(1);
//     });
//
//     it('should callback correct func when change hour', () => {
//       const handleHourChangeStub = sinon.stub();
//       const handleMinuteChangeStub = sinon.stub();
//       const wrapper = shallow(
//         <TimePickerModal
//           handleHourChange={handleHourChangeStub}
//           handleMinuteChange={handleMinuteChangeStub}
//         />);
//       wrapper.instance().handleTimeChange(3);
//       expect(handleHourChangeStub.callCount).to.equal(1);
//     });
//
//     it('should callback correct func when change minute', () => {
//       const handleHourChangeStub = sinon.stub();
//       const handleMinuteChangeStub = sinon.stub();
//       const wrapper = shallow(
//         <TimePickerModal
//           handleHourChange={handleHourChangeStub}
//           handleMinuteChange={handleMinuteChangeStub}
//         />);
//       wrapper.instance().handleStepChange(1);
//       wrapper.instance().handleTimeChange(3);
//       expect(handleMinuteChangeStub.callCount).to.equal(1);
//     });
//   });
// });
