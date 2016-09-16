import moment from 'moment';
import {expect} from 'chai';
import {
  initialTime,
  getValidateTime,
  getValidateIntTime,
  getStandardAbsolutePosition
} from '../src/utils';
import {
  MAX_ABSOLUTE_POSITION,
  MIN_ABSOLUTE_POSITION
} from '../src/ConstValue';

describe('Utils Test', () => {
  describe('Test initialTime func with 24h mode', () => {
    it('should get current time', () => {
      let times = moment().format("HH:mm").split(':');
      expect([...times, null]).to.deep.equal(initialTime(false));
    });

    it('should get default time', () => {
      let times = ["11", "12", null];
      expect(times).to.deep.equal(initialTime("11:12"));
    });

    it('should get validate default time', () => {
      let times = ["01", "02", null];
      expect(times).to.deep.equal(initialTime("1:2"));
    });

    it('should get validate default time', () => {
      let times = ["01", "00", null];
      expect(times).to.deep.equal(initialTime("1:"));
    });

    it('should get validate default time', () => {
      let times = ["00", "01", null];
      expect(times).to.deep.equal(initialTime("abc:1"));
    });
  });

  describe('Test initialTime func with 12h mode', () => {
    it('should get default time', () => {
      let times = ["11", "12", "AM"];
      expect(times).to.deep.equal(initialTime("11:12", 12));
    });

    it('should get default time', () => {
      let times = ["01", "12", "PM"];
      expect(times).to.deep.equal(initialTime("13:12", 12));
    });

    it('should get validate default time', () => {
      let times = ["01", "02", "AM"];
      expect(times).to.deep.equal(initialTime("1:2", 12));
    });

    it('should get validate default time', () => {
      let times = ["01", "00", "AM"];
      expect(times).to.deep.equal(initialTime("1:", 12));
    });

    it('should get validate default time', () => {
      let times = ["00", "01", "AM"];
      expect(times).to.deep.equal(initialTime("abc:1", 12));
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

  describe('Test getValidateIntTime func', () => {
    it('should return 0', () => {
      expect(getValidateIntTime('a')).to.equal(0);
    });

    it('should return int', () => {
      expect(getValidateIntTime('11')).to.equal(11);
    });

    it('should return 0', () => {
      expect(getValidateIntTime(null)).to.equal(0);
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
