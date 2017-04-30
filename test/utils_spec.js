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

// because mocha doesn't play nice with arrow functions 😞
const tz = timeHelper.guessUserTz();
const time24 = moment().format('HH:mmA').split(/:/);
const time12 = moment().format('hh:mmA').split(/:/);

const modes = [24, 12];
const meridies = ['AM', 'PM']; // yes, this is the correct plural 😜
const times = ['1:00', '01:00', '13:00'];

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
          hour12: head(time12).replace(/^0/i, ''),
          hour24: head(time24),
          minute: last(time24).slice(0, 2),
          meridiem: last(time12).slice(2),
          mode: 24,
          timezone: {
            city: tz.city,
            zoneAbbr: tz.zoneAbbr,
            zoneName: tz.zoneName
          }
        };

        expect(testTimeData).to.deep.equal(timeData);
      });
    });

    describe('when passed only a mode', () => {
      it('then it should default to the current local time, with user-specified mode', () => {
        modes.forEach((mode) => {
          const testTimeData = timeHelper.time(undefined, undefined, mode);
          const timeData = {
            hour12: head(time12).replace(/^0/i, ''),
            hour24: head(time24),
            minute: last(time24).slice(0, 2),
            meridiem: last(time12).slice(2),
            mode: mode,
            timezone: {
              city: tz.city,
              zoneAbbr: tz.zoneAbbr,
              zoneName: tz.zoneName
            }
          };

          expect(testTimeData).to.deep.equal(timeData);
        });
      });
    });

    describe('when we passed only a meridiem', () => {
      it('then it should default to the current local time, in 12h mode, ignoring meridiem', () => {
        meridies.forEach((meridiem) => {
          const testTimeData = timeHelper.time(undefined, meridiem);
          const timeData = {
            hour12: head(time12).replace(/^0/i, ''),
            hour24: head(time24),
            minute: last(time24).slice(0, 2),
            meridiem: last(time12).slice(2),
            mode: 12,
            timezone: {
              city: tz.city,
              zoneAbbr: tz.zoneAbbr,
              zoneName: tz.zoneName
            }
          };

          expect(testTimeData).to.deep.equal(timeData);
        });
      });
    });

    describe('when passed only a time', () => {
      it('then it should use the specified time, default to 24h format, infer the meridiem, and default to AM', () => {
        times.forEach((time) => {
          const testTimeData = timeHelper.time(time);
          expect(testTimeData.mode).to.equal(24);
          expect(testTimeData.hour12).to.equal('1');

          if (time === '1:00' || time === '01:00') {
            expect(testTimeData.meridiem).to.equal('AM');
            expect(testTimeData.hour24).to.equal('01');
          } else {
            expect(testTimeData.meridiem).to.equal('PM');
            expect(testTimeData.hour24).to.equal('13');
          }
        });
      });
    });

    describe('when passed a mode and meridiem', () => {
      it('then it should default to the current local time and meridiem, with user-specified mode', () => {
        modes.forEach((mode) => {
          meridies.forEach((meridiem) => {
            const testTimeData = timeHelper.time(undefined, meridiem, mode);
            expect(testTimeData.hour24).to.equal(head(time24));
            expect(testTimeData.hour12).to.equal(head(time12).replace(/^0/i, ''));
            expect(testTimeData.meridiem).to.equal(last(time24).slice(2));
            expect(testTimeData.mode).to.equal(mode);
          });
        });
      });
    });

    describe('when passed a mode and a time', () => {
      it('then it should use the specified mode and time, infer meridiem, and default to AM', () => {
        times.forEach((time) => {
          modes.forEach((mode) => {
            const testTimeData = timeHelper.time(time, undefined, mode);
            expect(testTimeData.hour12).to.equal('1');
            expect(testTimeData.mode).to.equal(mode);

            if (time === '1:00' || time === '01:00') {
              expect(testTimeData.meridiem).to.equal('AM');
              expect(testTimeData.hour24).to.equal('01');
            } else {
              expect(testTimeData.meridiem).to.equal('PM');
              expect(testTimeData.hour24).to.equal('13');
            }
          });
        });
      });
    });

    describe('when passed a meridiem and a time', () => {
      it('then it should use the specified time and meridiem (unless given a PM time), and use 12h mode', () => {
        times.forEach((time) => {
          meridies.forEach((meridiem) => {
            const testTimeData = timeHelper.time(time, meridiem);
            expect(testTimeData.mode).to.equal(12);
            expect(testTimeData.hour12).to.equal('1');

            if (time === '1:00' || time === '01:00') {
              expect(testTimeData.meridiem).to.equal(meridiem);
            } else {
              expect(testTimeData.meridiem).to.equal('PM');
            }
          });
        });
      });
    });

    describe('when passed a mode, meridiem, and time', () => {
      it('then it should use the specified values, prioritizing inference rules such that time > mode > meridiem', () => {
        times.forEach((time) => {
          meridies.forEach((meridiem) => {
            modes.forEach((mode) => {
              const testTimeData = timeHelper.time(time, meridiem, mode);
              expect(testTimeData.hour12).to.equal('1');
              expect(testTimeData.mode).to.equal(mode);

              if (time === '1:00' || time === '01:00') {
                expect(testTimeData.meridiem).to.equal(meridiem);
              } else {
                expect(testTimeData.meridiem).to.equal('PM');
              }
            });
          });
        });
      });
    });
  });
});

