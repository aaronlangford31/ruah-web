import React, { PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';

const DatePickerField = ({ label, input, style }) => (<DatePicker
  style={style}
  floatingLabelText={label}
  onChange={(e, date) => input.onChange(date)}
/>);

DatePickerField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  style: PropTypes.object,
};

export default DatePickerField;
