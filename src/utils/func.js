// simple utils for working with sequences like Array or string

const checkType = (val, result) =>
  Object.prototype.toString.call(val) === result;

export const is = {
  object: val => checkType(val, '[object Object]'),
  array: val => Array.isArray(val),
  func: val => checkType(val, '[object Function]'),
  string: val => checkType(val, '[object String]'),
  undefined: val => typeof val === 'undefined',
};

export const isSeq = seq => (is.string(seq) || is.array(seq));
export const head = seq => isSeq(seq) ? seq[0] : null;
export const first = head;
export const tail = seq => isSeq(seq) ? seq.slice(1) : null;
export const rest = tail;
export const last = seq => isSeq(seq) ? seq[seq.length - 1] : null;
