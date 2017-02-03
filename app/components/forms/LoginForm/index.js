import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import { TextField, CheckboxField } from '../Fields';

const LoginForm = ({ handleSubmit, login, loading }) => (
  <BasicForm onSubmit={handleSubmit(login)}>
    <Field name="email" type="email" component={TextField} label="Email" /><br />
    <Field name="password" type="password" component={TextField} label="Password" /><br />
    <Field name="remember" type="checkbox" component={CheckboxField} label="Remember Me" /><br />
    <div style={{ marginTop: 12 }} className="button">
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
