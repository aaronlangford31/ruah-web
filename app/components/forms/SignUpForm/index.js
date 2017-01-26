import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};

const SignUpForm = ({ handleSubmit, signUp, loading }) => (
  <BasicForm onSubmit={handleSubmit(signUp)}>
    <Field name="email" type="text" component={renderField} label="Email" /><br />
    <Field name="password" type="password" component={renderField} label="Password" /><br />
    <Field
      name="password_confirmation"
      type="password"
      component={renderField}
      label="Confirm Password"
    /><br />
    <div>
      {!loading ? <RaisedButton type="submit">Submit</RaisedButton> : <Spinner />}
    </div>
  </BasicForm>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
  signUp: PropTypes.func,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'signUpForm',  // a unique identifier for this form
  validate,
})(SignUpForm);
