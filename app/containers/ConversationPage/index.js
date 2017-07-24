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
  openOrderBuilder,
  getProduct,
  addOrderItem,
  abortOrder,
  showShippingForm,
  setOrderShipping,
  incrementItemQuantity,
  decrementItemQuantity,
} from './actions';
import {
  selectLoading,
  selectStores,
  selectConversation,
  selectMessage,
  selectOrderBuilderOpen,
  selectProducts,
  selectOrder,
  selectShippingFormOpen,
} from './selectors';
import { selectStore } from '../App/selectors';
import Body from '../../components/styled/Body';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import AttachIcon from 'material-ui/svg-icons/editor/attach-file';
import AddShopCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import ProductCard from '../Catalog/ProductCard';

const PRODUCT_ROW_WIDTH = 3;

class ConversationPage extends Component {
  constructor(props) {
    super(props);
    this.props.getConversation(this.props.router.params.channelId);
    this.props.updateMessageChannelId(this.props.router.params.channelId);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleFileOpen = this.handleFileOpen.bind(this);
    this.handleFileAttach = this.handleFileAttach.bind(this);
    this.handleOrderBuilder = this.handleOrderBuilder.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
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

  handleOrderBuilder() {
    let storeId = '';
    _.find(this.props.currStore.MsgChannels, (val, key) => {
      if (val.ChannelId === this.props.router.params.channelId) {
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

  handleSearchKeyPress(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      let storeId = '';
      _.find(this.props.currStore.MsgChannels, (val, key) => {
        if (val.ChannelId === this.props.router.params.channelId) {
          storeId = key;
          return true;
        }
        return false;
      });
      this.props.getProduct(ev.target.value, storeId);
    }
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

  renderRows = () => {
    const rows = [];
    for (let i = 0; i < this.props.products.length / PRODUCT_ROW_WIDTH; i += 1) {
      rows.push(this.renderRow(i));
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows}
      </div>
    );
  };

  renderRow = (i) => {
    const cards = [];
    for (let j = 0; j < PRODUCT_ROW_WIDTH; j += 1) {
      if ((i * PRODUCT_ROW_WIDTH) + j < this.props.products.length) {
        const product = this.props.products[(i * PRODUCT_ROW_WIDTH) + j];
        cards.push(<ProductCard key={j} isBuyer onAddToCart={() => this.props.addOrderItem(product)} product={product} />);
      }
    }
    return (
      <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
        {cards}
      </div>
    );
  }

  renderOrderBuilder() {
    return (
      <Dialog
        open={this.props.isOrderBuilderOpen}
        contentStyle={{ width: '820px', maxWidth: 'none', maxHeight: 'none', display: 'flex', flexDirection: 'column' }}
        actions={[
          <FlatButton onTouchTap={this.props.abortOrder}>Cancel</FlatButton>,
          <FlatButton backgroundColor={'#A9CF54'} style={{ color: '#FFFFFF' }} onTouchTap={this.props.showShippingForm}>Next</FlatButton>,
        ]}
      >
        <TextField
          hintText={'Search by SKU, Ruah ID, or keyword'}
          onChange={this.handleSearchChange}
          onKeyPress={this.handleSearchKeyPress}
          fullWidth
        />
        <div>
          <strong>{this.props.products.length} Results</strong>
        </div>
        <div style={{ height: '450px', overflowY: 'scroll' }}>
          {this.renderRows()}
        </div>
        <Divider />
        <div><strong>Cart:</strong></div>
        <div style={{ maxHeight: '200px', display: 'flex', flexDirection: 'column', overflowY: 'scroll' }}>
          {!this.props.order.OrderItems && 'Cart is empty.'}
          {_.map(this.props.order.OrderItems, (val, key) =>
            <div key={key} style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 5, display: 'flex', flexDirection: 'column' }}>
                <div>{val.ProductName}</div>
                <div style={{ fontSize: '12px' }}>{val.RuahId}</div>
                <div style={{ fontSize: '12px' }}>{val.SKU}</div>
              </div>
              <div style={{ flex: 1 }}>
                {val.Quantity}&nbsp;
                <button onTouchTap={() => this.props.decrementItemQuantity(val.RuahId)} style={{ cursor: 'pointer', backgroundColor: '#F5F5F5' }}>-</button>
                <button onTouchTap={() => this.props.incrementItemQuantity(val.RuahId)} style={{ cursor: 'pointer', backgroundColor: '#F5F5F5' }}>+</button>
              </div>
              <div style={{ flex: 1 }}>
                ${(val.Quantity * val.RetailPrice).toFixed(2)}
              </div>
              <div style={{ flex: 1 }}>
                ${(val.Quantity * val.ShippingPrice).toFixed(2)}
              </div>
            </div>
          )}
        </div>
        {this.props.order.OrderItems &&
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 6 }}>
              <strong>Total:</strong>
            </div>
            <div style={{ flex: 1 }}>
              <strong>${_.reduce(this.props.order.OrderItems, (memo, item) => memo + (item.Quantity * (item.RetailPrice + item.ShippingPrice)), 0).toFixed(2)}</strong>
            </div>
          </div>
        }
      </Dialog>
    );
  }

