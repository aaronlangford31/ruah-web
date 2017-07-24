import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Logo from './logo.png';
import { menuItemContainer } from './styles';

const Header = ({ loggedIn, submitLogout }) => (
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
          </div>
        }
      </ToolbarGroup>
      <ToolbarGroup>
        {loggedIn && <div>
          <FlatButton label="Logout" onClick={submitLogout} />
        </div>}
      </ToolbarGroup>
    </Toolbar>
  </nav>
);

Header.propTypes = {
  loggedIn: PropTypes.bool,
  submitLogout: PropTypes.func,
};

export default Header;
