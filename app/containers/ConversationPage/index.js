import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import {
  getConversation,
  updateMessageText,
  updateMessageRecipient,
  updateMessageAuthor,
  sendMessage,
  updateMessageFiles,
  updateMessageChannelId,
} from './actions';
import {
  selectLoading,
  selectStores,
  selectConversation,
  selectMessage,
} from './selectors';
import { selectStore } from '../App/selectors';
import Body from '../../components/styled/Body';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import AttachIcon from 'material-ui/svg-icons/editor/attach-file';
import AddShopCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';

class ConversationPage extends Component {
  constructor(props) {
    super(props);
    this.props.getConversation(this.props.router.params.channelId);
    this.props.updateMessageChannelId(this.props.router.params.channelId);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleFileOpen = this.handleFileOpen.bind(this);
    this.handleFileAttach = this.handleFileAttach.bind(this);
  }

  componentDidUpdate() {
    if (this.MostRecentMessage) {
      this.MostRecentMessage.scrollIntoView();
    }
  }

  handleMessageChange(ev, newVal) {
    this.props.updateMessageText(newVal);
    let storeId = '';
    _.find(this.props.currStore.MsgChannels, (val, key) => {
      if (val.ChannelId === this.props.router.params.channelId) {
        storeId = key;
        return true;
      }
      return false;
    });
    this.props.updateMessageRecipient(storeId);
    this.props.updateMessageAuthor(this.props.currStore.StoreId);
  }

  handleOrderBuilder(ev) {
    ev.doALittleDance();
  }

  handleKeyPress(ev) {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      this.props.sendMessage();
    }
  }

  handleFileOpen() {
    this.FileInput.click();
  }

  handleFileAttach(ev) {
    this.props.updateMessageFiles(ev.target.files);
  }

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderStoreProfile() {
    if (this.props.loading || !this.props.currStore || !this.props.stores) {
      return (<div />);
    }
    let storeId = '';
    _.find(this.props.currStore.MsgChannels, (val, key) => {
      if (val.ChannelId === this.props.router.params.channelId) {
        storeId = key;
        return true;
      }
      return false;
    });
    const store = this.props.stores[storeId];
    if (!store) {
      return (<div />);
    }
    return (
      <Paper style={{ display: 'flex', flexDirection: 'column', margin: '5px', width: '200px' }}>
        <img src={store.ProfilePicUri} alt={store.Name} style={{ width: '200px', height: '200px' }} />
        <div><strong>{store.Name}</strong></div>
        <div>{store.StoreId}</div>
        <div><LocationIcon /> {store.Locality}, {store.Sovereignty}</div>
        <Link to={`/marketplace/store/${store.StoreId}`}>View Profile</Link>
      </Paper>
    );
  }

  render() {
    return (
      <article>
        <Helmet
          title="Conversations"
          meta={[
            { name: 'description', content: 'Conversations in Ruah' },
          ]}
        />
        <Body>
          {this.renderStoreProfile()}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '1080px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
              <RaisedButton
                backgroundColor={'#04BFBF'}
                style={{ marginRight: '10px', color: '#FFFFFF' }}
              >
                &nbsp;Everything&nbsp;
              </RaisedButton>
            </div>
            {this.props.loading && this.renderLoading()}
            <div style={{ overflowY: 'scroll', flex: 1, maxHeight: '700px' }}>
              {!this.props.loading && _.map(this.props.messages, (item, ix) =>
                <Paper
                  key={item.Timestamp}
                  style={{ display: 'flex', flexDirection: 'row', width: '750px', margin: '10px' }}
                >
                  <img
                    src={this.props.stores[item.Author] && this.props.stores[item.Author].ProfilePicUri}
                    alt={this.props.stores[item.Author] && this.props.stores[item.Author].Name}
                    style={{ width: '100px', height: '100px', padding: '5px' }}
                  />
                  <div
                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                    ref={(el) => { if (ix === this.props.messages.length - 1) this.MostRecentMessage = el; }}
                  >
                    <div>
                      <strong>{this.props.stores[item.Author] && this.props.stores[item.Author].Name}</strong> <span>{item.Author}</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                      <div style={{ flex: 1 }}>
                        &nbsp;{item.Content}
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span style={{ flex: 1 }} />
                        <span>{moment(item.Timestamp).fromNow()}</span>
                      </div>
                    </div>
                    {item.Attachments.length > 0 && _.map(item.Attachments, (attch, jx) =>
                      <div key={jx} style={{ backgroundColor: '#F5F5F5', margin: '5px', padding: '5px' }}>
                        <Link to={attch.ResourceUri}>{attch.Title}</Link>
                      </div>
                    )}
                  </div>
                </Paper>
              )}
            </div>
            <Paper style={{ display: 'flex', flexDirection: 'column', width: '770px', margin: '10px', padding: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <IconButton
                  onTouchTap={this.handleOrderBuilder}
                  tooltip={'Place an Order'}
                  tooltipPosition={'top-center'}
                >
                  <AddShopCartIcon />
                </IconButton>
                <IconButton
                  tooltip={'Attach Files'}
                  tooltipPosition={'top-center'}
                  onTouchTap={this.handleFileOpen}
                >
                  <AttachIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <TextField
                  hintText={'Type a message...'}
                  value={this.props.message.Content}
                  onChange={this.handleMessageChange}
                  onKeyPress={this.handleKeyPress}
                  fullWidth
                  multiLine
                />
                <IconButton
                  disabled={!this.props.message.Content}
                  onTouchTap={this.props.sendMessage}
                >
                  <SendIcon />
                </IconButton>
              </div>
              {_.map(this.props.message.Attachments, (attachment, ix) =>
                <div style={{ backgroundColor: '#F5F5F5', padding: '5px' }} key={ix}>
                  <strong>{attachment.Title}</strong>
                </div>
              )}
              <input type={'file'} style={{ display: 'none' }} ref={(el) => { this.FileInput = el; }} onChange={this.handleFileAttach} />
            </Paper>
          </div>
        </Body>
      </article>
    );
  }
}

ConversationPage.propTypes = {
  loading: PropTypes.bool,
  messages: PropTypes.array,
  message: PropTypes.object,
  stores: PropTypes.object,
  currStore: PropTypes.object,
  router: PropTypes.object,
  getConversation: PropTypes.func,
  updateMessageChannelId: PropTypes.func,
  updateMessageText: PropTypes.func,
  updateMessageRecipient: PropTypes.func,
  updateMessageAuthor: PropTypes.func,
  updateMessageFiles: PropTypes.func,
  sendMessage: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getConversation: (id) => {
      dispatch(getConversation(id));
    },
    updateMessageChannelId: (id) => {
      dispatch(updateMessageChannelId(id));
    },
    updateMessageText: (message) => {
      dispatch(updateMessageText(message));
    },
    updateMessageRecipient: (recipient) => {
      dispatch(updateMessageRecipient(recipient));
    },
    updateMessageAuthor: (author) => {
      dispatch(updateMessageAuthor(author));
    },
    updateMessageFiles: (files) => {
      dispatch(updateMessageFiles(files));
    },
    sendMessage: () => {
      dispatch(sendMessage());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  stores: selectStores(),
  messages: selectConversation(),
  message: selectMessage(),
  currStore: selectStore(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ConversationPage);
