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

const SignUpForm = ({ checkCode, handleSubmit, validSignUpCodeStatus, error }) => (
  <div>
    {!validSignUpCodeStatus ? <form onSubmit={checkCode}>
      <Field name="code" type="text" component={renderField} label="Code" /><br />
      <div>
        <RaisedButton type="submit">Submit</RaisedButton>
      </div>
    </form> : <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <Field name="email" type="text" component={renderField} label="Email" /><br />
        <Field name="password" type="password" component={renderField} label="Password" /><br />
        <Field
          name="password_confirmation"
          type="password"
          component={renderField}
          label="Confirm Password"
        /><br />
      </div>
      <div>{error}</div>
      <div>
        <RaisedButton type="submit">Submit</RaisedButton>
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
