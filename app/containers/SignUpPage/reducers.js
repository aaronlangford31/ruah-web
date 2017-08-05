import {
  CHECK_SIGN_UP_CODE,
  CHECK_SIGN_UP_CODE_SUCCESS,
  CHECK_SIGN_UP_CODE_ERROR,
  INVALID_USER_ID_DETECTED,
  SUBMIT_SIGN_UP_SUCCESS,
  SUBMIT_SIGN_UP_ERROR,
  REMOVE_ERROR,
  SUBMIT_SIGN_UP,
  SET_SIGN_UP_STAGE,
  SET_STORE_ID,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  validSignUpCode: '',
  signUpStage: 1,
  storeId: '',
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
    case SET_SIGN_UP_STAGE:
      return state
        .set('signUpStage', action.stage);
    case SET_STORE_ID:
      return state
        .set('storeId', action.storeId);
    default:
      return state;
  }
}

export default signUpPageReducer;
