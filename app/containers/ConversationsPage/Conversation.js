import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import AttachIcon from 'material-ui/svg-icons/editor/attach-file';
import AddShopCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import InvoiceIcon from 'material-ui/svg-icons/action/receipt';
import {
  updateMessageText,
  updateMessageRecipient,
  updateMessageAuthor,
  sendMessage,
  updateMessageFiles,
  updateMessageChannelId,
  openOrderBuilder,
  getProduct,
  showInvoiceSelector,
} from './actions';
import {
  selectConversationId,
  selectConversation, selectLoading,
  selectMessage,
  selectOrder,
} from './selectors';
import { selectStore } from '../App/selectors';
import OrderWizard from './OrderWizard';
import InvoiceWizard from './InvoiceWizard';

class ConversationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleFileOpen = this.handleFileOpen.bind(this);
    this.handleFileAttach = this.handleFileAttach.bind(this);
    this.handleOrderBuilder = this.handleOrderBuilder.bind(this);
  }

  componentWillMount() {
    this.handleMessageChange(null, '');
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
      if (val.ChannelId === this.props.channelId) {
        storeId = key;
        return true;
      }
      return false;
    });
    this.props.updateMessageRecipient(storeId);
    this.props.updateMessageAuthor(this.props.currStore.StoreId);
  }

  handleOrderBuilder() {
    let storeId = '';
    _.find(this.props.currStore.MsgChannels, (val, key) => {
      if (val.ChannelId === this.props.channelId) {
        storeId = key;
        return true;
      }
      return false;
    });
    this.props.getProduct(null, storeId);
    this.props.openOrderBuilder();
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

  render() {
    return (
      <div style={{ height: '600px' }}>
        <div style={{ maxHeight: '510px', height: '510px', overflowY: 'scroll' }} >
          {!this.props.loading && _.map(this.props.messages, (item, ix) =>
            <Paper
              key={item.Timestamp}
              style={{ display: 'flex', flexDirection: 'row', margin: '10px', padding: '5px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ flex: 1 }} />
                <Avatar
                  src={this.props.stores[item.Author] && this.props.stores[item.Author].ProfilePicUri}
                  size={50}
                />
                <span style={{ flex: 1 }} />
              </div>
              <div
                style={{ flex: 1, display: 'flex', padding: '0 10px', flexDirection: 'column' }}
                ref={(el) => { if (ix === this.props.messages.length - 1) this.MostRecentMessage = el; }}
              >
                <div>
                  <strong>{this.props.stores[item.Author] && this.props.stores[item.Author].Name}</strong> <span>{item.Author}</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 1, whiteSpace: 'pre-wrap' }}>
                    {item.Content}
                  </div>
                  <div style={{ display: 'flex' }}>
                    <span style={{ flex: 1 }} />
                    <span>{moment(item.Timestamp).fromNow()}</span>
                  </div>
                </div>
                {item.Attachments && item.Attachments.length > 0 && _.map(item.Attachments, (attch, jx) =>
                  <div key={jx} style={{ backgroundColor: '#F5F5F5', padding: '5px' }}>
                    <a href={attch.ResourceUri} target={'blank'}>{attch.Title}</a>
                  </div>
                )}
              </div>
            </Paper>
          )}
        </div>
        <Paper style={{ display: 'flex', flexDirection: 'column', margin: '10px', padding: '10px' }}>
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
            <IconButton
              tooltip={'Send an Invoice'}
              tooltipPosition={'top-center'}
              onTouchTap={this.props.setInvoiceWizardOpen}
            >
              <InvoiceIcon />
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
          {this.props.message.Attachments && _.map(this.props.message.Attachments, (attachment, ix) =>
            <div style={{ backgroundColor: '#F5F5F5', padding: '5px' }} key={ix}>
              <strong>{attachment.Title}</strong>
            </div>
          )}
          {this.props.order.OrderItems &&
            <div style={{ backgroundColor: '#F5F5F5' }}>
              {_.map(this.props.order.OrderItems, (val, key) =>
                <div key={key} style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 5, display: 'flex', flexDirection: 'column' }}>
                    <div>{val.ProductName}</div>
                    <div style={{ fontSize: '12px' }}>{val.RuahId}</div>
                    <div style={{ fontSize: '12px' }}>{val.SKU}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {val.Quantity}&nbsp;
                  </div>
                  <div style={{ flex: 1 }}>
                    ${(val.Quantity * val.RuahPrice).toFixed(2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    ${(val.Quantity * val.ShippingPrice).toFixed(2)}
                  </div>
                </div>
            )}
            </div>
          }
          <input type={'file'} style={{ display: 'none' }} ref={(el) => { this.FileInput = el; }} onChange={this.handleFileAttach} />
          <OrderWizard />
          <InvoiceWizard />
        </Paper>
      </div>
    );
  }
}

ConversationComponent.propTypes = {
  channelId: React.PropTypes.string,
  loading: React.PropTypes.bool,
  messages: React.PropTypes.array,
  message: React.PropTypes.object,
  stores: React.PropTypes.object,
  currStore: React.PropTypes.object,
  openOrderBuilder: React.PropTypes.func,
  getProduct: React.PropTypes.func,
  updateMessageText: React.PropTypes.func,
  updateMessageRecipient: React.PropTypes.func,
  updateMessageAuthor: React.PropTypes.func,
  updateMessageFiles: React.PropTypes.func,
  sendMessage: React.PropTypes.func,
  order: React.PropTypes.object,
  setInvoiceWizardOpen: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
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
    openOrderBuilder: () => {
      dispatch(openOrderBuilder());
    },
    sendMessage: () => {
      dispatch(sendMessage());
    },
    getProduct: (query, storeId) => {
      dispatch(getProduct(query, storeId));
    },
    setInvoiceWizardOpen: () => {
      dispatch(showInvoiceSelector());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  channelId: selectConversationId(),
  messages: selectConversation(),
  message: selectMessage(),
  currStore: selectStore(),
  order: selectOrder(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ConversationComponent);
