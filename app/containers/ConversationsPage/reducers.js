import { fromJS } from 'immutable';
import {
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_SUCCESS,
  GET_STORE_SUCCESS,
  SET_OUTSTANDING_ORDERS,
  SET_VIEW,
  GET_ORDERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  conversations: fromJS([]),
  stores: fromJS({}),
  orders: fromJS([]),
  unfulfilledOrders: 0,
  view: 'Channels',
});

function conversationsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS: {
      return state
        .set('loading', true);
    }
    case GET_CONVERSATIONS_SUCCESS: {
      return state
        .set('conversations', fromJS(action.conversations))
        .set('loading', false);
    }
    case GET_STORE_SUCCESS: {
      const stores = state.get('stores').toJS();
      stores[action.store.StoreId] = action.store;
      return state
        .set('stores', fromJS(stores));
    }
    case SET_OUTSTANDING_ORDERS: {
      return state
        .set('unfulfilledOrders', action.num);
    }
    case SET_VIEW: {
      return state
        .set('view', action.view);
    }
    case GET_ORDERS_SUCCESS: {
      return state
        .set('orders', fromJS(action.orders));
    }
    default:
      return state;
  }
}

export default conversationsPageReducer;
