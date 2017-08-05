import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const FileField = ({ label, input, style }) => (
  <div>
    <RaisedButton
      labelPosition="before"
      style={style}
      containerElement="label"
    >
      {label}
      <input
        type="file"
        style={{
          cursor: 'pointer',
          display: 'none',
        }}
        accept={'image/*'}
        onChange={(e) => input.onChange(e.target.files)}
      />
    </RaisedButton>
    &nbsp;{input.value.length > 0 && input.value[0].name}
  </div>
  );

FileField.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object,
  input: PropTypes.object,
};

export default FileField;
