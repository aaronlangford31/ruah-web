const validate = (values) => {
  const errors = {};

  if (!values.get('Name')) {
    errors.Name = 'Required';
  }

  if (!values.get('SKU')) {
    errors.SKU = 'Required';
  }

  if (!values.get('Brand')) {
    errors.Brand = 'Required';
  }

  if (!values.get('ManufacturerName')) {
    errors.ManufacturerName = 'Required';
  }

  if (!values.get('Type')) {
    errors.Type = 'Required';
  }

  if (!values.get('TypeKeyword')) {
    errors.TypeKeyword = 'Required';
  }

  if (!values.get('BrowseNode')) {
    errors.BrowseNode = 'Required';
  }

  if (!values.get('TaxCategory')) {
    errors.TaxCategory = 'Required';
  }

  if (!values.get('Description')) {
    errors.Description = 'Required';
  }

  if (!values.get('Inventory')) {
    errors.Inventory = 'Required';
  } else if (isNaN(values.get('Inventory')) || values.get('Inventory') < 0) {
    errors.Inventory = 'Must be a positive number.';
  }

  return errors;
};

export default validate;
