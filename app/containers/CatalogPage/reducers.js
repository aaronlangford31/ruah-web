import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  OPEN_GROUP,
  CLOSE_GROUP,
  REMOVE_ERROR,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  products: [],
  openGroups: [],
});

function catalogPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return state
        .set('products', fromJS(action.payload.get('products')))
        .set('loading', false);
    case GET_PRODUCTS_ERROR:
      return state
        .set('error', action.payload.get('error'))
        .set('loading', false);
    case GET_PRODUCTS:
      return state
        .set('loading', true);
    case OPEN_GROUP:
      return state
        .set('openGroups', state.get('openGroups').push(action.payload.get('groupId')));
    case CLOSE_GROUP:
      return state
        .set('openGroups', state.get('openGroups').filter((groupId) => groupId !== action.payload.get('groupId')));
    case REMOVE_ERROR:
      return state
        .set('error', false);
    default:
      return state;
  }
}

export default catalogPageReducer;
