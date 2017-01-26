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
  CHECK_SIGN_UP_CODE,
  CHECK_SIGN_UP_CODE_SUCCESS,
  CHECK_SIGN_UP_CODE_ERROR,
  INVALID_USER_ID_DETECTED,
  SUBMIT_SIGN_UP_SUCCESS,
  SUBMIT_SIGN_UP_ERROR,
  REMOVE_ERROR,
  SUBMIT_SIGN_UP,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  validSignUpCode: '',
});

function signUpPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_SIGN_UP_CODE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('validSignUpCode', '');
    case CHECK_SIGN_UP_CODE_SUCCESS:
      return state
        .set('validSignUpCode', action.code)
        .set('loading', false);
    case CHECK_SIGN_UP_CODE_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case REMOVE_ERROR:
      return state
        .set('error', false);
    case INVALID_USER_ID_DETECTED:
      return state
        .set('error', action.error)
        .set('loading', false);
    case SUBMIT_SIGN_UP:
      return state
        .set('error', false)
        .set('loading', true);
    case SUBMIT_SIGN_UP_SUCCESS:
      return state
        .set('authenticated', true)
        .set('loading', false);
    case SUBMIT_SIGN_UP_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default signUpPageReducer;
