import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  REMOVE_ERROR,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  products: [],
});

function catalogPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return state
        .set('products', fromJS(action.products))
        .set('loading', false);
    case GET_PRODUCTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case GET_PRODUCTS:
      return state
        .set('loading', true);
    case REMOVE_ERROR:
      return state
        .set('error', false);
    default:
      return state;
  }
}

export default catalogPageReducer;
