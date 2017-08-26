import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Logo from './logo.png';
import { menuItemContainer } from './styles';
import { selectInviteModalComponentState } from '../../../containers/App/selectors';
import { submitInvite, toggleInvitationModalOpen } from '../../../containers/App/actions';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    setInterval(this.tick, 10000);
  }
  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }
  tick() {
    this.count += 1;
    if (!this.CallToActionEl) { return; }
    this.CallToActionEl.textContent = this.callsToAction[this.count % 4];
  }
  count = 0;
  callsToAction = ['Grow the Network', 'Invite Your Accounts', 'Spread the Word', 'Build the Community'];

  handleSearchKeyPress = (ev) => {
    const query = ev.target.value;
    if (ev.key === 'Enter' && query) {
      this.props.onSearch(query);
    }
  };

  render() {
    return (
      <nav>
        <Toolbar style={{ backgroundColor: '#FFFFFF' }}>
          <ToolbarGroup>
            <div style={{ height: '100%', width: '170px' }}>
              <Link to={this.props.loggedIn ? '/conversations' : '/'}>
                <img src={Logo} alt="Logo" style={{ maxHeight: '100%' }} />
              </Link>
            </div>
            { this.props.loggedIn &&
              <div style={menuItemContainer}>
                <input
                  type={'text'}
                  onKeyPress={this.handleSearchKeyPress}
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
            {this.props.loggedIn && <div>
              <FlatButton
                style={{ backgroundColor: '#1BBCBE', color: '#FFFFFF' }}
                onTouchTap={() => this.props.toggleInvitationModalOpen(true)}
              >
                &nbsp;<span ref={(el) => { this.CallToActionEl = el; }}>Grow the Network</span>&nbsp;
              </FlatButton>
              &nbsp;
              <FlatButton label="Logout" onClick={this.props.submitLogout} />
            </div>}
          </ToolbarGroup>
        </Toolbar>
        <Dialog
          open={this.props.inviteModalComponentState.isOpen}
          onRequestClose={() => this.props.toggleInvitationModalOpen(false)}
          actions={[
            <FlatButton
              style={{ backgroundColor: '#1BBCBE', color: '#FFFFFF' }}
              onTouchTap={() => {
                if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.inviteInput.value)) {
                  this.props.submitInvite(this.inviteInput.value);
                } else {
                  this.inviteInputError.textContent = 'Invalid email';
                }
              }}
            >
              Submit
            </FlatButton>,
          ]}
        >
          {this.props.inviteModalComponentState.loading &&
            <CircularProgress />
          }
          {!this.props.inviteModalComponentState.loading &&
            <div>
              <div>
                Ruah gets better when you invite more suppliers and buyers to participate. Enter an email address below and submit to invite a friend to the network.
              </div>
              <div>
                <strong>All transactions with accounts that you invite to the network are exempt from all Ruah fees.</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor={'email'} style={{ fontSize: '12px' }}>
                  Inivitee Email
                </label>
                <input
                  ref={(el) => { this.inviteInput = el; }}
                  onChange={() => { this.inviteInputError.textContent = ''; }}
                  name={'email'}
                  type={'email'}
                  placeholder={'Ex: someone@example.com'}
                  style={{ color: '#3D3D3D', width: '400px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
                />
                <span style={{ color: '#CA4C4C', fontSize: '12px' }} ref={(el) => { this.inviteInputError = el; }} />
              </div>
            </div>
          }
        </Dialog>
      </nav>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  submitLogout: PropTypes.func,
  onSearch: PropTypes.func,
  inviteModalComponentState: PropTypes.object,
  toggleInvitationModalOpen: PropTypes.func,
  submitInvite: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    submitInvite: (email) => {
      dispatch(submitInvite(email));
    },
    toggleInvitationModalOpen: (isOpen) => {
      dispatch(toggleInvitationModalOpen(isOpen));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  inviteModalComponentState: selectInviteModalComponentState(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
