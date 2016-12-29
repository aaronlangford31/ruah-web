import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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

const CodeForm = ({ handleSubmit, checkCode }) => (
  <form onSubmit={handleSubmit(checkCode)}>
    <Field name="code" type="text" component={renderField} label="Code" /><br />
    <div>
      <RaisedButton type="submit">Submit</RaisedButton>
    </div>
  </form>
);

CodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  checkCode: PropTypes.func,
};

export default reduxForm({
  form: 'codeForm',  // a unique identifier for this form
})(CodeForm);
