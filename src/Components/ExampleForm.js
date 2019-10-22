import React, { Fragment } from 'react';
import { createValidator, required } from '../validate';
import { Field, Form } from './Form';
import { FIRST_NAME_FIELD, LAST_NAME_FIELD } from './constants';

const initialValues = {
  [FIRST_NAME_FIELD]: 'bob',
};

const validator = createValidator({
  [FIRST_NAME_FIELD]: [required],
  [LAST_NAME_FIELD]: [required],
});

const onSubmit = values => console.log('onSubmit', values);

const ExampleForm = () => (
  <Form initialValues={initialValues} validate={validator} onSubmit={onSubmit}>
    {() => (
      <Fragment>
        <Field name={FIRST_NAME_FIELD} label="First Name" />
        <Field name={LAST_NAME_FIELD}>
          {({ error, submitted, ...inputProps }) => (
            <label className="field">
              <div>Last name</div>
              <input {...inputProps} id={inputProps.name} />
              {submitted && error && <span className="error">{error}</span>}
            </label>
          )}
        </Field>
        <button type="submit">Submit</button>
      </Fragment>
    )}
  </Form>
);

export default ExampleForm;
