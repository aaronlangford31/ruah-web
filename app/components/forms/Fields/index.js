import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ChipInput from 'material-ui-chip-input';

const renderField = ({ input, label, type, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    type={type}
    errorText={touched && error}
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

export {
  renderField,
  renderCheckbox,
  renderChip,
};
