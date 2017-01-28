import React, { PropTypes } from 'react';
import { TextField as MaterialTextField } from 'material-ui';

const TextField = ({ input, label, type, meta: { touched, error }, ...custom }) => (
  <MaterialTextField
    floatingLabelText={label}
    type={type}
    errorText={touched && error}
    style={{ margin: '0 10px' }}
    {...input}
    {...custom}
  />
);

TextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};

export default TextField;
