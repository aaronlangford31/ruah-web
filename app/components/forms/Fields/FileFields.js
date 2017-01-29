import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field } from 'redux-form/immutable';
import TextField from './TextField';
import FileField from './FileField';
import Close from 'material-ui/svg-icons/navigation/close';

const FileFields = ({ label, fields }) => (
  <div>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {fields.map((field, i) =>
        <li key={i}>
          <Field
            name={`${field}.name`}
            type="text"
            component={TextField}
            hintText="Filename"
          />
          <Field
            name={`${field}.value`}
            type="file"
            label={label}
            component={FileField}
            multiLine
          />
          <button
            type="button"
            onClick={() => fields.remove(i)}
            style={{ cursor: 'pointer' }}
          ><Close />
          </button>
        </li>
      )}
    </ul>
    <RaisedButton onClick={() => fields.push({})}>Add</RaisedButton>
  </div>
);

FileFields.propTypes = {
  label: PropTypes.string,
  fields: PropTypes.object,
};

export default FileFields;
