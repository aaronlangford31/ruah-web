import {
  FILTER_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  REMOVE_ERROR,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  filter: '',
  error: '',
  products: fromJS([]),
});

function myCatalogPageReducer(state = initialState, action) {
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
    case FILTER_PRODUCTS:
      return state
        .set('filter', action.payload.get('filter'));
    case REMOVE_ERROR:
      return state
        .set('error', false);
    default:
      return state;
  }
}

export default myCatalogPageReducer;
