import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable'; // <--- immutable import
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label htmlFor="for">{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};

const SignUpForm = ({ checkCode, handleSubmit, validSignUpCodeStatus, error }) => (
  <div>
    {!validSignUpCodeStatus ? <form onSubmit={checkCode}>
      <Field name="code" type="text" component={renderField} label="Code" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form> : <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <Field name="email" type="text" component={renderField} label="Email" />
        <Field name="password" type="password" component={renderField} label="Password" />
        <Field
          name="password_confirmation"
          type="password"
          component={renderField}
          label="Confirm Password"
        />
      </div>
      <div>{error}</div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>}
  </div>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
  checkCode: PropTypes.func,
  validSignUpCodeStatus: PropTypes.bool,
  error: PropTypes.string,
};

export default reduxForm({
  form: 'signUpCodeForm',  // a unique identifier for this form
  validate,
})(SignUpForm);
