import React, { PropTypes } from 'react';

const Grid = ({ children, size, childStyle }) => (
  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    {React.Children.map(children, (child) => (React.cloneElement(child, {
      style: Object.assign({
        flexBasis: `calc(100% / ${size} - 24px)`,
        margin: '0 12px',
      }, childStyle),
    })))}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node,
  size: PropTypes.number,
  childStyle: PropTypes.object,
};

Grid.defaultProps = {
  childStyle: {},
};

export default Grid;
