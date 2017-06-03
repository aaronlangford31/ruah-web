import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import StoreIcon from 'material-ui/svg-icons/maps/store-mall-directory';
import { menuItem, menuItemContainer, selectedMenuItem } from './styles';
const catalogPath = '/catalog';
const ordersPath = '/orders';
const storePath = '/myStore';

const Menu = (props, { router }) => {
  const location = router.getCurrentLocation();
  return (
    <div style={menuItemContainer}>
      <Link to={storePath} style={Object.assign({}, menuItem, (location.pathname === storePath ? selectedMenuItem : {}))}>
        <StoreIcon color={'#757575'} /> My Store
      </Link>
      <Link to={catalogPath} style={Object.assign({}, menuItem, (location.pathname === catalogPath ? selectedMenuItem : {}))}>
        <ShoppingCartIcon color={'#757575'} /> Catalog
      </Link>
      <Link to={ordersPath} style={Object.assign({}, menuItem, (location.pathname === ordersPath ? selectedMenuItem : {}))}>
        <AssignmentIcon color={'#757575'} /> Fulfillment
      </Link>
    </div>
  );
};

Menu.contextTypes = {
  router: PropTypes.object,
};

export default Menu;
