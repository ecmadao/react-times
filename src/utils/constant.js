
const getArray = length => new Array(length).join('0').split('');

export const HOURS = getArray(24 + 1);
export const TWELVE_HOURS = getArray(12 + 1);
export const MINUTES = getArray(60 + 1);

const PICKER_WIDTH = 260;
const POINTER_WIDTH = 35;

export const PICKER_RADIUS = PICKER_WIDTH / 2;
export const MAX_ABSOLUTE_POSITION = 125;
export const MIN_ABSOLUTE_POSITION = 90;
export const POINTER_RADIUS = POINTER_WIDTH / 2;

export const BROWSER_COMPATIBLE = [
  '',
  'O',
  'Moz',
  'Ms',
  'ms',
  'Webkit'
];

export const MERIDIEMS = ['AM', 'PM'];
