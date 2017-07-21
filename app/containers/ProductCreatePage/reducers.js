import {
  CREATE_PRODUCT_REQUEST,
  SUBMIT_CREATE_PRODUCT_SUCCESS,
  SUBMIT_CREATE_PRODUCT_ERROR,
  INVALID_SKU,
  INVALID_SKU_REMOVE,
  ERROR_REMOVE,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  invalidSku: false,
  loading: false,
  error: '',
});

function productCreatePageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return state
        .set('invalidSku', false)
        .set('loading', true)
        .set('error', false);
    case SUBMIT_CREATE_PRODUCT_SUCCESS:
      return state
        .set('loading', true)
        .set('error', false);
    case SUBMIT_CREATE_PRODUCT_ERROR:
      return state
        .set('loading', true)
        .set('error', action.error);
    case INVALID_SKU:
      return state
        .set('invalidSku', true)
        .set('loading', false);
    case INVALID_SKU_REMOVE:
      return state
        .set('invalidSku', false)
        .set('error', false);
    case ERROR_REMOVE:
      return state
        .set('error', false);
    default:
      return state;
  }
}

export default productCreatePageReducer;
