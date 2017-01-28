import React, { PropTypes } from 'react';
import ChipInput from 'material-ui-chip-input';

const ChipsField = ({ input, label, hintText }) => (
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

export default ChipsField;
