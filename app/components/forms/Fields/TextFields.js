import React, { PropTypes } from 'react';
import _ from 'underscore';
import TextField from './TextField';
import { Field } from 'redux-form/immutable';

const TextFields = ({ fields, style }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {_.map(fields, (field, i) => (
      <Field
        key={i}
        type="text"
        label={field.label}
        name={field.name}
        component={TextField}
        style={Object.assign({
          flexBasis: 'calc(100% / 3 - 24px)',
          margin: '0 12px',
        }, style)}
      />
    ))}
  </div>
);

TextFields.propTypes = {
  fields: PropTypes.array,
  style: PropTypes.object,
};

TextFields.defaultProps = {
  errors: {},
};

export default TextFields;
