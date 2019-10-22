import React from 'react';
import { useForm } from './Form';
import {
  GENDER_NAME_FIELD,
  AGREEMENT_NAME_FIELD,
  NO_IMAGINATION_NAME_FIELD,
} from './constants';

const initialValues = {
  [GENDER_NAME_FIELD]: 'male',
  [NO_IMAGINATION_NAME_FIELD]: 'option2',
};

const onSubmit = values => console.log('onSubmit', values);

const ExampleFormWithHooks = () => {
  const { createInputProps, handleSubmit } = useForm({
    initialValues,
    onSubmit,
  });

  const selectField = createInputProps(NO_IMAGINATION_NAME_FIELD);
  const [male, female] = createInputProps(
    { name: GENDER_NAME_FIELD, type: 'radio' },
    ['male', 'female'],
  );
  const [nospam, agreement] = createInputProps(
    { name: AGREEMENT_NAME_FIELD, type: 'checkbox' },
    ['whoReadsAgreement1', 'whoReadsAgreementN'],
  );

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>
          <input {...male.input} />
          Male
        </label>

        <label>
          <input {...female.input} />
          Female
        </label>
      </p>
      <p>
        <select {...selectField.input} placeholder="I was created for nothing">
          <option value="option1">option 1</option>
          <option value="option2">option 2</option>
        </select>
      </p>

      <p>
        <label>
          <input {...nospam.input} />
          We won't send you emails{' '}
          <span style={{ fontSize: 10 }}>(3-5 per week actually)</span>
        </label>

        <label>
          <input {...agreement.input} />
          Some blabla agreement
        </label>
      </p>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExampleFormWithHooks;
