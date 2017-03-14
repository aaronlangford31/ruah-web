import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const FileField = ({ label, style }) => (
  <RaisedButton
    label={label}
    labelPosition="before"
    style={style}
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
      onChange={
        (e) => {
          e.preventDefault();
          const { fields } = this.props;
          // convert files to an array
          const files = [...e.target.files];
          fields.yourField.handleChange(files);
        }
      }
    />
  </RaisedButton>
);

FileField.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object,
};

export default FileField;
