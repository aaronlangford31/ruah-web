import _ from 'underscore';
import moment from 'moment';
import {
  GET_SENT_ORDERS,
  GET_SENT_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  pageKey: '',
  orders: fromJS([]),
});

function sentOrdersPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SENT_ORDERS: {
      return state
        .set('loading', true);
    }
    case GET_SENT_ORDERS_SUCCESS: {
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
    default:
      return state;
  }
}

export default sentOrdersPageReducer;
