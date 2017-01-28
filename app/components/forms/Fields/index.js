import BulletFields from './BulletFields';
import CheckboxField from './CheckboxField';

// import ChipsField from './ChipsField';

import React, { PropTypes } from 'react';
import ChipInput from 'material-ui-chip-input';
import FileField from './FileField';
import FileFields from './FileFields';
import TextField from './TextField';
import TextFields from './TextFields';

export {
  BulletFields,
  CheckboxField,

  // ChipsField,

  FileField,
  FileFields,
  TextField,
  TextFields,
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
