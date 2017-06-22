import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import {
  selectCartItems,
  selectOrder,
  selectLoading,
  selectSubmitOrderSuccess,
} from './selectors';
import {
  submitOrder,
  removeItemFromCart,
  updateItemQuantity,
  updateShippingForm,
} from './actions';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import HappyFaceIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied';

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.handleQuantityInputChange = this.handleQuantityInputChange.bind(this);
  }

  handleQuantityInputChange(ev) {
    this.props.onChangeQuantity(ev.target.name, parseInt(ev.target.value, 10));
  }

  renderCheckoutSuccess() {
    return (
      <Paper style={{ margin: '10px', textAlign: 'center', padding: '10px' }}>
        <HappyFaceIcon style={{ height: '50px', width: '50px', color: '#A9CF54' }} />
        <h2>Congratulations!</h2>
        <p>Your order has been placed.</p>
      </Paper>
    );
  }

  renderItem(item, ix) {
    return (
      <div key={ix} style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 8 }}>
          <div>{item.ProductName}</div>
          <div>{item.RuahId}</div>
        </div>
        <input
          name={ix}
          style={{ flex: 1, width: '10px', margin: '5px' }}
          type={'number'}
          value={item.Quantity}
          onChange={this.handleQuantityInputChange}
        />
        <div style={{ flex: 1 }}>
          ${(item.WholesalePrice * item.Quantity).toFixed(2)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <article>
        <Helmet
          title="Catalog"
          meta={[
            { name: 'description', content: 'Catalog Page' },
          ]}
        />
        <div style={{ display: 'flex' }} >
          <span style={{ flex: 1 }}></span>
          {!this.props.loading && !this.props.submitOrderSuccess &&
          <Paper style={{ width: '1000px', margin: '10px', padding: '10px' }}>
            <h2>Review the items in your cart:</h2>
            {_.map(this.props.checkoutItems, (item, ix) => this.renderItem(item, ix))}
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <strong style={{ flex: 8 }}>
                Total
              </strong>
              <strong style={{ flex: 1 }}>
                {_.reduce(this.props.checkoutItems, (memo, item) => memo + item.Quantity, 0)}
              </strong>
              <strong style={{ flex: 1 }}>
                ${_.reduce(this.props.checkoutItems, (memo, item) => memo + (item.Quantity * item.WholesalePrice), 0).toFixed(2)}
              </strong>
            </div>
            <br />
            <br />
            <br />
            <h2>Shipping Info</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                hintText="Ship to name"
                value={this.props.shippingInfo.BuyerName}
                onChange={(ev, newVal) => this.props.onShippingInfoChange('BuyerName', newVal)}
              />
              <TextField
                hintText="Ship to email"
                value={this.props.shippingInfo.BuyerEmail}
                onChange={(ev, newVal) => this.props.onShippingInfoChange('BuyerEmail', newVal)}
              />
              <TextField
                hintText="Ship to phone"
                value={this.props.shippingInfo.BuyerPhone}
                onChange={(ev, newVal) => this.props.onShippingInfoChange('BuyerPhone', newVal)}
              />
              <TextField
                hintText="Address 1"
                value={this.props.shippingInfo.ShipAddress}
                onChange={(ev, newVal) => this.props.onShippingInfoChange('ShipAddress', newVal)}
              />
              <TextField
                hintText="Address 2"
                value={this.props.shippingInfo.ShipAddress2}
                onChange={(ev, newVal) => this.props.onShippingInfoChange('ShipAddress2', newVal)}
              />
              <TextField
                hintText="City"
                value={this.props.shippingInfo.ShipCity}
                onChange={(ev, newVal) => this.props.onShippingInfoChange('ShipCity', newVal)}
              />
              <TextField
                hintText="State"
                value={this.props.shippingInfo.ShipState}
                onChange={(ev, newVal) => this.props.onShippingInfoChange('ShipState', newVal)}
              />
              <TextField
                hintText="Zip"
                value={this.props.shippingInfo.ShipZip}
                onChange={(ev, newVal) => this.props.onShippingInfoChange('ShipZip', newVal)}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <span style={{ flex: 1 }} />
              <FlatButton onTouchTap={this.props.onSubmitOrder} style={{ backgroundColor: '#A9CF54', color: 'white', padding: '0 5px' }}>
                Submit Order
              </FlatButton>
            </div>
          </Paper>
          }
          {!this.props.loading && this.props.submitOrderSuccess &&
            this.renderCheckoutSuccess()
          }
          <span style={{ flex: 1 }}></span>
        </div>
      </article>
    );
  }
}

CheckoutPage.propTypes = {
  checkoutItems: PropTypes.array,
  shippingInfo: PropTypes.object,
  loading: PropTypes.bool,
  submitOrderSuccess: PropTypes.bool,
  onShippingInfoChange: PropTypes.func,
  onChangeQuantity: PropTypes.func,
  onSubmitOrder: PropTypes.func,
};


export function mapDispatchToProps(dispatch) {
  return {
    onSubmitOrder: () => {
      dispatch(submitOrder());
    },
    onRemoveFromCart: (ix) => {
      dispatch(removeItemFromCart(ix));
    },
    onChangeQuantity: (ix, quantity) => {
      dispatch(updateItemQuantity(ix, quantity));
    },
    onShippingInfoChange: (field, newVal) => {
      dispatch(updateShippingForm(field, newVal));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  checkoutItems: selectCartItems(),
  shippingInfo: selectOrder(),
  loading: selectLoading(),
  submitOrderSuccess: selectSubmitOrderSuccess(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