describe('Utils Test', () => {
  describe('Test initialTime func with 24h mode', () => {
    it('should get current time', () => {
      let times = moment().format("HH:mm").split(':');
      expect([...times, undefined]).to.deep.equal(timeHelper.initial(false));
    });

    it('should get default time', () => {
      let times = ["11", "12", undefined];
      expect(times).to.deep.equal(timeHelper.initial("11:12"));
    });

    it('should get validate default time', () => {
      let times = ["01", "02", undefined];
      expect(times).to.deep.equal(timeHelper.initial("1:2"));
    });

    it('should get validate default time', () => {
      let times = ["01", "00", undefined];
      expect(times).to.deep.equal(timeHelper.initial("1:"));
    });

    it('should get validate default time', () => {
      let times = ["00", "01", undefined];
      expect(times).to.deep.equal(timeHelper.initial("abc:1"));
    });
  });

  describe('Test initialTime func with 12h mode', () => {
    it('should get default time in 12h mode', () => {
      let times = ["11", "12", "AM"];
      expect(times).to.deep.equal(timeHelper.initial("11:12", 12));
    });

    it('should get default time in 24h mode', () => {
      let times = ["01", "12", "PM"];
      expect(times).to.deep.equal(timeHelper.initial("13:12", 12));
    });

    it('should get validate default time', () => {
      let times = ["01", "02", "AM"];
      expect(times).to.deep.equal(timeHelper.initial("1:2", 12));
    });

    it('should get validate default time', () => {
      let times = ["01", "00", "AM"];
      expect(times).to.deep.equal(timeHelper.initial("1:", 12));
    });

    it('should get validate default time', () => {
      let times = ["12", "01", "AM"];
      expect(times).to.deep.equal(timeHelper.initial("abc:1", 12));
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
      expect(drag.validatePosition(MIN_ABSOLUTE_POSITION - 1, MIN_ABSOLUTE_POSITION, MAX_ABSOLUTE_POSITION)).to.equal(MIN_ABSOLUTE_POSITION);
    });

    it('should return the MaxPosition', () => {
      expect(drag.validatePosition(MAX_ABSOLUTE_POSITION + 1, MAX_ABSOLUTE_POSITION, MAX_ABSOLUTE_POSITION)).to.equal(MAX_ABSOLUTE_POSITION);
    });
  });
});
