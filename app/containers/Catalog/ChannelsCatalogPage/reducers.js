import {
  SET_QUERY,
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  REMOVE_ERROR,
  SET_AUTOCOMPLETE,
  PAGE_FORWARD,
  PAGE_BACKWARD,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  query: '',
  error: '',
  autocomplete: fromJS([]),
  products: fromJS([]),
  filteredProducts: fromJS([]),
  visibleProducts: fromJS([]),
  visibleStartIx: 0,
});

function channelsCatalogPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTOCOMPLETE:
      return state.set('autocomplete', action.payload.get('items'));
    case GET_PRODUCTS_SUCCESS: {
      const products = action.payload.get('products');
      const visibleProducts = products.slice(state.get('visibleStartIx'), 32);
      return state
        .set('products', fromJS(products))
        .set('filteredProducts', fromJS(action.payload.get('products')))
        .set('visibleProducts', fromJS(visibleProducts))
        .set('loading', false);
    }
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
    case SEARCH_PRODUCTS_SUCCESS: {
      const currIx = state.get('visibleStartIx');
      const visibleProducts = action.payload.get('filteredProducts').slice(currIx, currIx + 32);
      return state
        .set('filteredProducts', fromJS(action.payload.get('filteredProducts')))
        .set('visibleProducts', fromJS(visibleProducts))
        .set('loading', false);
    }
    case REMOVE_ERROR:
      return state
        .set('error', false);
    case PAGE_FORWARD: {
      const newIx = state.get('visibleStartIx') + 32;
      const visibleProducts = state.get('filteredProducts').toJS().slice(newIx, newIx + 32);
      return state
        .set('visibleProducts', fromJS(visibleProducts))
        .set('visibleStartIx', newIx);
    }
    case PAGE_BACKWARD: {
      const newIx = state.get('visibleStartIx') - 32;
      const visibleProducts = state.get('filteredProducts').toJS().slice(newIx, newIx + 32);
      return state
        .set('visibleProducts', fromJS(visibleProducts))
        .set('visibleStartIx', newIx);
    }
    default:
      return state;
  }
}

export default channelsCatalogPageReducer;
