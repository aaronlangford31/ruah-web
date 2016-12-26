import React from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Logo from './logo.png';
import colors from '../../containers/App/colors';

const Header = () => (
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
        <Link to={'/sign-up'} style={{ color: colors.darkBlue, textDecoration: 'none' }}>
          <ToolbarTitle text="Sign Up" />
        </Link>
        <ToolbarSeparator />
        <Link to={'/login'}>
          <RaisedButton label="Login" primary />
        </Link>
      </ToolbarGroup>
    </Toolbar>
  </nav>
);

export default Header;
