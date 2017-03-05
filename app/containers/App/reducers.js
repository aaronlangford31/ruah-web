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
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHECK_LOGIN,
  LOGOUT_SUBMIT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REMOVE_ERROR,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  loggedIn: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUBMIT:
      return state
        .set('loading', true)
        .set('error', false);
    case LOGIN_SUCCESS:
      return state
        .set('userType', action.userType)
        .set('loading', false);
    case LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case CHECK_LOGIN:
      return state
        .set('loadingCheckLogin', true);
    case LOGOUT_SUBMIT:
      return state
        .set('loading', true)
        .set('error', false);
    case LOGOUT_SUCCESS:
      return state
        .set('userType', null)
        .set('loading', false);
    case LOGOUT_ERROR:
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

export default appReducer;
