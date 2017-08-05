import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import { TextField } from '../Fields';

const SignUpForm = ({ handleSubmit, signUp, loading, storeId }) => (
  <BasicForm onSubmit={handleSubmit(signUp)} initialValues={{ storeId }}>
    { !storeId &&
      <div>
        <h2>Choose a store ID:</h2>
        <Field
          name="storeId"
          type="text"
          component={TextField}
          label="Store ID"
          floatingLabelStyle={{ color: 'black' }}
          underlineStyle={{ borderColor: 'black' }}
        /><br />
      </div>
    }
    <h2>Set up your credentials:</h2>
    <Field
      name="email"
      type="text"
      component={TextField}
      label="Email"
      floatingLabelStyle={{ color: 'black' }}
      underlineStyle={{ borderColor: 'black' }}
    /><br />
    <Field
      name="password"
      type="password"
      component={TextField}
      label="Password"
      floatingLabelStyle={{ color: 'black' }}
      underlineStyle={{ borderColor: 'black' }}
    /><br />
    <Field
      name="password_confirmation"
      type="password"
      component={TextField}
      label="Confirm Password"
      floatingLabelStyle={{ color: 'black' }}
      underlineStyle={{ borderColor: 'black' }}
    /><br />
    <Field
      name="code"
      type="hidden"
      component="input"
    />
    <div>
      {!loading ? <RaisedButton type="submit">Submit</RaisedButton> : <Spinner />}
    </div>
  </BasicForm>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
  signUp: PropTypes.func,
  loading: PropTypes.bool,
  storeId: PropTypes.string,
};

export default reduxForm({
  form: 'signUpForm',
  validate,
})(SignUpForm);
