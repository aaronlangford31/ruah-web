import React, { PropTypes } from 'react';
import _ from 'underscore';
import TextField from './TextField';
import { Field } from 'redux-form/immutable';
import Grid from '../../styled/Grid';

const TextFields = ({ fields, style }) => (
  <Grid size={3} childStyle={style}>
    {_.map(fields, (field, i) => (
      <Field
        key={i}
        type="text"
        label={field.label}
        name={field.name}
        component={TextField}
      />
    ))}
  </Grid>
);

TextFields.propTypes = {
  fields: PropTypes.array,
  style: PropTypes.object,
};

TextFields.defaultProps = {
  errors: {},
};

export default TextFields;
