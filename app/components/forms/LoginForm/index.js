import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';

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

const LoginForm = ({ handleSubmit, login, loading }) => (
  <BasicForm onSubmit={handleSubmit(login)}>
    <Field name="email" type="email" component={renderField} label="Email" /><br />
    <Field name="password" type="password" component={renderField} label="Password" /><br />
    <Field name="remember" type="checkbox" component={renderCheckbox} label="Remember Me" /><br />
    <div style={{ marginTop: 12 }}>
      {!loading ? <RaisedButton type="submit">Submit</RaisedButton> : <Spinner />}
    </div>
  </BasicForm>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  login: PropTypes.func,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate,
})(LoginForm);
