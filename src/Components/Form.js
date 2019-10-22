// reusable form component goes here
// should be generic, with no code related to one specific type of form
// see the REUSABLE COMPONENT section for details
import React, { Fragment } from 'react';
import { useForm } from '../hooks';

const FormContext = React.createContext();

export const Form = ({ children, ...formProps }) => {
  const { createInputProps, handleSubmit } = useForm(formProps);

  return (
    <FormContext.Provider value={{ createInputProps }}>
      <form onSubmit={handleSubmit}>{children({ handleSubmit })}</form>
    </FormContext.Provider>
  );
};

export const FieldControl = ({ error, submitted, label, ...props }) => (
  <label className="field">
    {label ? <div>{label}</div> : null}
    <input {...props} />
    {submitted && error && <span className="error">{error}</span>}
  </label>
);

export const Field = ({ label, ...inputProps }) => (
  <FormContext.Consumer>
    {({ createInputProps }) => {
      const { submitted, error, input } = createInputProps(inputProps.name);
      const { children, ...restProps } = inputProps;
      const inpProps = { ...input, ...restProps, submitted, error };

      return children ? (
        children(inpProps)
      ) : (
        <FieldControl {...inpProps} label={label} />
      );
    }}
  </FormContext.Consumer>
);

export { useForm };
