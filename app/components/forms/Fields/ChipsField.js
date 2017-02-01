import React, { PropTypes } from 'react';
import ChipInput from 'material-ui-chip-input';
import { fromJS } from 'immutable';

const ChipsField = ({ input, label, hintText, style }) => (
  <ChipInput
    style={style}
    value={input.value.toJS() || []}
    onRequestAdd={(chip) => {
      let values = input.value ? input.value.toJS() : [];
      values = values.slice();
      values.push(chip);
      input.onChange(fromJS(values));
    }}
    onRequestDelete={(chip) => {
      let values = input.value ? input.value.toJS() : [];
      values = values.filter((v) => v !== chip);
      input.onChange(fromJS(values));
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
  style: PropTypes.object,
};

export default ChipsField;
