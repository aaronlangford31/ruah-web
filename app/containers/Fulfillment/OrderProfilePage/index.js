import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import {
  selectCurrentOrder,
  selectCurrentOrderId,
  selectCurrentOrderLoaded,
  selectShippingFromModalOpen,
} from './selectors';
import {
  selectStoreId,
  selectStore,
} from '../../App/selectors';
import * as OrderProfilePageActions from './actions';
import Body from '../../../components/styled/Body';
import Sidebar from '../../../components/partials/Sidebar';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import Dialog from 'material-ui/Dialog';
import MailIcon from 'material-ui/svg-icons/communication/contact-mail';
import ShippedIcon from 'material-ui/svg-icons/maps/local-shipping';
import PersonIcon from 'material-ui/svg-icons/social/person';
import ProductIcon from 'material-ui/svg-icons/action/work';
import Divider from 'material-ui/Divider';
import ShippingForm from '../../../components/forms/ShippingForm';
import NextStepButton from './NextStepButton';
import Paper from 'material-ui/Paper';
import OrderPhase from './OrderPhase';

class OrderProfilePage extends Component {
  constructor(props) {
    super(props);
    props.loadOrderData(props.router.params.orderId);
  }

  renderOrder() {
    return (
      <Paper style={{ display: 'flex', padding: '20px', flex: 1 }}>
        <div style={{ flex: 10 }}>
          <h4 style={{ marginBottom: 0 }}>Order ID: {this.props.order.OrderId}</h4>
          <div style={{ display: 'flex' }}>
            <p style={{ fontSize: '12px', flex: 90 }}>
              Order placed {this.props.order.OrderCreatedDate.fromNow()}, on {this.props.order.OrderCreatedDate.format('MMMM D, YYYY')} at {this.props.order.OrderCreatedDate.format('LTS')}
            </p>
            <div style={{ flex: 10 }}>
              <OrderPhase phase={this.props.order.OrderPhase} />
            </div>
          </div>
          <div>
            <Stepper activeStep={this.props.order.OrderPhase}>
              <Step>
                {this.props.currentStoreId === this.props.order.StoreId
                  ? <StepLabel>Acknowledge New Order</StepLabel>
                  : <StepLabel>Awaiting Acknowledgement</StepLabel>
                }
              </Step>
              <Step>
                {this.props.currentStoreId === this.props.order.StoreId
                  ? <StepLabel>Enter Fulfillment Info</StepLabel>
                  : <StepLabel>Awaiting Fulfillment</StepLabel>
                }
              </Step>
            </Stepper>
            {this.props.currentStoreId === this.props.order.StoreId &&
            <div>
              <div style={{ margin: '12px 5px' }}>
                <NextStepButton
                  phase={this.props.order.OrderPhase}
                  onAcknowledge={this.props.updateOrderToProcessing}
                  onFulfill={this.props.openFulfilmentDialog}
                />
                <Dialog
                  title={`Fulfillment Info for order ID ${this.props.order.OrderId}`}
                  open={this.props.shippingFormModalOpen}
                  onRequestClose={this.props.closeFulfilmentDialog}
                >
                  <ShippingForm
                    handleSubmit={async () => this.props.updateOrderToShipping(this.props.order.OrderId)}
                    handleCancel={this.props.closeFulfilmentDialog}
                  />
                </Dialog>
              </div>
            </div>
            }
          </div>
          <Divider />
          {
            this.props.currentStoreId === this.props.order.StoreId &&
              <a href={`https://api.teamruah.com/serverviews/order/packingslip?orderId=${this.props.order.OrderId}`} target={'blank'}>Packing Slip</a>
          }
          { this.props.order.FulfillmentInfo &&
          <div>
            <h3><ShippedIcon style={{ marginRight: 5 }} /> Fulfillment Info</h3>
            <p>
              Carrier Code: {this.props.order.FulfillmentInfo.CarrierCode}
            </p>
            <p>
              Carrier Name: {this.props.order.FulfillmentInfo.CarrierName}
            </p>
            <p>
              Shipping Method: {this.props.order.FulfillmentInfo.ShippingMethod}
            </p>
            <p>
              Tracking Code: {this.props.order.FulfillmentInfo.ShipTrackCode}
            </p>
            <p>
              Estimated Ship Date: {this.props.order.FulfillmentInfo.EstimatedShipmentDate.format('MMMM D, YYYY')}
            </p>
          </div>
          }
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <h3><PersonIcon style={{ marginRight: 5 }} /> Buyer Info</h3>
              <p>
                Name: {this.props.order.BuyerName}
              </p>
              <p>
                Phone: {this.props.order.BuyerPhone || '--'}
              </p>
              <p>
                Email: {this.props.order.BuyerEmail || '--'}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <h3><MailIcon style={{ marginRight: 5 }} /> Shipping Address</h3>
              <p>
                Requested Shipping Service: {this.props.order.RequestedShipService || '--'}
              </p>
              <p>
                Street: {this.props.order.ShipAddress}
              </p>
              <p>
                City: {this.props.order.ShipCity}
              </p>
              <p>
                State: {this.props.order.ShipState}
              </p>
              <p>
                Zip: {this.props.order.ShipZip}
              </p>
            </div>
          </div>
          <Divider />
          {this.props.order.OrderItems && this.props.order.OrderItems.length && _.map(this.props.order.OrderItems, (item, ix) => <div key={ix}>
            <h3><ProductIcon style={{ marginRight: 5 }} /> Order Items</h3>
            <p>
              Product Name: {item.ProductName}
            </p>
            <p>
              Ruah ID: {item.RuahId}
            </p>
            <p>
              SKU: {item.SKU}
            </p>
            <p>
              Ruah Price: ${item.RuahPrice.toFixed(2)}
            </p>
            <p>
              Quantity: {item.Quantity}
            </p>
            <p>
              Shipping Price: ${item.ShippingPrice.toFixed(2)}
            </p>
          </div>)}
        </div>
      </Paper>
    );
  }

  render() {
    const {
      orderId,
      orderLoaded,
    } = this.props;
    return (
      <article>
        <Helmet
          title={`Order - ${orderId}`}
          meta={[
            { name: 'description', content: 'Order Page' },
          ]}
        />
        <div style={{ display: 'flex' }}>
          <Sidebar
            storeImageUri={this.props.currStore.ProfilePicUri}
            unfulfilledOrders={0}
            currView={window.location.pathname}
          />
          <Body style={{ flex: 1 }}>
            {orderLoaded && this.renderOrder()}
          </Body>
        </div>
      </article>
    );
  }
}

OrderProfilePage.propTypes = {
  currentStoreId: PropTypes.string,
  currStore: PropTypes.object,
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
      dispatch(OrderProfilePageActions.loadOrderProfileData(orderId));
    },
    updateOrderToProcessing: () => {
      dispatch(OrderProfilePageActions.updateOrderToProcessing());
    },
    updateOrderToShipping: (orderId) => {
      dispatch(OrderProfilePageActions.updateOrderToShipping(orderId));
    },
    openFulfilmentDialog: () => {
      dispatch(OrderProfilePageActions.openFulfilmentDialog());
    },
    closeFulfilmentDialog: () => {
      dispatch(OrderProfilePageActions.closeFulfilmentDialog());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  currentStoreId: selectStoreId(),
  currStore: selectStore(),
  order: selectCurrentOrder(),
  orderId: selectCurrentOrderId(),
  orderLoaded: selectCurrentOrderLoaded(),
  shippingFormModalOpen: selectShippingFromModalOpen(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(OrderProfilePage);
