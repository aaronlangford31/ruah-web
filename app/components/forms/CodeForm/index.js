import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import { renderField } from '../Fields';

const CodeForm = ({ handleSubmit, checkCode, loading }) => (
  <BasicForm onSubmit={handleSubmit(checkCode)}>
    <Field name="code" type="text" component={renderField} label="Code" /><br />
    <div>
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
