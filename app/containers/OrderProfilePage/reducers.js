import moment from 'moment';
import {
  LOAD_ORDER_PROFILE_DATA,
  LOAD_ORDER_PROFILE_DATA_SUCCESS,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  currentOrder: {},
  currentOrderId: '',
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
      return state
        .set('loading', false)
        .set('currentOrderLoaded', true)
        .set('currentOrder', fromJS(order));
    }
    default:
      return state;
  }
}

export default orderProfilePageReducer;
