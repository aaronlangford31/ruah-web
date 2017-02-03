import React, { PropTypes } from 'react';
import { Paper as MaterialPaper } from 'material-ui';

const Paper = ({ children }) =>
  <MaterialPaper
    style={{
      marginTop: 20,
      padding: 24,
      minHeight: 600,
    }}
  >
    {children}
  </MaterialPaper>;

Paper.propTypes = {
  children: PropTypes.object,
};

export default Paper;
