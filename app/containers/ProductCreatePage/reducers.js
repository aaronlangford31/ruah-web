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
  INVALID_SKU_ERROR,
  REMOVE_ERROR,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
});

function productCreatePageReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_CREATE_PRODUCT:
      return state
        .set('loading', true)
        .set('error', false);
    case SUBMIT_CREATE_PRODUCT_SUCCESS:
      return state
        .set('loading', true)
        .set('error', false);
    case SUBMIT_CREATE_PRODUCT_ERROR:
      return state
        .set('loading', true)
        .set('error', false);
    case INVALID_SKU_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case REMOVE_ERROR:
      return state
        .set('error', false);
    default:
      return state;
  }
}

export default productCreatePageReducer;
