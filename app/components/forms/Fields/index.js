import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import { TextField as MaterialTextField } from 'material-ui';
import Checkbox from 'material-ui/Checkbox';
import ChipInput from 'material-ui-chip-input';
import RaisedButton from 'material-ui/RaisedButton';
import Close from 'material-ui/svg-icons/navigation/close';
import _ from 'underscore';

export const TextField = ({ input, label, type, meta: { touched, error }, ...custom }) => (
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

export const CheckboxField = ({ input, label }) => (
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

export const ChipsField = ({ input, label, hintText }) => (
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

ChipsField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  hintText: PropTypes.string,
};

export const FileField = ({ label, ...custom }) => (
  <RaisedButton
    label={label}
    labelPosition="before"
    style={{ margin: '0 10px' }}
    containerElement="label"
  >
    <input
      type="file"
      style={{
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      }}
      {...custom}
    />
  </RaisedButton>
);

FileField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
};

export const TextFields = ({ fields }) => (
  <div>
    {_.map(fields, (field, i) => (
      <Field key={i} name={field.name} type="text" component={TextField} label={field.label} style={{ margin: '0 10px' }} />
    ))}
  </div>
);

TextFields.propTypes = {
  fields: PropTypes.array,
};

export const FileFields = ({ label, fields }) => (
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

export const BulletFields = ({ label, fields }) => (
  <div>
    <div>{label}</div>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {fields.map((field, i) =>
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
      )}
    </ul>
    <RaisedButton onClick={() => fields.push({})}>Add</RaisedButton>
  </div>
);

BulletFields.propTypes = {
  label: PropTypes.string,
  fields: PropTypes.object,
};
