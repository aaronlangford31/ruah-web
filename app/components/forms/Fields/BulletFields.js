import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from './TextField';
import Close from 'material-ui/svg-icons/navigation/close';

const BulletFields = ({ label, fields, style }) => (
  <div style={style}>
    <div>{label}</div>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {fields.map((field, i) => (
        <li key={i}>
          <Field
            name={`${field}.value`}
            type="text"
            component={TextField}
            multiLine
          />
          <button
            type="button"
            onClick={() => fields.remove(i)}
            style={{ cursor: 'pointer' }}
          ><Close />
          </button>
        </li>
      ))}
    </ul>
    <RaisedButton onClick={() => fields.push({})}>Add</RaisedButton>
  </div>
);

BulletFields.propTypes = {
  label: PropTypes.string,
  fields: PropTypes.object,
  style: PropTypes.object,
};

export default BulletFields;
