import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import Divider from 'material-ui/Divider';
const catalogPath = '/catalog';
const ordersPath = '/orders';

const Menu = (props, { router, muiTheme: { palette: { accent1Color } } }) => {
  const location = router.getCurrentLocation();
  return (
    <Paper>
      <List>
        <Link to={catalogPath} style={{ textDecoration: 'none' }}>
          <ListItem
            primaryText="Catalog"
            leftIcon={<ShoppingCartIcon color={location.pathname === catalogPath ? accent1Color : ''} />}
          />
        </Link>
      </List>
      <Divider />
      <List>
        <Link to={ordersPath} style={{ textDecoration: 'none' }}>
          <ListItem
            primaryText="Orders"
            leftIcon={<AssignmentIcon color={location.pathname === ordersPath ? accent1Color : ''} />}
          />
        </Link>
      </List>
    </Paper>
  );
};

Menu.contextTypes = {
  router: PropTypes.object,
  muiTheme: PropTypes.object,
};

export default Menu;
