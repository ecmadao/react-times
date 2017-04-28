import moment from 'moment';
import { expect } from 'chai';
import timeHelper from '../src/utils/time';
import drag from '../src/utils/drag';
import {
  MAX_ABSOLUTE_POSITION,
  MIN_ABSOLUTE_POSITION
} from '../src/utils/const_value';
import { isSeq, head, tail, last } from '../src/utils/func';

describe('Functional utils', () => {
  describe('isSeq', () => {
    it('should correctly detect a sequence', () => {
      const isSequence = [isSeq('foo'), isSeq('foo'.split())].every((e) => e === true);
      const isNotSequence = [isSeq({ message: 'foo' }), isSeq(8), isSeq(true)].every((e) => e === false);
      expect(isSequence).to.equal(true);
      expect(isNotSequence).to.equal(true);
    });
  });

  describe('head', () => {
    it('should return the first element of a sequence', () => {
      expect(head('foo')).to.equal('f');
      expect(head('foo'.split(''))).to.equal('f');
    });
  });

  describe('tail', () => {
    it('should return the last elements of a sequence', () => {
      expect(tail('foo')).to.equal('oo');
      expect(tail('foo'.split(''))).to.deep.equal(['o', 'o']);
    });
  });

  describe('last', () => {
    it('should return the last element of a sequence', () => {
      expect(last('foo')).to.equal('o');
      expect(last('foo'.split(''))).to.equal('o');
    });
  });
});

// Note: data passed in is weighted: mode > meridiem > time
describe('Time utils', () => {
  describe('getValidTimeData', () => {
    it('should return valid data when given no time, meridiem, or mode', () => {
      const timeData = timeHelper.time();
      const currentTime = moment().format('HH:mmA').split(/:/);

      const newData = {
        hour12: '',
        hour24: '',
        minute: '',
        meridiem: '',
        mode: '',
        timezone: {
          city: '',
          zoneAbbr: '',
          zoneName: ''
        }
      };

      const currentTimeData = [
        currentTime[0],
        currentTime[currentTime.length - 1].slice(0, 2),
        currentTime[currentTime.length - 1].slice(2)
      ];

      expect(timeData).to.deep.equal(currentTimeData);
    });

    it('should return valid data when given only a mode');
    it('should return valid data when given only a meridiem');
    it('should return valid data when given only a time');
    it('should return valid data when given a time and a mode');
    it('should return valid data when given a time and a mode');
    it('should return valid data when given a time, a mode, and a meridiem');
  });
});

/* eslint-disable */
// describe('Utils Test', () => {
//   describe('Test initialTime func with 24h mode', () => {
//     it('should get current time', () => {
//       let times = moment().format("HH:mm").split(':');
//       expect([...times, undefined]).to.deep.equal(timeHelper.initial(false));
//     });
//
//     it('should get default time', () => {
//       let times = ["11", "12", undefined];
//       expect(times).to.deep.equal(timeHelper.initial("11:12"));
//     });
//
//     it('should get validate default time', () => {
//       let times = ["01", "02", undefined];
//       expect(times).to.deep.equal(timeHelper.initial("1:2"));
//     });
//
//     it('should get validate default time', () => {
//       let times = ["01", "00", undefined];
//       expect(times).to.deep.equal(timeHelper.initial("1:"));
//     });
//
//     it('should get validate default time', () => {
//       let times = ["00", "01", undefined];
//       expect(times).to.deep.equal(timeHelper.initial("abc:1"));
//     });
//   });
//
//   describe('Test initialTime func with 12h mode', () => {
//     it('should get default time in 12h mode', () => {
//       let times = ["11", "12", "AM"];
//       expect(times).to.deep.equal(timeHelper.initial("11:12", 12));
//     });
//
//     it('should get default time in 24h mode', () => {
//       let times = ["01", "12", "PM"];
//       expect(times).to.deep.equal(timeHelper.initial("13:12", 12));
//     });
//
//     it('should get validate default time', () => {
//       let times = ["01", "02", "AM"];
//       expect(times).to.deep.equal(timeHelper.initial("1:2", 12));
//     });
//
//     it('should get validate default time', () => {
//       let times = ["01", "00", "AM"];
//       expect(times).to.deep.equal(timeHelper.initial("1:", 12));
//     });
//
//     it('should get validate default time', () => {
//       let times = ["12", "01", "AM"];
//       expect(times).to.deep.equal(timeHelper.initial("abc:1", 12));
//     });
//   });
//
//   describe('Test getValidateTime func', () => {
//     it('should return 00 when get undefined', () => {
//       expect(timeHelper.validate()).to.equal('00');
//     });
//
//     it('should return 00 when get NaN', () => {
//       expect(timeHelper.validate('abc')).to.equal('00');
//     });
//
//     it('should return itself when validate', () => {
//       expect(timeHelper.validate('12')).to.equal('12');
//     });
//
//     it('should return a string with 0', () => {
//       expect(timeHelper.validate('2')).to.equal('02');
//     });
//   });
//
//   describe('Test getValidateIntTime func', () => {
//     it('should return 0', () => {
//       expect(timeHelper.validateInt('a')).to.equal(0);
//     });
//
//     it('should return int', () => {
//       expect(timeHelper.validateInt('11')).to.equal(11);
//     });
//
//     it('should return 0', () => {
//       expect(timeHelper.validateInt(null)).to.equal(0);
//     });
//   });
//
//   describe('Test getStandardAbsolutePosition func', () => {
//     it('should return the MinPosition', () => {
//       expect(drag.validatePosition(MIN_ABSOLUTE_POSITION - 1, MIN_ABSOLUTE_POSITION, MAX_ABSOLUTE_POSITION)).to.equal(MIN_ABSOLUTE_POSITION);
//     });
//
//     it('should return the MaxPosition', () => {
//       expect(drag.validatePosition(MAX_ABSOLUTE_POSITION + 1, MAX_ABSOLUTE_POSITION, MAX_ABSOLUTE_POSITION)).to.equal(MAX_ABSOLUTE_POSITION);
//     });
//   });
// });
