import React, { useState } from 'react';
import { get, set, noop, castArray } from './helpers';

const isChecked = (type, formValue, value) =>
  type === 'checkbox'
    ? castArray(formValue).indexOf(value) !== -1
    : value === formValue;

const getValue = (e, formValue = []) => {
  const target = get(['target'], e);

  if (target) {
    const { value, checked, type } = target;

    if (type === 'checkbox') {
      if (checked) {
        return [value, ...formValue];
      } else {
        const index = formValue.indexOf(value);

        return index < 0
          ? formValue
          : formValue.slice(0, index).concat(formValue.slice(index + 1));
      }
    }

    return value;
  }

  return e;
};

export const useForm = ({
  onSubmit = noop,
  validate = noop,
  initialValues = {},
}) => {
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const errors = validate(values);

  const createInputProps = (param, options) => {
    if (typeof param === 'string') {
      param = { name: param };
    }

    const { name, type = 'text' } = param;
    const formValue = get(name, values);

    options = options || [formValue];

    const res = options.map(defaultValue => {
      const checked = isChecked(type, formValue, defaultValue);
      const error = get([name], errors);
      const onChange = e => {
        const val = getValue(e, formValue);
        setValues(prevValues => ({ ...set(name, val, prevValues) }));
      };

      return {
        input: {
          checked,
          name,
          type,
          value: defaultValue || formValue || '',
          onChange,
        },
        submitted,
        error,
      };
    });

    return res.length === 1 ? res[0] : res;
  };

  return {
    createInputProps,
    values,
    handleSubmit: e => {
      e.preventDefault();
      setSubmitted(true);

      if (Object.keys(errors).length === 0) {
        onSubmit(values);
      } else {
        console.log('errors', errors);
      }
    },
  };
};
