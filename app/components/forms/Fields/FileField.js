import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const FileField = ({ label, ...custom }) => (
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

export default FileField;
