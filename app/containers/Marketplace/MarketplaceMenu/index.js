import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import ExploreIcon from 'material-ui/svg-icons/action/explore';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import TradeIcon from 'material-ui/svg-icons/action/compare-arrows';

const discoverPath = '/marketplace/discover';
const requestsPath = '/marketplace/requests';
const channelsPath = '/marketplace/channels';

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

const MarketplaceMenu = ({ location }) => (
  <Paper style={{ padding: '15px', margin: '10px', width: '225px', height: '125px', display: 'flex', flexDirection: 'column' }}>
    <Link to={discoverPath} style={location === discoverPath ? Object.assign({}, linkStyle, currentLinkStyle) : linkStyle}>
      <ExploreIcon color={'#757575'} /> Discover
    </Link>
    <Link to={requestsPath} style={location === requestsPath ? Object.assign({}, linkStyle, currentLinkStyle) : linkStyle}>
      <PersonAddIcon color={'#757575'} /> Channel Requests
    </Link>
    <Link to={channelsPath} style={location === channelsPath ? Object.assign({}, linkStyle, currentLinkStyle) : linkStyle}>
      <TradeIcon color={'#757575'} /> My Channels
    </Link>
  </Paper>
);

MarketplaceMenu.propTypes = {
  location: PropTypes.string,
};

export default MarketplaceMenu;
