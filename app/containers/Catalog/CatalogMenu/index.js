import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import StoreIcon from 'material-ui/svg-icons/maps/store-mall-directory';
import TradeIcon from 'material-ui/svg-icons/action/compare-arrows';

const myProductPath = '/catalog/myproduct';
const channelsPath = '/catalog/channels';

const linkStyle = {
  width: '100%',
  height: '30px',
  color: 'black',
  textDecoration: 'none',
  padding: '2px 5px 2px 5px',
};

const currentLinkStyle = {
  backgroundColor: '#CAFCD8',
};

const CatalogMenu = ({ location }) => (
  <Paper style={{ padding: '15px', margin: '10px', width: '225px', height: '90px', display: 'flex', flexDirection: 'column' }}>
    <Link to={myProductPath} style={location === myProductPath ? Object.assign({}, linkStyle, currentLinkStyle) : linkStyle}>
      <StoreIcon color={'#757575'} /> My Product
    </Link>
    <Link to={channelsPath} style={location === channelsPath ? Object.assign({}, linkStyle, currentLinkStyle) : linkStyle}>
      <TradeIcon color={'#757575'} /> Product Channels
    </Link>
  </Paper>
);

CatalogMenu.propTypes = {
  location: PropTypes.string,
};

export default CatalogMenu;
