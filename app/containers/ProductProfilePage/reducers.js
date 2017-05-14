import { fromJS } from 'immutable';
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_NOT_FOUND,
} from './constants';

const initialState = fromJS({
  loading: true,
  currentProduct: {},
  currentProductId: '',
  notFound: false,
});

function productProfilePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_BY_ID: {
      return state
        .set('loading', true)
        .set('notFound', false)
        .set('currentProduct', {})
        .set('currentProductId', action.RuahId);
    }
    case GET_PRODUCT_BY_ID_SUCCESS: {
      const product = action.product;
      return state
        .set('loading', false)
        .set('currentProduct', fromJS(product));
    }
    case GET_PRODUCT_BY_ID_NOT_FOUND: {
      return state
        .set('loading', false)
        .set('notFound', true);
    }
    default:
      return state;
  }
}

export default productProfilePageReducer;
