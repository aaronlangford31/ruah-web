import _ from 'underscore';
import moment from 'moment';
import {
  GET_RECEIVED_ORDERS,
  GET_RECEIVED_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_TO_PROCESSING,
  UPDATE_ORDER_TO_PROCESSING_SUCCESS,
  UPDATE_ORDER_TO_PROCESSING_ERROR,
  REMOVE_ERROR,
  UPDATE_ORDER_TO_SHIPPING_SUCCESS,
  UPDATE_ORDER_TO_SHIPPING_ERROR,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  pageKey: '',
  orders: fromJS([]),
});

function ordersPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECEIVED_ORDERS: {
      return state
        .set('loading', true);
    }
    case GET_RECEIVED_ORDERS_SUCCESS: {
      const transformedOrders = _.map(action.orders, (order) => ({
        OrderId: order.OrderId,
        OrderCreatedDate: moment(order.OrderCreatedDate),
        BuyerEmail: order.BuyerEmail,
        BuyerName: order.BuyerName,
        BuyerPhone: order.BuyerPhone,
        Fufilled: order.Fufilled,
        OrderItems: order.OrderItems,
        OrderPhase: order.OrderPhase,
        ShipAddress: order.ShipAddress,
        ShipAddress2: order.ShipAddress2,
        ShipCity: order.ShipCity,
        ShipState: order.ShipState,
        ShipZip: order.ShipZip,
      }));

      transformedOrders.sort((a, b) => (a.OrderCreatedDate - b.OrderCreatedDate));
      const orders = Array.concat(state.get('orders').toJS(), transformedOrders);
      return state
        .set('orders', fromJS(orders))
        .set('pageKey', action.pageKey)
        .set('loading', false);
    }
    case GET_ORDERS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case REMOVE_ERROR:
      return state
        .set('error', false);
    case UPDATE_ORDER_TO_PROCESSING:
      return state
        .set('loading', true);
    case UPDATE_ORDER_TO_PROCESSING_SUCCESS:
      return state
        .set('orders', state.get('orders').update(
          state.get('orders').findIndex((order) => (order.get('OrderId') === action.orderId)),
          (order) => order.set('OrderPhase', parseInt(order.get('OrderPhase'), 10) + 1)
        ))
        .set('loading', false);
    case UPDATE_ORDER_TO_PROCESSING_ERROR:
      return state
        .set('loading', false);
    case UPDATE_ORDER_TO_SHIPPING_SUCCESS:
      return state
        .set('orders', state.get('orders').update(
          state.get('orders').findIndex((order) => (order.get('OrderId') === action.orderId)),
          (order) => order.set('OrderPhase', parseInt(order.get('OrderPhase'), 10) + 1)
        ))
        .set('loading', false);
    case UPDATE_ORDER_TO_SHIPPING_ERROR:
      return state
        .set('loading', false);
    default:
      return state;
  }
}

export default ordersPageReducer;
