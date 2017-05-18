import React, { PropTypes } from 'react';
import { Paper as MaterialPaper } from 'material-ui';
import Ocean from './Ocean.jpg';

const Paper = ({ children, useBackground, style }) =>
  <MaterialPaper
    style={{
      marginTop: 0,
      padding: '24px 24px 24px 0',
      minHeight: 600,
      background: useBackground ? `linear-gradient(rgba(202, 252, 216, 0.1), rgba(202, 252, 216, 0.25)), url(${Ocean})` : 'none',
      backgroundSize: useBackground ? 'cover' : 'auto',
      display: useBackground ? 'flex' : 'block',
      alignItems: useBackground ? 'center' : 'stretch',
      justifyContent: useBackground ? 'center' : 'flex-start',
      ...style,
    }}
  >
    {children}
  </MaterialPaper>;

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
