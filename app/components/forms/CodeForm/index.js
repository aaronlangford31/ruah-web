import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import { TextField } from '../Fields';

const CodeForm = ({ handleSubmit, checkCode, loading }) => (
  <BasicForm onSubmit={handleSubmit(checkCode)}>
    <p>Please enter your code to sign up.</p>
    <Field name="code" type="text" component={TextField} label="Code" /><br />
    <div className="button">
      {!loading ? <RaisedButton type="submit">Next</RaisedButton> : <Spinner />}
    </div>
  </BasicForm>
);

CodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  checkCode: PropTypes.func,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'codeForm',  // a unique identifier for this form
})(CodeForm);
