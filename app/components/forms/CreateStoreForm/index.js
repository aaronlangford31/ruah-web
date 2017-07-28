import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
// import { TextField, CheckboxField } from '../Fields';

const CreateStoreForm = ({ handleSubmit, login, loading }) => (
  <div style={{ display: 'flex' }}>
    { loading && <Spinner /> }
    <BasicForm onSubmit={handleSubmit(login)}></BasicForm>
    <div style={{ display: 'flex', flexDirection: 'column', padding: '40px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.85)' }}>
      <Paper style={{ padding: '20px', maxWidth: '350px', height: '100%' }}>
        <h2 style={{ fontWeight: '400' }}>New here?</h2>
        <p>{'Very nice to meet you, virtually that is. Consider this an official invitation to join the Ruah community!'}</p>
        <p>Ruah is a place where small business grows by meeting helpful retailers and other service providers.</p>
        <p>{'Let\'s start by getting to know you:'}</p>
        <div>
          <Link to={'/introduction'}>
            <RaisedButton backgroundColor={'#04BFBF'} style={{ color: '#FAFAFA' }}>{'Let\'s go!'}</RaisedButton>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={'/sign-up'}>
            <RaisedButton>&nbsp;&nbsp;&nbsp;I have a sign-up code&nbsp;&nbsp;&nbsp;</RaisedButton>
          </Link>
        </div>
      </Paper>
    </div>
  </div>

);

CreateStoreForm.propTypes = {
  handleSubmit: PropTypes.func,
  login: PropTypes.func,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'createStoreForm',  // a unique identifier for this form
  validate,
})(CreateStoreForm);
