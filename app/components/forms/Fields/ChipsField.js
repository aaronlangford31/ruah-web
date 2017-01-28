import React, { PropTypes } from 'react';
import ChipInput from 'material-ui-chip-input';

const ChipsField = ({ input, label, hintText }) => {
  console.log(input.value);
  return (
    <ChipInput
      style={{ margin: '0 10px' }}
      value={input.value || []}
      onRequestAdd={(chip) => {
        let values = input.value || [];
        values = values.slice();
        values.push(chip);
        input.onChange(values);
      }}
      onRequestDelete={(chip) => {
        let values = input.value || [];
        values = values.filter((v) => v !== chip);
        input.onChange(values);
      }}
      onBlur={() => input.onBlur()}
      hintText={hintText}
      floatingLabelText={label}
    />
  );
}

ChipsField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  hintText: PropTypes.string,
};

export default ChipsField;
