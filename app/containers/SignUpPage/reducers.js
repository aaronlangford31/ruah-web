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
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  validSignUpCodeStatus: false,
});

function signUpPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_SIGN_UP_CODE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('validSignUpCodeStatus', false);
    case CHECK_SIGN_UP_CODE_SUCCESS:
      return state
        .set('validSignUpCodeStatus', true || action.validSignUpCodeStatus)
        .set('loading', false);
    case CHECK_SIGN_UP_CODE_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case INVALID_USER_ID_DETECTED:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default signUpPageReducer;
