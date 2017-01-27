import React, { Component, PropTypes } from 'react';

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    const { input: { value }, ...rest } = this.props;

    return (
      <input
        type="file"
        value={value}
        onChange={this.onChange}
        {...rest}
      />
    );
  }
}

FileInput.propTypes = {
  input: PropTypes.object,
};

export default FileInput;
