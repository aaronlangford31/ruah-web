import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { createStructuredSelector } from 'reselect';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CurrencyInput from 'react-currency-input';
import ProductCard from '../Catalog/ProductCard';

import {
  getProduct,
  addOrderItem,
  abortOrder,
  showShippingForm,
  setOrderShipping,
  incrementItemQuantity,
  decrementItemQuantity,
  setRetailPrice,
  setRetailShippingPrice,
  goToProductBrowser,
  removeOrderItem,
} from './actions';
import {
  selectStores,
  selectOrderBuilderOpen,
  selectProducts,
  selectOrder,
  selectShippingFormOpen,
  selectConversationId,
} from './selectors';
import { selectStore } from '../App/selectors';

const PRODUCT_ROW_WIDTH = 3;

class OrderWizard extends Component {
  constructor(props) {
    super(props);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
  }

  onRetailPriceChange(ev, mask, floatVal, key) {
    this.props.setRetailPrice(floatVal, key);
  }

  onRetailShippingPriceChange(ev, mask, floatVal, key) {
    this.props.setRetailShippingPrice(floatVal, key);
  }

  handleSearchKeyPress(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      let storeId = '';
      _.find(this.props.currStore.MsgChannels, (val, key) => {
        if (val.ChannelId === this.props.channelId) {
          storeId = key;
          return true;
        }
        return false;
      });
      this.props.getProduct(ev.target.value, storeId);
    }
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

  renderProductBrowser() {
    return (
      <Dialog
        open={this.props.isOrderBuilderOpen}
        contentStyle={{ width: '1200px', maxWidth: 'none', maxHeight: 'none' }}
        actions={[
          <FlatButton onTouchTap={this.props.abortOrder}>Cancel</FlatButton>,
          <FlatButton backgroundColor={'#A9CF54'} style={{ color: '#FFFFFF' }} onTouchTap={this.props.showShippingForm}>Next</FlatButton>,
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'row', flex: 3 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              hintText={'Search by SKU, Ruah ID, or keyword'}
              onChange={this.handleSearchChange}
              onKeyPress={this.handleSearchKeyPress}
              fullWidth
            />
            <div>
              <strong>{this.props.products.length} Results</strong>
            </div>
            <div style={{ height: '500px', overflowY: 'scroll' }}>
              {this.renderRows()}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', flex: 2 }}>
            <div><strong>Cart:</strong></div>
            <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '500px', overflowY: 'scroll' }}>
              {!this.props.order.OrderItems && 'Cart is empty.'}
              {_.map(this.props.order.OrderItems, (val, key) =>
                <div key={key} style={{ display: 'flex', flexDirection: 'row', minHeight: '75px' }}>
                  <div style={{ flex: 5, display: 'flex', flexDirection: 'column' }}>
                    <div>{val.ProductName.substring(0, 38).trim()}{val.ProductName.length > 35 && '...'}</div>
                    <div style={{ fontSize: '12px' }}>{val.RuahId}</div>
                    <div style={{ fontSize: '12px' }}>{val.SKU}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {val.Quantity}&nbsp;
                    <button onTouchTap={() => this.props.decrementItemQuantity(val.RuahId)} style={{ cursor: 'pointer', backgroundColor: '#F5F5F5' }}>-</button>
                    <button onTouchTap={() => this.props.incrementItemQuantity(val.RuahId)} style={{ cursor: 'pointer', backgroundColor: '#F5F5F5' }}>+</button>
                  </div>
                  <div>
                    <button onTouchTap={() => this.props.removeOrderItem(val.RuahId)} style={{ cursor: 'pointer', backgroundColor: '#F5F5F5' }}>x</button>
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
                  <strong>${_.reduce(this.props.order.OrderItems, (memo, item) => memo + (item.Quantity * (item.RuahPrice + item.ShippingPrice)), 0).toFixed(2)}</strong>
                </div>
              </div>
            }
          </div>
        </div>
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
          <FlatButton onTouchTap={this.props.goToProductBrowser}>Go Back</FlatButton>,
          <FlatButton backgroundColor={'#A9CF54'} style={{ color: '#FFFFFF' }} onTouchTap={onDone}>Done</FlatButton>,
        ]}
      >
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', height: '30px', margin: 'auto' }}>
            <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
              Item
            </div>
            <div style={{ flex: 1 }}>
              Qty
            </div>
            <div style={{ flex: 2 }}>
              Retail Price*
            </div>
            <div style={{ flex: 2 }}>
              Retail Shipping*
            </div>
          </div>
          <div style={{ maxHeight: '250px', overflowY: 'scroll' }}>
            {_.map(this.props.order.OrderItems, (val, key) =>
              <div key={key} style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
                  <div>{val.ProductName}</div>
                  <div style={{ fontSize: '12px' }}>{val.RuahId}</div>
                  <div style={{ fontSize: '12px' }}>{val.SKU}</div>
                </div>
                <div style={{ flex: 1 }}>
                  {val.Quantity}
                </div>
                <div style={{ flex: 2, display: 'flex', flexDirection: 'row' }}>
                  $<CurrencyInput
                    value={val.RetailPrice}
                    onChangeEvent={(ev, mask, floatVal) => this.onRetailPriceChange(ev, mask, floatVal, key)}
                    style={{ height: '25px', width: '100px', backgroundColor: '#F5F5F5', padding: '0 5px' }}
                  />
                </div>
                <div style={{ flex: 2, display: 'flex', flexDirection: 'row' }}>
                  $<CurrencyInput
                    value={val.RetailShippingPrice}
                    onChangeEvent={(ev, mask, floatVal) => this.onRetailShippingPriceChange(ev, mask, floatVal, key)}
                    style={{ height: '25px', width: '100px', backgroundColor: '#F5F5F5', padding: '0 5px' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <br />
        <div style={{ fontSize: '12px' }}>*These fields will tell the seller what price to put on the {"shipment's"} packing slip.</div>
        <br />
        <Divider />
        <br />
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
      <div>
        {this.renderProductBrowser()}
        {this.renderShippingForm()}
      </div>
    );
  }
}

OrderWizard.propTypes = {
  currStore: PropTypes.object,
  channelId: PropTypes.string,
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
  setRetailPrice: PropTypes.func,
  setRetailShippingPrice: PropTypes.func,
  goToProductBrowser: PropTypes.func,
  removeOrderItem: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
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
    setRetailPrice: (price, ruahId) => {
      dispatch(setRetailPrice(price, ruahId));
    },
    setRetailShippingPrice: (price, ruahId) => {
      dispatch(setRetailShippingPrice(price, ruahId));
    },
    goToProductBrowser: () => {
      dispatch(goToProductBrowser());
    },
    removeOrderItem: (ruahId) => {
      dispatch(removeOrderItem(ruahId));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  stores: selectStores(),
  channelId: selectConversationId(),
  currStore: selectStore(),
  isOrderBuilderOpen: selectOrderBuilderOpen(),
  products: selectProducts(),
  order: selectOrder(),
  isShippingFormOpen: selectShippingFormOpen(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(OrderWizard);
