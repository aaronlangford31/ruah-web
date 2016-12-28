import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable'; // <--- immutable import
import validate from './validate';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const renderField = ({ input, label, type, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    type={type}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};

const LoginForm = ({ handleSubmit, error }) => (
  <form onSubmit={handleSubmit}>
    <Field name="email" type="email" component={renderField} label="Email" /><br />
    <Field name="password" type="password" component={renderField} label="Password" /><br />
    <div>{error}</div>
    <div>
      <RaisedButton type="submit">Submit</RaisedButton>
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
