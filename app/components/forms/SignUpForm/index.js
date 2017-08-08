import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from '../../../components/styled/Spinner';
import { TextField } from '../Fields';

const SignUpForm = ({ handleSubmit, loading, storeId }) => (
  <form
    onSubmit={handleSubmit}
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '40px',
      borderRadius: '3px',
      background: 'rgba(255, 255, 255, 0.85)',
    }}
  >
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
  </form>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
  storeId: PropTypes.string,
};

export default reduxForm({
  form: 'signUpForm',
  validate,
})(SignUpForm);
