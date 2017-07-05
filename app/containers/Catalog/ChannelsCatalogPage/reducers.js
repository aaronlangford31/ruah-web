import {
  FILTER_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  REMOVE_ERROR,
  PAGE_FORWARD,
  PAGE_BACKWARD,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  filter: '',
  error: '',
  products: fromJS([]),
  visibleProducts: fromJS([]),
  visibleStartIx: 0,
});

function channelsCatalogPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS: {
      const products = action.payload.get('products');
      const visibleProducts = products.slice(state.get('visibleStartIx'), 32);
      return state
        .set('products', fromJS(products))
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
    case FILTER_PRODUCTS:
      return state
        .set('filter', action.payload.get('filter'));
    case REMOVE_ERROR:
      return state
        .set('error', false);
    case PAGE_FORWARD: {
      const newIx = state.get('visibleStartIx') + 32;
      const visibleProducts = state.get('products').toJS().slice(newIx, newIx + 32);
      return state
        .set('visibleProducts', fromJS(visibleProducts))
        .set('visibleStartIx', newIx);
    }
    case PAGE_BACKWARD: {
      const newIx = state.get('visibleStartIx') - 32;
      const visibleProducts = state.get('products').toJS().slice(newIx, newIx + 32);
      return state
        .set('visibleProducts', fromJS(visibleProducts))
        .set('visibleStartIx', newIx);
    }
    default:
      return state;
  }
}

export default channelsCatalogPageReducer;
