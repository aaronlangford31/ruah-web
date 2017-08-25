import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import StoreIcon from 'material-ui/svg-icons/action/store';
import ListIcon from 'material-ui/svg-icons/action/view-list';

const storeProfilePath = '/mystore/profile';
const productPath = '/mystore/product';

const linkStyle = {
  width: '100%',
  height: '30px',
  color: 'black',
  textDecoration: 'none',
  padding: '2px 5px 2px 5px',
};

const currentLinkStyle = {
  backgroundColor: '#EBF6F7',
};

export default function MyStoreMenuComponent({ location }) {
  return (
    <Paper style={{ padding: '15px', minWidth: '200px', display: 'flex', flexDirection: 'column' }}>
      <Link to={storeProfilePath} style={location === storeProfilePath ? Object.assign({}, linkStyle, currentLinkStyle) : linkStyle}>
        <StoreIcon color={'#757575'} /> Store Profile
      </Link>
      <Link to={productPath} style={location === productPath ? Object.assign({}, linkStyle, currentLinkStyle) : linkStyle}>
        <ListIcon color={'#757575'} /> Products
      </Link>
    </Paper>
  );
}

MyStoreMenuComponent.propTypes = {
  location: PropTypes.string,
};
