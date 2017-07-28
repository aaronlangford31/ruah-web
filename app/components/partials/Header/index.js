import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Logo from './logo.png';
import { menuItemContainer } from './styles';

const Header = ({ loggedIn, submitLogout, onSearch }) => {
  const handleSearchKeyPress = (ev) => {
    const query = ev.target.value;
    if (ev.key === 'Enter' && query) {
      onSearch(query);
    }
  };

  return (
    <nav>
      <Toolbar style={{ backgroundColor: '#FFFFFF' }}>
        <ToolbarGroup>
          <div style={{ height: '100%', width: '170px' }}>
            <Link to={loggedIn ? '/conversations' : '/'}>
              <img src={Logo} alt="Logo" style={{ maxHeight: '100%' }} />
            </Link>
          </div>
          { loggedIn &&
            <div style={menuItemContainer}>
              <input
                type={'text'}
                onKeyPress={handleSearchKeyPress}
                placeholder={'Search for product and stores (press Enter to search)'}
                style={{
                  margin: '10px',
                  padding: '5px',
                  width: '500px',
                  backgroundColor: '#F5F5F5',
                }}
              />
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
};

Header.propTypes = {
  loggedIn: PropTypes.bool,
  submitLogout: PropTypes.func,
  onSearch: PropTypes.func,
};

export default Header;
