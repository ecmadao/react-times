const checkType = (val, result) =>
  Object.prototype.toString.call(val) === result;

export const is = {
  object: val => checkType(val, '[object Object]'),
  array: val => Array.isArray(val),
  func: val => checkType(val, '[object Function]'),
  string: val => checkType(val, '[object String]'),
};
