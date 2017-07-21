const validate = (values) => {
  const errors = {};

  if (isNaN(values.get('Inventory'))) {
    errors.Inventory = 'Must be valid number.';
  }

  if (!values.get('RuahId')) {
    errors.RuahId = 'Required';
  }

  return errors;
};

export default validate;
