import { fromJS } from 'immutable';
import moment from 'moment';
import {
  GET_STORE_BY_ID,
  GET_STORE_BY_ID_SUCCESS,
  GET_STORE_BY_ID_NOT_FOUND,
  GET_STORE_BY_ID_ERROR,
  GET_STORE_PRODUCT_BY_ID_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  currentStore: fromJS({}),
  currentStoreProducts: fromJS([]),
  currentStoreId: '',
  notFound: false,
});

function storeProfilePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORE_BY_ID: {
      return state
        .set('loading', true)
        .set('notFound', false)
        .set('currentStore', fromJS({}))
        .set('currentStoreId', action.StoreId);
    }
    case GET_STORE_BY_ID_SUCCESS: {
      const store = action.store;
      store.Joined = moment(store.Joined);
      return state
        .set('loading', false)
        .set('isEditing', false)
        .set('currentStore', fromJS(action.store));
    }
    case GET_STORE_BY_ID_NOT_FOUND: {
      return state
        .set('loading', false)
        .set('notFound', true);
    }
    case GET_STORE_BY_ID_ERROR: {
      return state
        .set('loading', false)
        .set('notFound', false);
    }
    case GET_STORE_PRODUCT_BY_ID_SUCCESS: {
      return state
        .set('currentStoreProducts', fromJS(action.products));
    }
    default:
      return state;
  }
}

export default storeProfilePageReducer;
