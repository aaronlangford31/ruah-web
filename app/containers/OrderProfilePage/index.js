/*
 * OrderProfilePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import _ from 'underscore';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrders } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import MailIcon from 'material-ui/svg-icons/communication/contact-mail';
import PersonIcon from 'material-ui/svg-icons/social/person';
import ReceiptIcon from 'material-ui/svg-icons/action/receipt';
import ProductIcon from 'material-ui/svg-icons/action/work';
import Menu from '../../components/partials/Menu';
import Divider from 'material-ui/Divider';

class OrderProfilePage extends Component {

  renderOrder(order) {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 3, marginRight: 24 }}>
          <Menu />
        </div>
        <div style={{ flex: 9 }}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <h3><PersonIcon style={{ marginRight: 5 }} /> Buyer Info</h3>
              <p>
                Name: {order.BuyerName}
              </p>
              <p>
                Phone: {order.BuyerPhone || '--'}
              </p>
              <p>
                Email: {order.BuyerEmail || '--'}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <h3><MailIcon style={{ marginRight: 5 }} /> Shipping Address</h3>
              <p>
                Street: {order.ShipAddress}
              </p>
              <p>
                City: {order.ShipCity}
              </p>
              <p>
                State: {order.ShipState}
              </p>
              <p>
                Zip: {order.ShipZip}
              </p>
            </div>
          </div>
          <Divider />
          <div>
            <h3><ReceiptIcon style={{ marginRight: 5 }} /> Shipping Details</h3>
            <p>
              Order Date: {moment(order.OrderCreatedDate).format('MMMM D, YYYY')}
              {` (${moment(order.OrderCreatedDate).fromNow()})`}
            </p>
            <p>
              Requested Shipping Service: {order.RequestedShipService}
            </p>
            <p>
              Fufilled: {order.Fufilled || 'No'}
            </p>
          </div>
          <Divider />
          {order.OrderItems && order.OrderItems.length && <div>
            <h3><ProductIcon style={{ marginRight: 5 }} /> Order Items</h3>
            <p>
              Product Name: {order.OrderItems[0].ProductName}
            </p>
            <p>
              Product Price: {order.OrderItems[0].ProductPrice}
            </p>
            <p>
              Quantity: {order.OrderItems[0].Quantity}
            </p>
            <p>
              Shipping Price: {order.OrderItems[0].ShippingPrice || 'Free'}
            </p>
          </div>}
        </div>
      </div>
    );
  }

  render() {
    const { orders, router } = this.props;
    const order = _.chain(orders).filter({ OrderId: router.params.orderId }).first().value() || {};
    return (
      <article>
        <Helmet
          title="Order"
          meta={[
            { name: 'description', content: 'Order Page' },
          ]}
        />
        <H2>Order for: {order.BuyerName}</H2>
        <Body>
          {this.renderOrder(order)}
        </Body>
      </article>
    );
  }
}

OrderProfilePage.propTypes = {
  orders: PropTypes.array,
  router: PropTypes.object,
};

OrderProfilePage.contextTypes = {
  router: PropTypes.object,
};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  orders: selectOrders(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(OrderProfilePage);
