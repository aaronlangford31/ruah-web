import React, { PropTypes } from 'react';
import { Paper as MaterialPaper } from 'material-ui';

const Paper = ({ children }) =>
  <MaterialPaper style={{ marginTop: '20px', padding: '24px' }}>{children}</MaterialPaper>;

Paper.propTypes = {
  children: PropTypes.object,
};

export default Paper;
