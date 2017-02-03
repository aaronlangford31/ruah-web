import React, { PropTypes } from 'react';
import { TextField as MaterialTextField } from 'material-ui';

const TextField = ({ input, label, type, meta: { touched, error }, style, ...custom }) => (
  <MaterialTextField
    floatingLabelText={label}
    type={type}
    errorText={(touched && error)}
    style={style}
    {...input}
    {...custom}
  />
);

TextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  style: PropTypes.object,
  customError: PropTypes.string,
};

export default TextField;
