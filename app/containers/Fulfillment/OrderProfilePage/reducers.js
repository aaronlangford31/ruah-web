import moment from 'moment';
import { fromJS } from 'immutable';
import {
  LOAD_ORDER_PROFILE_DATA,
  LOAD_ORDER_PROFILE_DATA_SUCCESS,
  UPDATE_ORDER_TO_PROCESSING_SUCCESS,
  UPDATE_ORDER_TO_SHIPPING_SUCCESS,
  OPEN_FULFILMENT_DIALOG,
  CLOSE_FULFILMENT_DIALOG,
} from './constants';

const initialState = fromJS({
  loading: false,
  currentOrder: {},
  currentOrderId: '',
  shippingFormModalOpen: false,
  currentOrderLoaded: false,
});

function orderProfilePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORDER_PROFILE_DATA:
      return state
        .set('loading', true)
        .set('currentOrderId', action.orderId);
    case LOAD_ORDER_PROFILE_DATA_SUCCESS: {
      const order = action.order;
      order.OrderCreatedDate = moment(order.OrderCreatedDate);
      if (order.FulfillmentInfo) {
        order.FulfillmentInfo.EstimatedShipmentDate = moment(order.FulfillmentInfo.EstimatedShipmentDate);
      }
      return state
        .set('loading', false)
        .set('currentOrderLoaded', true)
        .set('currentOrder', fromJS(order));
    }
    case UPDATE_ORDER_TO_PROCESSING_SUCCESS: {
      const order = state.get('currentOrder').toJS();
      order.OrderPhase += 1;
      return state
        .set('currentOrder', fromJS(order));
    }
    case UPDATE_ORDER_TO_SHIPPING_SUCCESS: {
      const order = state.get('currentOrder').toJS();
      order.OrderPhase += 1;
      return state
        .set('currentOrder', fromJS(order))
        .set('shippingFormModalOpen', false);
    }
    case OPEN_FULFILMENT_DIALOG:
      return state
        .set('shippingFormModalOpen', true);
    case CLOSE_FULFILMENT_DIALOG:
      return state
        .set('shippingFormModalOpen', false);
    default:
      return state;
  }
}

export default orderProfilePageReducer;
