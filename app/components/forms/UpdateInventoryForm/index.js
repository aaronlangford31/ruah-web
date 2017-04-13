import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import { TextField } from '../Fields';

const UpdateInventoryForm = ({ handleSubmit, updateInventory, loading }) => (
  <BasicForm onSubmit={handleSubmit(updateInventory)} plain style={{ marginTop: -12 }}>
    <Field
      name="RuahId"
      type="hidden"
      component="input"
    />
    <Field
      name="Inventory"
      type="number"
      component={TextField}
      label="Amount"
    /><br />
    <div>
      {!loading ? <RaisedButton type="submit">Update</RaisedButton> : <Spinner />}
    </div>
  </BasicForm>
);

UpdateInventoryForm.propTypes = {
  handleSubmit: PropTypes.func,
  updateInventory: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'signUpForm',
  validate,
})(UpdateInventoryForm);
