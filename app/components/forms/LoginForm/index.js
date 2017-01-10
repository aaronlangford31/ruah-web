import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable'; // <--- immutable import
import validate from './validate';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import BasicForm from '../../styled/BasicForm';

const renderField = ({ input, label, type, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    type={type}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    style={{ marginTop: '24px' }}
    checked={!!input.value}
    onCheck={input.onChange}
  />
);

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};

renderCheckbox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
};

const LoginForm = ({ handleSubmit, error }) => (
  <BasicForm onSubmit={handleSubmit}>
    <Field name="email" type="email" component={renderField} label="Email" /><br />
    <Field name="password" type="password" component={renderField} label="Password" /><br />
    <Field name="remember" type="checkbox" component={renderCheckbox} label="Remember Me" /><br />
    <div>{error}</div>
    <div style={{ marginTop: '12px' }}>
      <RaisedButton type="submit">Submit</RaisedButton>
    </div>
  </BasicForm>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
};

export default reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate,
})(LoginForm);
