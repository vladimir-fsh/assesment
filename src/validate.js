import { isNumber, castArray, noop, get } from './helpers';

export const createValidator = rules => values =>
  Object.keys(rules).reduce((acc, key) => {
    const fns = castArray(rules[key] || noop);
    const val = get(key, values);

    fns.some(fn => {
      const error = fn(val, values);

      if (error) {
        acc = { ...acc, [key]: error };
      }

      return error;
    });

    return acc;
  }, {});

export const required = value => (!!value ? null : 'required');
export const number = value => (isNumber(value) ? null : 'is not number');
export const string = value =>
  typeof value === 'string' && value.match(/[a-z]/i)
    ? null
    : 'Should contain letters';
