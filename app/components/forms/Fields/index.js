import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ChipInput from 'material-ui-chip-input';
import FileInput from './FileInput';
import _ from 'underscore';
import { Field } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';

const renderField = ({ input, label, type, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    type={type}
    errorText={touched && error}
    style={{ margin: '0 10px' }}
    {...input}
    {...custom}
  />
);

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    style={{ marginTop: '24px' }}
    checked={!!input.value}
    onCheck={input.onChange}
  />
);

renderCheckbox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
};

const renderChip = ({ input, hintText, label }) => (
  <ChipInput
    style={{ margin: '0 10px' }}
    {...input}
    value={input.value || []}
    onRequestAdd={(addedChip) => {
      let values = input.value || [];
      values = values.slice();
      values.push(addedChip);
      input.onChange(values);
    }}
    onRequestDelete={(deletedChip) => {
      let values = input.value || [];
      values = values.filter((v) => v !== deletedChip);
      input.onChange(values);
    }}
    onBlur={() => input.onBlur()}
    hintText={hintText}
    floatingLabelText={label}
  />
);

renderChip.propTypes = {
  input: PropTypes.object,
  hintText: PropTypes.string,
  label: PropTypes.string,
};

const renderFileInput = ({ ...rest }) => (
  <FileInput
    style={{ margin: '0 10px' }}
    {...rest}
  />
);

renderCheckbox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
};

const renderFields = (fields) => (
  <div>
    {_.map(fields, (field, i) => (
      <Field key={i} name={field.name} type="text" component={renderField} label={field.label} style={{ margin: '0 10px' }} />
    ))}
  </div>
);

const renderFileInputs = ({ fields, label }) => (
  <div>
    <div>{label}</div>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {fields.map((field, i) =>
        <li key={i}>
          <Field
            name={`${field}.name`}
            type="text"
            component={renderField}
          />
          <Field
            name={`${field}.value`}
            type="file"
            component={renderFileInput}
            multiLine
          />
          <button
            type="button"
            onClick={() => fields.remove(i)}
            style={{ cursor: 'pointer' }}
          >
          </button>
        </li>
      )}
    </ul>
    <RaisedButton onClick={() => fields.push({})}>Add</RaisedButton>
  </div>
);

renderFileInputs.propTypes = {
  label: PropTypes.string,
  fields: PropTypes.object,
};

const renderBullets = ({ fields, label }) => (
  <div>
    <div>{label}</div>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {fields.map((field, i) =>
        <li key={i}>
          <Field
            name={`${field}.value`}
            type="text"
            component={renderField}
            multiLine
          />
          <button
            type="button"
            onClick={() => fields.remove(i)}
            style={{ cursor: 'pointer' }}
          >x
          </button>
        </li>
      )}
    </ul>
    <RaisedButton onClick={() => fields.push({})}>Add</RaisedButton>
  </div>
);

renderBullets.propTypes = {
  label: PropTypes.string,
  fields: PropTypes.object,
};

export {
  renderField,
  renderCheckbox,
  renderChip,
  renderFileInput,
  renderFields,
  renderFileInputs,
  renderBullets,
};
