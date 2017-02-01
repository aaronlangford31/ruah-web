/*
 * SignUpPageReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  SUBMIT_CREATE_PRODUCT,
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
    case SUBMIT_CREATE_PRODUCT:
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
