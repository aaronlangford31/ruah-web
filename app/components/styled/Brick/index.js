import React, { PropTypes } from 'react';

const Brick = ({ children }) =>
  <div>{ children }</div>;

Brick.propTypes = {
  children: PropTypes.node,
};

export default Brick;
