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
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHECK_LOGIN,
  LOGOUT_SUBMIT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REMOVE_ERROR,
  GET_STORE_SUCCESS,
  REQUEST_CREDENTIALS,
  SUBMIT_SEARCH_SUCCESS,
  TOGGLE_INVITATION_MODAL_OPEN,
  SUBMIT_INVITE,
  SUBMIT_INVITE_SUCCESS,
} from './constants';
import moment from 'moment';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  loggedIn: false,
  store: fromJS({}),
  locationOnSuccess: '/conversations',
  searchResults: fromJS([]),
  inviteModalComponentState: fromJS({
    isOpen: false,
    loading: false,
  }),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state
        .set('loading', true)
        .set('error', false);
    case LOGIN_SUCCESS: {
      return state
        .set('userId', action.userId)
        .set('storeId', action.storeId)
        .set('loggedIn', true)
        .set('loading', false);
    }
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
        .set('loggedIn', false)
        .set('loading', false);
    case LOGOUT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case REMOVE_ERROR:
      return state
        .set('error', false);
    case REQUEST_CREDENTIALS: {
      return state
        .set('locationOnSuccess', action.locationOnSuccess);
    }
    case GET_STORE_SUCCESS: {
      const store = action.store;
      store.Joined = moment(action.store.Joined);
      return state
          .set('store', fromJS(store));
    }
    case SUBMIT_SEARCH_SUCCESS: {
      return state
        .set('searchResults', fromJS(action.products));
    }
    case TOGGLE_INVITATION_MODAL_OPEN: {
      const inviteModalComponentState = state.get('inviteModalComponentState').toJS();
      inviteModalComponentState.isOpen = action.isOpen;
      return state
        .set('inviteModalComponentState', fromJS(inviteModalComponentState));
    }
    case SUBMIT_INVITE: {
      const inviteModalComponentState = state.get('inviteModalComponentState').toJS();
      inviteModalComponentState.loading = true;
      return state
        .set('inviteModalComponentState', fromJS(inviteModalComponentState));
    }
    case SUBMIT_INVITE_SUCCESS: {
      const inviteModalComponentState = state.get('inviteModalComponentState').toJS();
      inviteModalComponentState.loading = false;
      inviteModalComponentState.isOpen = false;
      return state
        .set('inviteModalComponentState', fromJS(inviteModalComponentState));
    }
    default:
      return state;
  }
}

export default appReducer;
