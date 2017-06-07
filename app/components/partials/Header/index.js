import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import StoreIcon from 'material-ui/svg-icons/maps/store-mall-directory';
import Logo from './logo.png';
import { menuItem, menuItemContainer, selectedMenuItem } from './styles';

const catalogPath = '/catalog';
const ordersPath = '/orders';
const storePath = '/myStore';

const Header = ({ loggedIn, submitLogout, location }) => (
  <nav>
    <Toolbar style={{ backgroundColor: '#FFFFFF' }}>
      <ToolbarGroup>
        <div style={{ height: '100%', width: '170px' }}>
          <Link to={'/'}>
            <img src={Logo} alt="Logo" style={{ maxHeight: '100%' }} />
          </Link>
        </div>
        { loggedIn &&
          <div style={menuItemContainer}>
            <Link to={storePath} style={Object.assign({}, menuItem, (location === storePath ? selectedMenuItem : {}))}>
              <StoreIcon color={'#757575'} /> My Store
            </Link>
            <Link to={catalogPath} style={Object.assign({}, menuItem, (location === catalogPath ? selectedMenuItem : {}))}>
              <ShoppingCartIcon color={'#757575'} /> Catalog
            </Link>
            <Link to={ordersPath} style={Object.assign({}, menuItem, (location === ordersPath ? selectedMenuItem : {}))}>
              <AssignmentIcon color={'#757575'} /> Fulfillment
            </Link>
          </div>
        }
      </ToolbarGroup>
      <ToolbarGroup>
        {loggedIn && <Link to={'#'}>
          <FlatButton label="Logout" onClick={submitLogout} />
        </Link>}
      </ToolbarGroup>
    </Toolbar>
  </nav>
);

Header.propTypes = {
  loggedIn: PropTypes.bool,
  submitLogout: PropTypes.func,
  location: PropTypes.string,
};

export default Header;
