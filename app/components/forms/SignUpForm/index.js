import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import { TextField } from '../Fields';

const SignUpForm = ({ handleSubmit, signUp, loading }) => (
  <BasicForm onSubmit={handleSubmit(signUp)}>
    <Field name="email" type="text" component={TextField} label="Email" /><br />
    <Field name="password" type="password" component={TextField} label="Password" /><br />
    <Field
      name="password_confirmation"
      type="password"
      component={TextField}
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
