const validate = (values) => {
  const errors = {};
  if (!values.get('CarrierCode')) {
    errors.CarrierCode = 'Required';
  }
  if (!values.get('CarrierName')) {
    errors.CarrierName = 'Required';
  }
  if (!values.get('ShippingMethod')) {
    errors.ShippingMethod = 'Required';
  }
  if (!values.get('ShipTrackCode')) {
    errors.ShipTrackCode = 'Required';
  }
  if (!values.get('EstimatedShipmentDate')) {
    errors.EstimatedShipmentDate = 'Required';
  }
  return errors;
};

export default validate;
