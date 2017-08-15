import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import CurrencyInput from 'react-currency-input';

import {
  showInvoiceSelector,
  showInvoiceDiscounter,
  showInvoiceFinalizer,
  getInvoiceableOrders,
  toggleInvoiceSelectAllOrders,
  toggleInvoiceSelectOrder,
  abortInvoice,
  submitInvoice,
  setInvoiceRecipient,
  setInvoiceOrderItemPrice,
  setInvoiceOrderItemShippingPrice,
  setInvoiceDueDate,
} from './actions';
import {
  selectInvoice,
  selectUninvoicedOrders,
  selectInvoiceOrderSelectorOpen,
  selectInvoiceOrderDiscounterOpen,
  selectInvoiceFinalizerOpen,
  selectConversationId,
} from './selectors';
import { selectStore } from '../App/selectors';

class InvoiceWizard extends Component {
  componentWillMount() {
    let storeId = '';
    _.find(this.props.currStore.MsgChannels, (val, key) => {
      storeId = key;
      return val.ChannelId === this.props.channelId;
    });
    this.props.getInvoiceableOrders(storeId);
    this.props.setInvoiceRecipient(storeId);
  }

  renderSelector() {
    return (
      <Dialog
        open={this.props.isSelectorOpen}
        contentStyle={{ width: '1200px', maxWidth: 'none', maxHeight: 'none' }}
        actions={[
          <FlatButton onTouchTap={this.props.abortInvoice}>Cancel</FlatButton>,
          <FlatButton
            backgroundColor={'#A9CF54'} style={{ color: '#FFFFFF' }}
            disabled={this.props.invoice.Items.length === 0}
            onTouchTap={this.props.showDiscounter}
          >
            Next
          </FlatButton>,
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ marginBottom: '0' }}>Select Orders</h2>
          <div style={{ marginBottom: '20px' }}>Choose which orders to include on this invoice. Click next when you are done.</div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Checkbox
              style={{ flex: 1, width: '10px' }}
              onCheck={() => this.props.toggleSelectAll()}
              checked={this.props.invoice.Items.length === this.props.orders.length}
            />
            <div style={{ flex: 7 }}>
              Select All
            </div>
          </div>
          <Divider style={{ margin: '5px 0' }} />
          <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            {_.map(this.props.orders, (order) =>
              <div key={order.OrderId} style={{ display: 'flex', flexDirection: 'column', margin: '5px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Checkbox
                    style={{ flex: 1, width: '10px' }}
                    onCheck={() => this.props.toggleSelectOrder(order.OrderId)}
                    checked={_.find(this.props.invoice.Items, (id) => id === order.OrderId) !== undefined}
                  />
                  <div style={{ flex: 3 }}>
                    Order ID: {order.OrderId}
                  </div>
                  <div style={{ flex: 2 }}>
                    {moment(order.OrderCreatedDate).format('d MMM YYYY')}
                  </div>
                  <div style={{ flex: 1 }}>
                    {_.reduce(order.OrderItems, (memo, item) => memo + item.Quantity, 0)} Items
                  </div>
                  <div style={{ flex: 1 }}>
                    ${_.reduce(order.OrderItems, (memo, item) => memo + ((item.RuahPrice + item.ShippingPrice) * item.Quantity), 0).toFixed(2)} Total
                  </div>
                </div>
                <div style={{ backgroundColor: '#F5F5F5', margin: '5px 0' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1 }}>
                      &nbsp;
                    </div>
                    <div style={{ flex: 4 }}>
                      Item Ordered
                    </div>
                    <div style={{ flex: 1 }}>
                      Qty
                    </div>
                    <div style={{ flex: 1 }}>
                      Price per unit
                    </div>
                    <div style={{ flex: 1 }}>
                      Shipping per unit
                    </div>
                  </div>
                  <Divider />
                  {_.map(order.OrderItems, (item) =>
                    <div key={item.RuahId} style={{ display: 'flex', flexDirection: 'row' }}>
                      <div style={{ flex: 1 }}>
                        &nbsp;
                      </div>
                      <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
                        <div>{item.ProductName}</div>
                        <div style={{ fontSize: '12px' }}>{item.RuahId}</div>
                        <div style={{ fontSize: '12px' }}>{item.SKU}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        {item.Quantity}
                      </div>
                      <div style={{ flex: 1 }}>
                        ${item.RuahPrice.toFixed(2)}
                      </div>
                      <div style={{ flex: 1 }}>
                        ${item.ShippingPrice.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    );
  }

  renderDiscounter() {
    return (
      <Dialog
        open={this.props.isDiscounterOpen}
        contentStyle={{ width: '1200px', maxWidth: 'none', maxHeight: 'none' }}
        actions={[
          <FlatButton onTouchTap={this.props.abortInvoice}>Cancel</FlatButton>,
          <FlatButton onTouchTap={this.props.showSelector}>Back</FlatButton>,
          <FlatButton backgroundColor={'#A9CF54'} style={{ color: '#FFFFFF' }} onTouchTap={this.props.showFinalizer}>Next</FlatButton>,
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ marginBottom: '0' }}>Discounts</h2>
          <div style={{ marginBottom: '20px' }}>Optionally reduce prices and shipping on any of the items in these orders. Click next when you are done.</div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              Invoice Summary:
            </div>
            <div style={{ flex: 1 }}>
              Cost of Goods: ${_.reduce(this.props.invoice.Items, (memo, orderId) => {
                const order = _.find(this.props.orders, (o) => o.OrderId === orderId);
                return memo + _.reduce(order.OrderItems, (memo2, item) => memo2 + (item.RuahPrice * item.Quantity), 0);
              }, 0).toFixed(2)}
            </div>
            <div style={{ flex: 1 }}>
              Cost of Shipping: ${_.reduce(this.props.invoice.Items, (memo, orderId) => {
                const order = _.find(this.props.orders, (o) => o.OrderId === orderId);
                return memo + _.reduce(order.OrderItems, (memo2, item) => memo2 + (item.ShippingPrice * item.Quantity), 0);
              }, 0).toFixed(2)}
            </div>
            <div style={{ flex: 1 }}>
              Total: ${_.reduce(this.props.invoice.Items, (memo, orderId) => {
                const order = _.find(this.props.orders, (o) => o.OrderId === orderId);
                return memo + _.reduce(order.OrderItems, (memo2, item) => memo2 + ((item.RuahPrice + item.ShippingPrice) * item.Quantity), 0);
              }, 0).toFixed(2)}
            </div>
          </div>
          <Divider style={{ margin: '5px 0' }} />
          <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            {_.map(this.props.invoice.Items, (orderId) => {
              const order = _.find(this.props.orders, (o) => o.OrderId === orderId);
              return (<div key={order.OrderId} style={{ display: 'flex', flexDirection: 'column', margin: '5px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 3 }}>
                    Order ID: {order.OrderId}
                  </div>
                  <div style={{ flex: 2 }}>
                    {moment(order.OrderCreatedDate).format('d MMM YYYY')}
                  </div>
                  <div style={{ flex: 1 }}>
                    {_.reduce(order.OrderItems, (memo, item) => memo + item.Quantity, 0)} Items
                  </div>
                  <div style={{ flex: 1 }}>
                    ${_.reduce(order.OrderItems, (memo, item) => memo + ((item.RuahPrice + item.ShippingPrice) * item.Quantity), 0).toFixed(2)} Total
                  </div>
                </div>
                <div style={{ backgroundColor: '#F5F5F5', margin: '5px 0' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1 }}>
                      &nbsp;
                    </div>
                    <div style={{ flex: 4 }}>
                      Item Ordered
                    </div>
                    <div style={{ flex: 1 }}>
                      Qty
                    </div>
                    <div style={{ flex: 1 }}>
                      Price per unit
                    </div>
                    <div style={{ flex: 1 }}>
                      Shipping per unit
                    </div>
                  </div>
                  <Divider />
                  {_.map(order.OrderItems, (item) =>
                    <div key={item.RuahId} style={{ display: 'flex', flexDirection: 'row' }}>
                      <div style={{ flex: 1 }}>
                        &nbsp;
                      </div>
                      <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
                        <div>{item.ProductName}</div>
                        <div style={{ fontSize: '12px' }}>{item.RuahId}</div>
                        <div style={{ fontSize: '12px' }}>{item.SKU}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        {item.Quantity}
                      </div>
                      <div style={{ flex: 1 }}>
                        <CurrencyInput style={{ backgroundColor: '#FFFFFF', width: '100px' }} prefix={'$'} value={item.RuahPrice} onChangeEvent={(ev, mask, val) => this.props.setOrderItemPrice(orderId, item.RuahId, val)} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <CurrencyInput style={{ backgroundColor: '#FFFFFF', width: '100px' }} prefix={'$'} value={item.ShippingPrice} onChangeEvent={(ev, mask, val) => this.props.setOrderItemShipping(orderId, item.RuahId, val)} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              ); })}
          </div>
        </div>
      </Dialog>
    );
  }

  renderFinalizer() {
    return (
      <Dialog
        open={this.props.isFinalizerOpen}
        contentStyle={{ width: '1200px', maxWidth: 'none', maxHeight: 'none' }}
        actions={[
          <FlatButton onTouchTap={this.props.abortInvoice}>Cancel</FlatButton>,
          <FlatButton onTouchTap={this.props.showSelector}>Back</FlatButton>,
          <FlatButton backgroundColor={'#A9CF54'} style={{ color: '#FFFFFF' }} onTouchTap={this.props.submitInvoice}>Submit</FlatButton>,
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ marginBottom: '0' }}>Review & Submit</h2>
          <div style={{ marginBottom: '20px' }}>Review details of this invoice and set a date by which payment is due. Go back to previous steps if changes are necessary. Click submit when you are ready to send.</div>
          <Divider style={{ margin: '5px 0' }} />
          <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            {_.map(this.props.invoice.Items, (orderId) => {
              const order = _.find(this.props.orders, (o) => o.OrderId === orderId);
              return (<div key={order.OrderId} style={{ display: 'flex', flexDirection: 'column', margin: '5px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 3 }}>
                    Order ID: {order.OrderId}
                  </div>
                  <div style={{ flex: 1 }}>
                    {moment(order.OrderCreatedDate).format('d MMM YYYY')}
                  </div>
                  <div style={{ flex: 2 }}>
                    Cost of Goods: ${_.reduce(order.OrderItems, (memo, item) => memo + (item.RuahPrice * item.Quantity), 0).toFixed(2)}
                  </div>
                  <div style={{ flex: 2 }}>
                    Cost of Shipping: ${_.reduce(order.OrderItems, (memo, item) => memo + (item.ShippingPrice * item.Quantity), 0).toFixed(2)}
                  </div>
                </div>
              </div>
              ); })}
          </div>
          <Divider />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <strong style={{ flex: 1 }}>Total:</strong>
            <strong>${_.reduce(this.props.invoice.Items, (memo, orderId) => {
              const order = _.find(this.props.orders, (o) => o.OrderId === orderId);
              return memo + _.reduce(order.OrderItems, (memo2, item) => memo2 + ((item.RuahPrice + item.ShippingPrice) * item.Quantity), 0);
            }, 0).toFixed(2)}</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <strong style={{ padding: '11px 0' }}>Payment Due Date:&nbsp;</strong> <DatePicker mode="landscape" value={new Date(this.props.invoice.PayBy)} onChange={(ev, date) => this.props.setInvoiceDueDate(date)} />
          </div>
        </div>
      </Dialog>
    );
  }

  render() {
    return (
      <div>
        {this.renderSelector()}
        {this.renderDiscounter()}
        {this.renderFinalizer()}
      </div>
    );
  }
}

InvoiceWizard.propTypes = {
  currStore: PropTypes.object,
  channelId: PropTypes.string,
  showSelector: PropTypes.func,
  isSelectorOpen: PropTypes.bool,
  showDiscounter: PropTypes.func,
  isDiscounterOpen: PropTypes.bool,
  showFinalizer: PropTypes.func,
  isFinalizerOpen: PropTypes.bool,
  getInvoiceableOrders: PropTypes.func,
  orders: PropTypes.array,
  toggleSelectAll: PropTypes.func,
  toggleSelectOrder: PropTypes.func,
  invoice: PropTypes.object,
  abortInvoice: PropTypes.func,
  submitInvoice: PropTypes.func,
  setInvoiceRecipient: PropTypes.func,
  setOrderItemPrice: PropTypes.func,
  setOrderItemShipping: PropTypes.func,
  setInvoiceDueDate: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    showSelector: () => {
      dispatch(showInvoiceSelector());
    },
    showDiscounter: () => {
      dispatch(showInvoiceDiscounter());
    },
    showFinalizer: () => {
      dispatch(showInvoiceFinalizer());
    },
    getInvoiceableOrders: (storeId) => {
      dispatch(getInvoiceableOrders(storeId));
    },
    toggleSelectAll: () => {
      dispatch(toggleInvoiceSelectAllOrders());
    },
    toggleSelectOrder: (orderId) => {
      dispatch(toggleInvoiceSelectOrder(orderId));
    },
    abortInvoice: () => {
      dispatch(abortInvoice());
    },
    submitInvoice: () => {
      dispatch(submitInvoice());
    },
    setInvoiceRecipient: (storeId) => {
      dispatch(setInvoiceRecipient(storeId));
    },
    setOrderItemPrice: (orderId, ruahId, price) => {
      dispatch(setInvoiceOrderItemPrice(orderId, ruahId, price));
    },
    setOrderItemShipping: (orderId, ruahId, price) => {
      dispatch(setInvoiceOrderItemShippingPrice(orderId, ruahId, price));
    },
    setInvoiceDueDate: (date) => {
      dispatch(setInvoiceDueDate(date));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  channelId: selectConversationId(),
  currStore: selectStore(),
  isSelectorOpen: selectInvoiceOrderSelectorOpen(),
  isDiscounterOpen: selectInvoiceOrderDiscounterOpen(),
  isFinalizerOpen: selectInvoiceFinalizerOpen(),
  orders: selectUninvoicedOrders(),
  invoice: selectInvoice(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceWizard);
