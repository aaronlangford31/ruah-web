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
  selectStoreId,
} from '../../App/selectors';
import * as OrderProfilePageActions from './actions';
import Body from '../../../components/styled/Body';
import Order from './Order';

class OrderProfilePage extends Component {
  constructor(props) {
    super(props);
    props.loadOrderData(props.router.params.orderId);
  }

  render() {
    const {
      currentStoreId,
      orderId,
      orderLoaded,
      order,
      updateOrderToProcessing,
      updateOrderToShipping,
      openFulfilmentDialog,
      closeFulfilmentDialog,
      shippingFormModalOpen,
    } = this.props;
    return (
      <article>
        <Helmet
          title={`Order - ${orderId}`}
          meta={[
            { name: 'description', content: 'Order Page' },
          ]}
        />
        <Body>
          {orderLoaded && <Order
            order={order}
            currentStoreId={currentStoreId}
            updateOrderToProcessing={updateOrderToProcessing}
            updateOrderToShipping={updateOrderToShipping}
            openFulfilmentDialog={openFulfilmentDialog}
            closeFulfilmentDialog={closeFulfilmentDialog}
            shippingFormModalOpen={shippingFormModalOpen}
          />}
        </Body>
      </article>
    );
  }
}

OrderProfilePage.propTypes = {
  currentStoreId: PropTypes.string,
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
  order: selectCurrentOrder(),
  orderId: selectCurrentOrderId(),
  orderLoaded: selectCurrentOrderLoaded(),
  shippingFormModalOpen: selectShippingFromModalOpen(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(OrderProfilePage);
