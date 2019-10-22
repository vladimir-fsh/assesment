import React from 'react';
import UserContactForm from '../Forms/UserContactForm';
import ExampleForm from '../Components/ExampleForm';
import ExampleFormWithHooks from '../Components/ExampleFormWithHooks';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';

const globalStyles = css`
  body {
    font-family: sans-serif;
    font-size: 14px;
    box-sizing: content-box;
  }

  input[type='text'] {
    width: 350px;
    font-size: 16px;
    padding: 5px;
    margin: 2px 2px 2px 0;
  }

  input[type='submit'],
  input[type='button'],
  button {
    padding: 5px;
    font-size: 14px;
    min-width: 100px;
  }

  .fieldSet {
    padding: 20px 0;
  }

  input.codeInput {
    width: 50px;
  }

  input.numberInput {
    width: 300px;
  }

  .error {
    color: red;
    margin-right: 20px;
  }

  .field {
    padding-bottom: 10px;
  }

  label {
    display: block;
  }
`;

// example of styled component
// https://emotion.sh/docs/styled
const FormHeader = styled.h1`
  color: hotpink;
`;

const App = () => (
  <React.Fragment>
    <Global styles={globalStyles} />
    <FormHeader>Update Your Details</FormHeader>
    <UserContactForm />
  </React.Fragment>
);

export default App;
