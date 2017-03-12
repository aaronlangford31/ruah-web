import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_TO_PROCESSING,
  UPDATE_ORDER_TO_PROCESSING_SUCCESS,
  UPDATE_ORDER_TO_PROCESSING_ERROR,
  REMOVE_ERROR,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  orders: [],
});

function ordersPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return state
        .set('orders', fromJS(action.orders))
        .set('loading', false);
    case GET_ORDERS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case GET_ORDERS:
      return state
        .set('loading', true);
    case REMOVE_ERROR:
      return state
        .set('error', false);
    case UPDATE_ORDER_TO_PROCESSING:
      return state
        .set('loading', true);
    case UPDATE_ORDER_TO_PROCESSING_SUCCESS:
      return state
        .set('loading', false);
    case UPDATE_ORDER_TO_PROCESSING_ERROR:
      return state
        .set('loading', false);
    default:
      return state;
  }
}

export default ordersPageReducer;
