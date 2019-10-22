// code related to a specific form goes here, using the imported generic Form component
// see the SINGLE IMPLEMENTATION section for details
import React from 'react';
import { useForm } from '../Components/Form';
import {
  FIRST_NAME_FIELD,
  LAST_NAME_FIELD,
  PHONE_NAME_FIELD,
} from './constants';
import { createValidator, number, required, string } from '../validate';

const validator = createValidator({
  [FIRST_NAME_FIELD]: [required, string],
  [LAST_NAME_FIELD]: [string],
  [`${PHONE_NAME_FIELD}.code`]: [required, number],
  [`${PHONE_NAME_FIELD}.number`]: [number],
});

const onSubmit = values => console.log('onSubmit', values);

const renderError = ({ submitted, error }, txt = '') =>
  submitted && error ? (
    <span className="error">{` ${txt} ${error}`}</span>
  ) : null;

const UserContactForm = () => {
  const { createInputProps, values, handleSubmit } = useForm({
    validate: validator,
    onSubmit,
  });

  const firstName = createInputProps(FIRST_NAME_FIELD);
  const lastName = createInputProps(LAST_NAME_FIELD);
  const phoneNumber = createInputProps(`${PHONE_NAME_FIELD}.number`);
  const phoneCode = createInputProps(`${PHONE_NAME_FIELD}.code`);

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <label>First Name</label>
        <input {...firstName.input} />
        {renderError(firstName)}
      </div>
      <p>
        <label>Nach name (it's not the first name)</label>
        <input {...lastName.input} />
        {renderError(lastName)}
      </p>
      <p>
        <label>Phone</label>
        <input {...phoneCode.input} className="codeInput" placeholder="code" />
        <input
          {...phoneNumber.input}
          className="numberInput"
          placeholder="xxx xxx xx"
        />
        {renderError(phoneCode, 'Code')}
        {renderError(phoneNumber, 'Phone ')}
      </p>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserContactForm;
