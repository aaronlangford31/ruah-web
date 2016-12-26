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

const LoginForm = ({ handleSubmit, error }) => (
  <form onSubmit={handleSubmit}>
    <Field name="email" type="email" component={renderField} label="Email" />
    <Field name="password" type="password" component={renderField} label="Password" />
    <div>{error}</div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
};

export default reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate,
})(LoginForm);
