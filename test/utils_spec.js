import moment from 'moment-timezone';
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
      const isSequence = [isSeq('foo'), isSeq('foo'.split())].every(e => e === true);
      const isNotSequence = [isSeq({ message: 'foo' }), isSeq(8), isSeq(true)].every(e => e === false);
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

// because mocha doesn't play nice with arrow functions 😞
const tz = timeHelper.guessUserTz();
const time24 = moment().tz(tz.zoneName).format('HH:mmA').split(/:/);
const time12 = moment().tz(tz.zoneName).format('hh:mmA').split(/:/);

const modes = [24, 12];
const meridies = ['AM', 'PM']; // yes, this is the correct plural 😜

describe('Time utils', () => {
  describe('getCurrentTime()', () => {
    it('should return the current time as a string in 24h format', () => {
      const timeString = timeHelper.current();
      expect(timeString).to.equal(time24.join(':').slice(0, 5));
    });
  });

  describe('given a call to getValidTimeData()', () => {
    describe('when passed no arguments', () => {
      it('then it should default to the current local time in 24h mode', () => {
        const testTimeData = timeHelper.time();

        const timeData = {
          hour12: head(time12).replace(/^0/, ''),
          hour24: head(time24),
          minute: last(time24).slice(0, 2),
          meridiem: last(time12).slice(2),
          mode: 24,
          timezone: tz.zoneName
        };

        expect(testTimeData).to.deep.equal(timeData);
      });
    });

    describe('when passed only a mode', () => {
      it('then it should default to the current local time, with user-specified mode', () => {
        modes.forEach((mode) => {
          const testTimeData = timeHelper.time({
            timeMode: mode
          });
          const timeData = {
            mode,
            hour12: head(time12).replace(/^0/, ''),
            hour24: head(time24),
            minute: last(time24).slice(0, 2),
            meridiem: last(time12).slice(2),
            timezone: tz.zoneName
          };

          expect(testTimeData).to.deep.equal(timeData);
        });
      });
    });

    describe('when we passed only a meridiem', () => {
      it('then it should default to the current local time, in 12h mode, ignoring meridiem', () => {
        meridies.forEach((meridiem) => {
          const testTimeData = timeHelper.time({ meridiem });
          const timeData = {
            hour12: head(time12).replace(/^0/, ''),
            hour24: head(time24),
            minute: last(time24).slice(0, 2),
            meridiem: last(time12).slice(2),
            mode: 12,
            timezone: tz.zoneName
          };

          expect(testTimeData).to.deep.equal(timeData);
        });
      });
    });
  });

  describe('Test getValidateTime func', () => {
    it('should return 00 when get undefined', () => {
      expect(timeHelper.validate()).to.equal('00');
    });

    it('should return 00 when get NaN', () => {
      expect(timeHelper.validate('abc')).to.equal('00');
    });

    it('should return itself when validate', () => {
      expect(timeHelper.validate('12')).to.equal('12');
    });

    it('should return a string with 0', () => {
      expect(timeHelper.validate('2')).to.equal('02');
    });
  });

  describe('Test getValidateIntTime func', () => {
    it('should return 0', () => {
      expect(timeHelper.validateInt('a')).to.equal(0);
    });

    it('should return int', () => {
      expect(timeHelper.validateInt('11')).to.equal(11);
    });

    it('should return 0', () => {
      expect(timeHelper.validateInt(null)).to.equal(0);
    });
  });

  describe('Test getStandardAbsolutePosition func', () => {
    it('should return the MinPosition', () => {
      expect(
        drag.validatePosition(
          MIN_ABSOLUTE_POSITION - 1, MIN_ABSOLUTE_POSITION, MAX_ABSOLUTE_POSITION
        )
      ).to.equal(MIN_ABSOLUTE_POSITION);
    });

    it('should return the MaxPosition', () => {
      expect(
        drag.validatePosition(
          MAX_ABSOLUTE_POSITION + 1, MAX_ABSOLUTE_POSITION, MAX_ABSOLUTE_POSITION
        )
      ).to.equal(MAX_ABSOLUTE_POSITION);
    });
  });
});
