import { fromJS } from 'immutable';
import {
  GET_STORE_BY_ID,
  GET_STORE_BY_ID_SUCCESS,
  GET_STORE_BY_ID_NOT_FOUND,
  GET_STORE_BY_ID_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  currentStore: fromJS({}),
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
      return state
        .set('loading', false)
        .set('isEditing', false)
        .set('currentProduct', fromJS(action.store));
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
    default:
      return state;
  }
}

export default storeProfilePageReducer;
