import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import { TextField } from '../Fields';

const CodeForm = ({ handleSubmit, checkSignUpCode, loading }) => (
  <BasicForm onSubmit={handleSubmit(checkSignUpCode)}>
    <p>Please enter your code to sign up.</p>
    <Field
      name="code"
      type="text"
      component={TextField}
      label="Code"
      floatingLabelStyle={{ color: 'black' }}
      underlineStyle={{ borderColor: 'black' }}
    /><br />
    <div className="button">
      {!loading ? <RaisedButton type="submit">Next</RaisedButton> : <Spinner />}
    </div>
  </BasicForm>
);

CodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  checkSignUpCode: PropTypes.func,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'codeForm',
})(CodeForm);
