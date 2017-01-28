import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';

const CheckboxField = ({ input, label }) => (
  <Checkbox
    label={label}
    style={{ marginTop: '24px' }}
    checked={!!input.value}
    onCheck={input.onChange}
  />
);

CheckboxField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
};

export default CheckboxField;
