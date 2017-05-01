import moment from 'moment';
import {expect} from 'chai';
import timeHelper from '../src/utils/time';
import drag from '../src/utils/drag';
import {
  MAX_ABSOLUTE_POSITION,
  MIN_ABSOLUTE_POSITION
} from '../src/utils/const_value';
import {isSeq, head, tail, last} from '../src/utils/func';

describe('Functional utils', () => {
  describe('isSeq', () => {
    it('should correctly detect a sequence', () => {
      const isSequence = [isSeq('foo'), isSeq('foo'.split())].every((e) => e === true);
      const isNotSequence = [isSeq({message: 'foo'}), isSeq(8), isSeq(true)].every((e) => e === false);
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
const times = ['00:00', '6:00', '06:00', '12:00', '18:00'];

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
          const testTimeData = timeHelper.time(undefined, undefined, mode);
          const timeData = {
            hour12: head(time12).replace(/^0/, ''),
            hour24: head(time24),
            minute: last(time24).slice(0, 2),
            meridiem: last(time12).slice(2),
            mode: mode,
            timezone: tz.zoneName
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

    describe('when passed only a time', () => {
      it('then it should use the specified time, default to 24h format, infer the meridiem, and default to AM', () => {
        times.forEach((time) => {
          const testTimeData = timeHelper.time(time);
          expect(testTimeData.mode).to.equal(24);

          switch (time) {
            case '6:00':
              expect(testTimeData.meridiem).to.equal('AM');
              expect(testTimeData.hour24).to.equal('06');
              expect(testTimeData.hour12).to.equal('6');
              break;
            case '06:00':
              expect(testTimeData.meridiem).to.equal('AM');
              expect(testTimeData.hour24).to.equal('06');
              expect(testTimeData.hour12).to.equal('6');
              break;
            case '12:00':
              expect(testTimeData.meridiem).to.equal('PM');
              expect(testTimeData.hour24).to.equal('12');
              expect(testTimeData.hour12).to.equal('12');
              break;
            case '18:00':
              expect(testTimeData.meridiem).to.equal('PM');
              expect(testTimeData.hour24).to.equal('18');
              expect(testTimeData.hour12).to.equal('6');
              break;
            default: // '00:00'
              expect(testTimeData.meridiem).to.equal('AM');
              expect(testTimeData.hour24).to.equal('00');
              expect(testTimeData.hour12).to.equal('12');
              break;
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
            expect(testTimeData.hour12).to.equal(head(time12).replace(/^0/, ''));
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
            expect(testTimeData.mode).to.equal(mode);

            switch (time) {
              case '6:00':
                expect(testTimeData.meridiem).to.equal('AM');
                expect(testTimeData.hour24).to.equal('06');
                expect(testTimeData.hour12).to.equal('6');
                break;
              case '06:00':
                expect(testTimeData.meridiem).to.equal('AM');
                expect(testTimeData.hour24).to.equal('06');
                expect(testTimeData.hour12).to.equal('6');
                break;
              case '12:00':
                expect(testTimeData.meridiem).to.equal('PM');
                expect(testTimeData.hour24).to.equal('12');
                expect(testTimeData.hour12).to.equal('12');
                break;
              case '18:00':
                expect(testTimeData.meridiem).to.equal('PM');
                expect(testTimeData.hour24).to.equal('18');
                expect(testTimeData.hour12).to.equal('6');
                break;
              default: // '00:00'
                expect(testTimeData.meridiem).to.equal('AM');
                expect(testTimeData.hour24).to.equal('00');
                expect(testTimeData.hour12).to.equal('12');
                break;
            }
          });
        });
      });
    });

    describe('when passed a meridiem and a time', () => {
      it('then it should use the specified time, use the correct meridiem based on time provided, and use 12h mode', () => {
        times.forEach((time) => {
          meridies.forEach((meridiem) => {
            const testTimeData = timeHelper.time(time, meridiem);
            expect(testTimeData.mode).to.equal(12);

            switch (time) {
              case '6:00':
                expect(testTimeData.meridiem).to.equal(meridiem);
                if (meridiem === 'AM') expect(testTimeData.hour24).to.equal('06');
                else expect(testTimeData.hour24).to.equal('18');
                expect(testTimeData.hour12).to.equal('6');
                break;
              case '06:00':
                expect(testTimeData.meridiem).to.equal(meridiem);
                if (meridiem === 'AM') expect(testTimeData.hour24).to.equal('06');
                else expect(testTimeData.hour24).to.equal('18');
                expect(testTimeData.hour12).to.equal('6');
                break;
              case '12:00':
                expect(testTimeData.meridiem).to.equal(meridiem);
                if (meridiem === 'AM') expect(testTimeData.hour24).to.equal('00');
                else expect(testTimeData.hour24).to.equal('12');
                expect(testTimeData.hour12).to.equal('12');
                break;
              case '18:00':
                expect(testTimeData.meridiem).to.equal('PM');
                expect(testTimeData.hour24).to.equal('18');
                expect(testTimeData.hour12).to.equal('6');
                break;
              default: // '00:00'
                // moment doesn't like '00:00 pm', but we care about 12h here
                expect(testTimeData.hour24).to.equal('00');
                expect(testTimeData.hour12).to.equal('12');
                break;
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

              switch (time) {
                case '6:00':
                  expect(testTimeData.mode).to.equal(mode);
                  expect(testTimeData.meridiem).to.equal(meridiem);
                  if (meridiem === 'AM') expect(testTimeData.hour24).to.equal('06');
                  else expect(testTimeData.hour24).to.equal('18');
                  expect(testTimeData.hour12).to.equal('6');
                  break;
                case '06:00':
                  expect(testTimeData.mode).to.equal(mode);
                  expect(testTimeData.meridiem).to.equal(meridiem);
                  if (meridiem === 'AM') expect(testTimeData.hour24).to.equal('06');
                  else expect(testTimeData.hour24).to.equal('18');
                  expect(testTimeData.hour12).to.equal('6');
                  break;
                case '12:00':
                  expect(testTimeData.mode).to.equal(mode);
                  expect(testTimeData.meridiem).to.equal(meridiem);
                  if (meridiem === 'AM') expect(testTimeData.hour24).to.equal('00');
                  else expect(testTimeData.hour24).to.equal('12');
                  expect(testTimeData.hour12).to.equal('12');
                  break;
                case '18:00':
                  expect(testTimeData.mode).to.equal(mode);
                  expect(testTimeData.meridiem).to.equal('PM');
                  expect(testTimeData.hour24).to.equal('18');
                  expect(testTimeData.hour12).to.equal('6');
                  break;
                default: // '00:00'
                  expect(testTimeData.mode).to.equal(mode);
                  // moment doesn't like '00:00 pm'
                  expect(testTimeData.hour24).to.equal('00');
                  expect(testTimeData.hour12).to.equal('12');
                  break;
              }
            });
          });
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
      expect(drag.validatePosition(MIN_ABSOLUTE_POSITION - 1, MIN_ABSOLUTE_POSITION, MAX_ABSOLUTE_POSITION)).to.equal(MIN_ABSOLUTE_POSITION);
    });

    it('should return the MaxPosition', () => {
      expect(drag.validatePosition(MAX_ABSOLUTE_POSITION + 1, MAX_ABSOLUTE_POSITION, MAX_ABSOLUTE_POSITION)).to.equal(MAX_ABSOLUTE_POSITION);
    });
  });
});
