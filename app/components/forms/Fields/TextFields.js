import React, { PropTypes } from 'react';
import _ from 'underscore';
import TextField from './TextField';
import { Field } from 'redux-form/immutable';

const TextFields = ({ fields }) => (
  <div>
    {_.map(fields, (field, i) => (
      <Field key={i} name={field.name} type="text" component={TextField} label={field.label} style={{ margin: '0 10px' }} />
    ))}
  </div>
);

TextFields.propTypes = {
  fields: PropTypes.array,
};

export default TextFields;
