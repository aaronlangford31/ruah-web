import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import BasicForm from '../../styled/BasicForm';
import { TextField, DatePickerField } from '../Fields';
import Grid from '../../styled/Grid';
import validate from './validate';

const ShippingForm = () => (
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
  </BasicForm>
);

export default reduxForm({
  form: 'shippingForm',
  validate,
})(ShippingForm);
