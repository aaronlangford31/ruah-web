import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import FlatButton from 'material-ui/FlatButton';
import BasicForm from '../../styled/BasicForm';
import { TextField, DatePickerField } from '../Fields';
import Grid from '../../styled/Grid';

const ShippingForm = (props) => (
  <BasicForm style={{ padding: 6 }}>
    <p style={{ marginLeft: 12, marginBottom: 0 }}>Enter Shipping Details.</p>
    <Grid size={3}>
      <Field
        name="CarrierCode"
        type="text"
        component={TextField}
        label="Carrier Code"
      />
      <Field
        name="CarrierName"
        type="text"
        component={TextField}
        label="Carrier Name"
      />
      <Field
        name="ShippingMethod"
        type="text"
        component={TextField}
        label="Shipping Method"
      />
      <Field
        name="ShipTrackCode"
        type="text"
        component={TextField}
        label="Ship Track Code"
      />
      <Field
        name="EstimatedShipmentDate"
        component={DatePickerField}
        label="Estimated Shipment Date"
      />
    </Grid>
    <div style={{ display: 'flex' }}>
      <FlatButton
        label="Cancel"
        onTouchTap={props.handleCancel}
      />,
      <FlatButton
        label="Submit"
        onTouchTap={props.handleSubmit}
      />
    </div>
  </BasicForm>
);

const validate = (vals) => {
  const errors = {};
  if (!vals.CarrierCode) {
    errors.CarrierCode = 'Carrier Code required';
  }
  if (!vals.CarrierName) {
    errors.CarrierName = 'Carrier Name required';
  }
  if (!vals.ShippingMethod) {
    errors.ShippingMethod = 'Shippping Method required';
  }
  if (!vals.ShipTrackCode) {
    errors.ShipTrackCode = 'Ship Track Code required';
  }
  if (!vals.EstimatedShipmentDate) {
    errors.EstimatedShipmentDate = 'Estimated Shipment Date required';
  }
  return errors;
};

ShippingForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default reduxForm({
  form: 'shippingForm',
  validate,
})(ShippingForm);
