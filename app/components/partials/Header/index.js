import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Logo from './logo.png';

// import colors from '../../containers/App/colors';

const Header = ({ userType }) => (
  <nav>
    <Toolbar>
      <ToolbarGroup>
        <div style={{ height: '100%' }}>
          <Link to={'/'}>
            <img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </Link>
        </div>
      </ToolbarGroup>
      <ToolbarGroup>
        {userType === 'Supplier' && <Link to={'/orders'} style={{ marginRight: '12px' }}>
          <RaisedButton label="Orders" secondary />
        </Link>}
        {userType === 'Supplier' && <Link to={'/catalog'} style={{ marginRight: '12px' }}>
          <RaisedButton label="Catalog" secondary />
        </Link>}
        {!userType && <Link to={'/sign-up'} style={{ marginRight: '12px' }}>
          <RaisedButton label="Sign Up" secondary />
        </Link>}
        {!userType && <Link to={'/login'}>
          <RaisedButton label="Login" primary />
        </Link>}
        {userType && <Link to={'/'}>
          <RaisedButton label="Logout" secondary />
        </Link>}
      </ToolbarGroup>
    </Toolbar>
  </nav>
);

Header.propTypes = {
  userType: PropTypes.string,
};

export default Header;
