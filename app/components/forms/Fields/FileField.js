import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/* eslint no-param-reassign: ["error", { "props": false }] */
const onInputChange = (ev, input, imgEl) => {
  if (ev.target.files && ev.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imgEl.src = e.target.result;
    };

    reader.readAsDataURL(ev.target.files[0]);
  }
  input.onChange(ev.target.files);
};

const FileField = ({ label, input, style }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
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
          onChange={(e) => onInputChange(e, input, this.ImgEl)}
        />
      </RaisedButton>
    </div>
    &nbsp;
    <img
      style={{ width: '100px', height: '100px' }}
      ref={(el) => { this.ImgEl = el; }}
      src={'https://www.foreverlocal.us/wp-content/plugins/yith-woocommerce-multi-vendor-premium/assets/images/shop-placeholder.jpg'}
      alt={'Store Profile'}
    />
  </div>
  );

FileField.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object,
  input: PropTypes.object,
};

export default FileField;
