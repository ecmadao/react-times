import moment from 'moment';
import {expect} from 'chai';
import {
  initialTime,
  getValidateTime,
  getStandardAbsolutePosition
} from '../src/utils';
import {
  MAX_ABSOLUTE_POSITION,
  MIN_ABSOLUTE_POSITION
} from '../src/ConstValue';

describe('Utils Test', () => {
  describe('Test initialTime func', () => {
    it('should get current time', () => {
      let times = moment().format("HH:mm").split(':');
      expect(times).to.deep.equal(initialTime(false));
    });

    it('should get default time', () => {
      let times = ["11", "12"];
      expect(times).to.deep.equal(initialTime("11:12"));
    });

    it('should get validate default time', () => {
      let times = ["01", "02"];
      expect(times).to.deep.equal(initialTime("1:2"));
    });

    it('should get validate default time', () => {
      let times = ["01", "00"];
      expect(times).to.deep.equal(initialTime("1:"));
    });

    it('should get validate default time', () => {
      let times = ["00", "01"];
      expect(times).to.deep.equal(initialTime("abc:1"));
    });
  });

  describe('Test getValidateTime func', () => {
    it('should return 00 when get undefined', () => {
      expect(getValidateTime()).to.equal('00');
    });

    it('should return 00 when get NaN', () => {
      expect(getValidateTime('abc')).to.equal('00');
    });

    it('should return itself when validate', () => {
      expect(getValidateTime('12')).to.equal('12');
    });

    it('should return a string with 0', () => {
      expect(getValidateTime('2')).to.equal('02');
    });
  });

  describe('Test getStandardAbsolutePosition func', () => {
    it('should return the MinPosition', () => {
      expect(getStandardAbsolutePosition(MIN_ABSOLUTE_POSITION - 1, MIN_ABSOLUTE_POSITION, MAX_ABSOLUTE_POSITION)).to.equal(MIN_ABSOLUTE_POSITION);
    });

    it('should return the MaxPosition', () => {
      expect(getStandardAbsolutePosition(MAX_ABSOLUTE_POSITION + 1, MAX_ABSOLUTE_POSITION, MAX_ABSOLUTE_POSITION)).to.equal(MAX_ABSOLUTE_POSITION);
    });
  });
});
