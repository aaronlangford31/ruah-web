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
import Menu from '../../components/partials/Menu';
import MailIcon from 'material-ui/svg-icons/communication/contact-mail';
import PersonIcon from 'material-ui/svg-icons/social/person';
import ReceiptIcon from 'material-ui/svg-icons/action/receipt';
import ProductIcon from 'material-ui/svg-icons/action/work';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

class OrderProfilePage extends Component {

  state = {
    finished: false,
    stepIndex: 1,
  };

  getLabel(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Mark New';
      case 1:
        return 'Mark Processed';
      case 2:
        return 'Mark Shipped';
      case 3:
        return 'Complete';
      default:
        return 'Error';
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 1) {
      this.setState({
        stepIndex: stepIndex - 1,
        finished: false,
      });
    }
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  renderOrder(order) {
    const { finished, stepIndex } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 3, marginRight: 24 }}>
          <Menu />
        </div>
        <div style={{ flex: 9 }}>
          <div>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>New</StepLabel>
              </Step>
              <Step>
                <StepLabel>Processing</StepLabel>
              </Step>
              <Step>
                <StepLabel>Shipped</StepLabel>
              </Step>
            </Stepper>
            <div>
              <div style={{ marginTop: 12, marginBottom: 12 }}>
                <FlatButton
                  label="undo"
                  disabled={stepIndex <= 1}
                  onTouchTap={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label={this.getLabel(stepIndex)}
                  primary
                  onTouchTap={this.handleNext}
                  disabled={finished}
                />
              </div>
            </div>
          </div>
          <Divider />
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
        <Body>{this.renderOrder(order)}</Body>
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
