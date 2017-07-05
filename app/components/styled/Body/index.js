import React, { PropTypes } from 'react';
import Ocean from './Ocean.jpg';

const Paper = ({ children, useBackground, style }) =>
  <div
    style={{
      margin: '0',
      minHeight: 720,
      background: useBackground ? `linear-gradient(rgba(202, 252, 216, 0.1), rgba(202, 252, 216, 0.25)), url(${Ocean})` : 'none',
      backgroundSize: useBackground ? 'cover' : 'auto',
      display: 'flex',
      alignItems: useBackground ? 'center' : 'stretch',
      justifyContent: 'center',
      paddingBottom: useBackground ? 0 : '75px',
      ...style,
    }}
  >
    {children}
  </div>;

Paper.propTypes = {
  children: PropTypes.node,
  useBackground: PropTypes.bool,
  style: PropTypes.object,
};

Paper.defaultProps = {
  useBackground: false,
  center: false,
  style: {},
};

export default Paper;
