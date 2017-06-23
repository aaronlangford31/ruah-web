import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import MailIcon from 'material-ui/svg-icons/communication/contact-mail';
import ShippedIcon from 'material-ui/svg-icons/maps/local-shipping';
import PersonIcon from 'material-ui/svg-icons/social/person';
import ProductIcon from 'material-ui/svg-icons/action/work';
import Divider from 'material-ui/Divider';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ShippingForm from '../../../components/forms/ShippingForm';
import NextStepButton from './NextStepButton';
import OrderPhase from './OrderPhase';

function Order({
  currentStoreId,
  order,
  updateOrderToProcessing,
  openFulfilmentDialog,
  shippingFormModalOpen,
  closeFulfilmentDialog,
  updateOrderToShipping,
}) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 10 }}>
        <h4 style={{ marginBottom: 0 }}>Order ID: {order.OrderId}</h4>
        <div style={{ display: 'flex' }}>
          <p style={{ fontSize: '12px', flex: 90 }}>
            Order placed {order.OrderCreatedDate.fromNow()}, on {order.OrderCreatedDate.format('MMMM D, YYYY')} at {order.OrderCreatedDate.format('LTS')}
          </p>
          <div style={{ flex: 10 }}>
            <OrderPhase phase={order.OrderPhase} />
          </div>
        </div>
        <div>
          <Stepper activeStep={order.OrderPhase}>
            <Step>
              {currentStoreId === order.StoreId
                ? <StepLabel>Acknowledge New Order</StepLabel>
                : <StepLabel>Awaiting Acknowledgement</StepLabel>
              }
            </Step>
            <Step>
              {currentStoreId === order.StoreId
                ? <StepLabel>Enter Fulfillment Info</StepLabel>
                : <StepLabel>Awaiting Fulfillment</StepLabel>
              }
            </Step>
          </Stepper>
          {currentStoreId === order.StoreId &&
          <div>
            <div style={{ marginTop: 12, marginBottom: 12 }}>
              <NextStepButton
                phase={order.OrderPhase}
                onAcknowledge={updateOrderToProcessing}
                onFulfill={openFulfilmentDialog}
              />
              <Dialog
                title={`Fulfillment Info for order ID ${order.OrderId}`}
                open={shippingFormModalOpen}
                onRequestClose={closeFulfilmentDialog}
              >
                <ShippingForm
                  handleSubmit={async () => updateOrderToShipping(order.OrderId)}
                  handleCancel={closeFulfilmentDialog}
                />
              </Dialog>
            </div>
          </div>
          }
        </div>
        <Divider />
        { order.FulfillmentInfo &&
        <div>
          <h3><ShippedIcon style={{ marginRight: 5 }} /> Fulfillment Info</h3>
          <p>
            Carrier Code: {order.FulfillmentInfo.CarrierCode}
          </p>
          <p>
            Carrier Name: {order.FulfillmentInfo.CarrierName}
          </p>
          <p>
            Shipping Method: {order.FulfillmentInfo.ShippingMethod}
          </p>
          <p>
            Tracking Code: {order.FulfillmentInfo.ShipTrackCode}
          </p>
          <p>
            Estimated Ship Date: {order.FulfillmentInfo.EstimatedShipmentDate.format('MMMM D, YYYY')}
          </p>
        </div>
        }
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
              Requested Shipping Service: {order.RequestedShipService || '--'}
            </p>
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
        {order.OrderItems && order.OrderItems.length && <div>
          <h3><ProductIcon style={{ marginRight: 5 }} /> Order Items</h3>
          <p>
            Product Name: {order.OrderItems[0].ProductName}
          </p>
          <p>
            Product Price: ${order.OrderItems[0].ProductPrice.toFixed(2)}
          </p>
          <p>
            Quantity: {order.OrderItems[0].Quantity}
          </p>
          <p>
            Shipping Price: ${order.OrderItems[0].ShippingPrice.toFixed(2)}
          </p>
        </div>}
      </div>
    </div>
  );
}

Order.propTypes = {
  currentStoreId: PropTypes.string,
  order: PropTypes.object,
  updateOrderToProcessing: PropTypes.func,
  openFulfilmentDialog: PropTypes.func,
  shippingFormModalOpen: PropTypes.bool,
  closeFulfilmentDialog: PropTypes.func,
  updateOrderToShipping: PropTypes.func,
};

export default Order;