  renderShippingForm() {
    const fields = {};
    const onDone = () => {
      // TODO: validate this form
      this.props.setOrderShipping(fields);
    };
    return (
      <Dialog
        open={this.props.isShippingFormOpen}
        contentStyle={{ display: 'flex', flexDirection: 'column' }}
        actions={[
          <FlatButton onTouchTap={this.props.abortOrder}>Cancel</FlatButton>,
          <FlatButton backgroundColor={'#A9CF54'} style={{ color: '#FFFFFF' }} onTouchTap={onDone}>Done</FlatButton>,
        ]}
      >
        <TextField
          hintText="Ship to name"
          onChange={(ev, newVal) => { fields.BuyerName = newVal; }}
        />
        <TextField
          hintText="Ship to email"
          onChange={(ev, newVal) => { fields.BuyerEmail = newVal; }}
        />
        <TextField
          hintText="Ship to phone"
          onChange={(ev, newVal) => { fields.BuyerPhone = newVal; }}
        />
        <TextField
          hintText="Address 1"
          onChange={(ev, newVal) => { fields.ShipAddress = newVal; }}
        />
        <TextField
          hintText="Address 2"
          onChange={(ev, newVal) => { fields.ShipAddress2 = newVal; }}
        />
        <TextField
          hintText="City"
          onChange={(ev, newVal) => { fields.ShipCity = newVal; }}
        />
        <TextField
          hintText="State"
          onChange={(ev, newVal) => { fields.ShipState = newVal; }}
        />
        <TextField
          hintText="Zip"
          onChange={(ev, newVal) => { fields.ShipZip = newVal; }}
        />
      </Dialog>
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
                    {item.Attachments && item.Attachments.length > 0 && _.map(item.Attachments, (attch, jx) =>
                      <div key={jx} style={{ backgroundColor: '#F5F5F5', margin: '5px', padding: '5px' }}>
                        <a href={attch.ResourceUri}>{attch.Title}</a>
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
                          ${(val.Quantity * val.RetailPrice).toFixed(2)}
                        </div>
                        <div style={{ flex: 1 }}>
                          ${(val.Quantity * val.ShippingPrice).toFixed(2)}
                        </div>
                      </div>
                  )}
                </div>
              }
              <input type={'file'} style={{ display: 'none' }} ref={(el) => { this.FileInput = el; }} onChange={this.handleFileAttach} />
              {this.renderOrderBuilder()}
              {this.renderShippingForm()}
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
  openOrderBuilder: PropTypes.func,
  updateMessageChannelId: PropTypes.func,
  updateMessageText: PropTypes.func,
  updateMessageRecipient: PropTypes.func,
  updateMessageAuthor: PropTypes.func,
  updateMessageFiles: PropTypes.func,
  sendMessage: PropTypes.func,
  isOrderBuilderOpen: PropTypes.bool,
  getProduct: PropTypes.func,
  products: PropTypes.array,
  addOrderItem: PropTypes.func,
  order: PropTypes.object,
  abortOrder: PropTypes.func,
  showShippingForm: PropTypes.func,
  setOrderShipping: PropTypes.func,
  incrementItemQuantity: PropTypes.func,
  decrementItemQuantity: PropTypes.func,
  isShippingFormOpen: PropTypes.bool,
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
    openOrderBuilder: () => {
      dispatch(openOrderBuilder());
    },
    sendMessage: () => {
      dispatch(sendMessage());
    },
    getProduct: (query, storeId) => {
      dispatch(getProduct(query, storeId));
    },
    addOrderItem: (product) => {
      dispatch(addOrderItem(product));
    },
    abortOrder: () => {
      dispatch(abortOrder());
    },
    showShippingForm: () => {
      dispatch(showShippingForm());
    },
    setOrderShipping: (orderShipping) => {
      dispatch(setOrderShipping(orderShipping));
    },
    incrementItemQuantity: (ruahId) => {
      dispatch(incrementItemQuantity(ruahId));
    },
    decrementItemQuantity: (ruahId) => {
      dispatch(decrementItemQuantity(ruahId));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  stores: selectStores(),
  messages: selectConversation(),
  message: selectMessage(),
  currStore: selectStore(),
  isOrderBuilderOpen: selectOrderBuilderOpen(),
  products: selectProducts(),
  order: selectOrder(),
  isShippingFormOpen: selectShippingFormOpen(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ConversationPage);
