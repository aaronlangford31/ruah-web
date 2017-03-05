import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Logo from './logo.png';

const Header = ({ userType, submitLogout }) => (
  <nav>
    <Toolbar style={{ backgroundColor: '#CAFCD8' }}>
      <ToolbarGroup>
        <div style={{ height: '100%' }}>
          <Link to={'/'}>
            <img src={Logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </Link>
        </div>
      </ToolbarGroup>
      <ToolbarGroup>
        {!userType && <Link to={'/sign-up'} style={{ marginRight: '12px' }}>
          <RaisedButton label="Sign Up" />
        </Link>}
        {!userType && <Link to={'/'}>
          <RaisedButton label="Login" />
        </Link>}
        {userType && <Link to={'#'}>
          <RaisedButton label="Logout" onClick={submitLogout} />
        </Link>}
      </ToolbarGroup>
    </Toolbar>
  </nav>
);

Header.propTypes = {
  userType: PropTypes.string,
  submitLogout: PropTypes.func,
};

export default Header;
