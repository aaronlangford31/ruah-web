import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import { TextField, CheckboxField } from '../Fields';

const LoginForm = ({ handleSubmit, login, loading }) => (
  <div style={{ display: 'flex' }}>
    { loading && <Spinner /> }
    <BasicForm onSubmit={handleSubmit(login)}>
      <div style={{ paddingTop: '20px' }}>
        <h2 style={{ fontWeight: '200', marginBottom: '0', color: '#04BFBF' }}>Welcome back, friend!</h2>
      </div>
      <Field
        name="email"
        type="email"
        label="Email"
        component={TextField}
        floatingLabelStyle={{ color: 'black' }}
        underlineStyle={{ borderColor: 'black' }}
      /><br />
      <Field
        name="password"
        type="password"
        label="Password"
        component={TextField}
        floatingLabelStyle={{ color: 'black' }}
        underlineStyle={{ borderColor: 'black' }}
      /><br />
      <Field name="remember" type="checkbox" component={CheckboxField} label="Remember Me" /><br />
      <div style={{ marginTop: 12, display: 'flex' }} className="button">
        <RaisedButton type="submit">Go</RaisedButton>
      </div>
    </BasicForm>
    <div style={{ display: 'flex', flexDirection: 'column', padding: '40px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.75)' }}>
      <Paper style={{ padding: '20px', maxWidth: '350px', height: '100%' }}>
        <h2 style={{ fontWeight: '400' }}>New here?</h2>
        <p>{'Very nice to meet you, virtually that is. Consider this an official invitation to join the Ruah community!'}</p>
        <p>Ruah is a place where small business grows by meeting helpful retailers and other service providers.</p>
        <p>{'Let\'s start by getting to know you:'}</p>
        <div>
          <RaisedButton backgroundColor={'#04BFBF'} style={{ color: '#FAFAFA' }}>{'Let\'s go!'}</RaisedButton>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={'/sign-up'}>
            <RaisedButton>&nbsp;&nbsp;&nbsp;I have a sign-up code&nbsp;&nbsp;&nbsp;</RaisedButton>
          </Link>
        </div>
      </Paper>
    </div>
  </div>

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
