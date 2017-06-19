import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import GridIcon from 'material-ui/svg-icons/action/view-module';
import StoreIcon from 'material-ui/svg-icons/maps/store-mall-directory';
import PublicIcon from 'material-ui/svg-icons/social/public';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import Logo from './logo.png';
import { menuItem, menuItemContainer, selectedMenuItem } from './styles';

const catalogPath = '/catalog/myproduct';
const ordersPath = '/orders';
const storePath = '/myStore';
const marketplacePath = '/marketplace/discover';

const Header = ({ loggedIn, submitLogout, location, cartCount }) => (
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
            <Link to={marketplacePath} style={Object.assign({}, menuItem, (location === marketplacePath ? selectedMenuItem : {}))}>
              <PublicIcon color={'#757575'} /> Marketplace
            </Link>
            <Link to={catalogPath} style={Object.assign({}, menuItem, (location === catalogPath ? selectedMenuItem : {}))}>
              <GridIcon color={'#757575'} /> Catalog
            </Link>
            <Link to={ordersPath} style={Object.assign({}, menuItem, (location === ordersPath ? selectedMenuItem : {}))}>
              <AssignmentIcon color={'#757575'} /> Fulfillment
            </Link>
          </div>
        }
      </ToolbarGroup>
      <ToolbarGroup>
        {loggedIn && <div>
          <Link to={'/checkout'}>
            <CartIcon color={'#04BFBF'} />
            <span
              style={{
                borderRadius: '25px',
                backgroundColor: '#04BFBF',
                color: 'white',
                textDecoration: 'none',
                padding: '4px 8px',
                fontSize: '14px',
              }}
            >
              { cartCount }
            </span>
          </Link>
          <FlatButton label="Logout" onClick={submitLogout} />
        </div>}
      </ToolbarGroup>
    </Toolbar>
  </nav>
);

Header.propTypes = {
  loggedIn: PropTypes.bool,
  submitLogout: PropTypes.func,
  location: PropTypes.string,
  cartCount: PropTypes.number,
};

export default Header;
