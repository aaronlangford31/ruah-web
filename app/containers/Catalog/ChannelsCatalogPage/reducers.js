import {
  SET_QUERY,
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  REMOVE_ERROR,
  SET_AUTOCOMPLETE,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  query: '',
  error: '',
  autocomplete: fromJS([]),
  products: fromJS([]),
  filteredProducts: fromJS([]),
});

function channelsCatalogPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTOCOMPLETE:
      return state.set('autocomplete', action.payload.get('items'));
    case GET_PRODUCTS_SUCCESS:
      return state
        .set('products', fromJS(action.payload.get('products')))
        .set('filteredProducts', fromJS(action.payload.get('products')))
        .set('loading', false);
    case GET_PRODUCTS_ERROR:
      return state
        .set('error', action.payload.get('error'))
        .set('loading', false);
    case GET_PRODUCTS:
      return state
        .set('loading', true);
    case SET_QUERY:
      return state
        .set('query', action.payload.query);
    case SEARCH_PRODUCTS:
      return state
        .set('loading', true);
    case SEARCH_PRODUCTS_SUCCESS:
      return state
        .set('filteredProducts', fromJS(action.payload.get('filteredProducts')))
        .set('loading', false);
    case REMOVE_ERROR:
      return state
        .set('error', false);
    default:
      return state;
  }
}

export default channelsCatalogPageReducer;
