import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from '../../../components/styled/Spinner';
import { TextField } from '../Fields';

const CodeForm = ({ handleSubmit, loading }) => (
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
  </form>
);

CodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'codeForm',
})(CodeForm);
