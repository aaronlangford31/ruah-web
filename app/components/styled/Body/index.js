import React, { PropTypes } from 'react';
import { Paper as MaterialPaper } from 'material-ui';
import _ from 'underscore';
import lavaImage from './lava.jpg';
import mountainImage from './mountain.jpg';
import surfImage from './surf.jpg';

const backgroundImage = _.sample([
  lavaImage,
  mountainImage,
  surfImage,
]);

const Paper = ({ children, useBackground }) =>
  <MaterialPaper
    style={{
      marginTop: 20,
      padding: 24,
      minHeight: 600,
      backgroundImage: useBackground ? `url(${backgroundImage})` : 'none',
      backgroundSize: useBackground ? 'cover' : 'auto',
      display: useBackground ? 'flex' : 'block',
      alignItems: useBackground ? 'center' : 'stretch',
      justifyContent: useBackground ? 'center' : 'flex-start',
    }}
  >
    {children}
  </MaterialPaper>;

Paper.propTypes = {
  children: PropTypes.node,
  useBackground: PropTypes.bool,
};

Paper.defaultProps = {
  useBackground: false,
  center: false,
};

export default Paper;
