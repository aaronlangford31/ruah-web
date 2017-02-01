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

  return errors;
};

export default validate;
