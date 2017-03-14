import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentOrder,
  selectCurrentOrderId,
  selectCurrentOrderLoaded,
  selectShippingFromModalOpen,
} from './selectors';
import {
  loadOrderProfileData,
  updateOrderToProcessing,
  openFulfilmentDialog,
  closeFulfilmentDialog,
} from './actions';
import Body from '../../components/styled/Body';
import Menu from '../../components/partials/Menu';
import Dialog from 'material-ui/Dialog';
import MailIcon from 'material-ui/svg-icons/communication/contact-mail';
import PersonIcon from 'material-ui/svg-icons/social/person';
import ProductIcon from 'material-ui/svg-icons/action/work';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ShippedIcon from 'material-ui/svg-icons/maps/local-shipping';
import NewIcon from 'material-ui/svg-icons/av/new-releases';
import ProcessingIcon from 'material-ui/svg-icons/action/update';
import ShippingForm from '../../components/forms/ShippingForm';

function NextStepButton(properties) {
  switch (properties.phase) {
    case 0:
      return (
        <RaisedButton
          label="Acknowledge Now"
          onTouchTap={() => properties.onAcknowledge()}
        />
      );
    case 1:
      return (
        <RaisedButton
          label="Submit Fulfillment Info Now"
          onTouchTap={() => properties.onFulfill()}
        />
      );
    case 2:
      return (
        <div>Order has been fulfilled!</div>
      );
    default:
      return (
        <div>Error</div>
      );
  }
}

function OrderPhase(properties) {
  switch (properties.phase) {
    case 0:
      return (
        <div style={{ textAlign: 'center', width: '50px', fontSize: '12px' }}>
          <NewIcon color="#04BFBF" />
          <p style={{ margin: 0 }}>New</p>
        </div>
      );
    case 1:
      return (
        <div style={{ textAlign: 'center', width: '50px', fontSize: '12px' }}>
          <ProcessingIcon color="#F7E967" />
          <p style={{ margin: 0 }}>Processing</p>
        </div>
      );
    case 2:
      return (
        <div style={{ textAlign: 'center', width: '60px', fontSize: '12px' }}>
          <ShippedIcon color="#A9CF54" />
          <p style={{ margin: 0 }}>Shipped</p>
        </div>
      );
    default:
      return (
        <div>Error</div>
      );
  }
}

function OrderComponent(properties) {
  if (!properties.shouldRender) {
    return null;
  }
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 3, marginRight: 24 }}>
        <Menu />
      </div>
      <div style={{ flex: 9 }}>
        <h4 style={{ marginBottom: 0 }}>Order ID: {properties.order.OrderId}</h4>
        <div style={{ display: 'flex' }}>
          <p style={{ fontSize: '12px', flex: 90 }}>
            Order placed {properties.order.OrderCreatedDate.fromNow()}, on {properties.order.OrderCreatedDate.format('MMMM D, YYYY')} at {properties.order.OrderCreatedDate.format('LTS')}
          </p>
          <div style={{ flex: 10 }}>
            <OrderPhase phase={properties.order.OrderPhase} />
          </div>
        </div>
        <div>
          <Stepper activeStep={properties.order.OrderPhase}>
            <Step>
              <StepLabel>Acknowledge New Order</StepLabel>
            </Step>
            <Step>
              <StepLabel>Enter Fulfillment Info</StepLabel>
            </Step>
          </Stepper>
          <div>
            <div style={{ marginTop: 12, marginBottom: 12 }}>
              <NextStepButton
                phase={properties.order.OrderPhase}
                onAcknowledge={properties.updateOrderToProcessing}
                onFulfill={properties.openFulfilmentDialog}
              />
              <Dialog
                title={`Fulfillment Info for order ID ${properties.order.OrderId}`}
                open={properties.shippingFormModalOpen}
                onRequestClose={properties.closeFulfilmentDialog}
              >
                <ShippingForm handleSubmit={properties.updateOrderToShipping} handleCancel={properties.closeFulfilmentDialog} />
              </Dialog>
            </div>
          </div>
        </div>
        <Divider />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h3><PersonIcon style={{ marginRight: 5 }} /> Buyer Info</h3>
            <p>
              Name: {properties.order.BuyerName}
            </p>
            <p>
              Phone: {properties.order.BuyerPhone || '--'}
            </p>
            <p>
              Email: {properties.order.BuyerEmail || '--'}
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <h3><MailIcon style={{ marginRight: 5 }} /> Shipping Address</h3>
            <p>
              Requested Shipping Service: {properties.order.RequestedShipService || '--'}
            </p>
            <p>
              Street: {properties.order.ShipAddress}
            </p>
            <p>
              City: {properties.order.ShipCity}
            </p>
            <p>
              State: {properties.order.ShipState}
            </p>
            <p>
              Zip: {properties.order.ShipZip}
            </p>
          </div>
        </div>
        <Divider />
        {properties.order.OrderItems && properties.order.OrderItems.length && <div>
          <h3><ProductIcon style={{ marginRight: 5 }} /> Order Items</h3>
          <p>
            Product Name: {properties.order.OrderItems[0].ProductName}
          </p>
          <p>
            Product Price: {properties.order.OrderItems[0].ProductPrice}
          </p>
          <p>
            Quantity: {properties.order.OrderItems[0].Quantity}
          </p>
          <p>
            Shipping Price: {properties.order.OrderItems[0].ShippingPrice || 'Free'}
          </p>
        </div>}
      </div>
    </div>
  );
}

class OrderProfilePage extends Component {
  constructor(props) {
    super(props);
    props.loadOrderData(props.router.params.orderId);
  }
  render() {
    return (
      <article>
        <Helmet
          title={`Order - ${this.props.orderId}`}
          meta={[
            { name: 'description', content: 'Order Page' },
          ]}
        />
        <Body>
          <OrderComponent
            shouldRender={this.props.orderLoaded}
            order={this.props.order}
            updateOrderToProcessing={this.props.updateOrderToProcessing}
            updateOrderToShipping={this.props.updateOrderToShipping}
            openFulfilmentDialog={this.props.openFulfilmentDialog}
            closeFulfilmentDialog={this.props.closeFulfilmentDialog}
            shippingFormModalOpen={this.props.shippingFormModalOpen}
          />
        </Body>
      </article>
    );
  }
}

OrderProfilePage.propTypes = {
  order: PropTypes.object,
  orderId: PropTypes.string,
  orderLoaded: PropTypes.bool,
  shippingFormModalOpen: PropTypes.bool,
  openFulfilmentDialog: PropTypes.func,
  closeFulfilmentDialog: PropTypes.func,
  router: PropTypes.object,
  loadOrderData: PropTypes.func,
  updateOrderToProcessing: PropTypes.func,
  updateOrderToShipping: PropTypes.func,
};

OrderProfilePage.contextTypes = {
  router: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadOrderData: (orderId) => {
      dispatch(loadOrderProfileData(orderId));
    },
    updateOrderToProcessing: () => {
      dispatch(updateOrderToProcessing());
    },
    openFulfilmentDialog: () => {
      dispatch(openFulfilmentDialog());
    },
    closeFulfilmentDialog: () => {
      dispatch(closeFulfilmentDialog());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  order: selectCurrentOrder(),
  orderId: selectCurrentOrderId(),
  orderLoaded: selectCurrentOrderLoaded(),
  shippingFormModalOpen: selectShippingFromModalOpen(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(OrderProfilePage);
