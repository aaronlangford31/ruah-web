import { fromJS } from 'immutable';
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_NOT_FOUND,
  START_EDIT_CURRENT_PRODUCT,
  EDIT_CURRENT_PRODUCT,
  CANCEL_EDIT_CURRENT_PRODUCT,
  SAVE_EDIT_CURRENT_PRODUCT,
} from './constants';

const initialState = fromJS({
  loading: true,
  isEditing: false,
  currentProduct: fromJS({}),
  currentProductId: '',
  currentProductCopy: fromJS({}),
  notFound: false,
});

function productProfilePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_BY_ID: {
      return state
        .set('loading', true)
        .set('notFound', false)
        .set('currentProduct', fromJS({}))
        .set('currentProductId', action.RuahId);
    }
    case GET_PRODUCT_BY_ID_SUCCESS: {
      const product = action.product;
      return state
        .set('loading', false)
        .set('isEditing', false)
        .set('currentProduct', fromJS(product));
    }
    case GET_PRODUCT_BY_ID_NOT_FOUND: {
      return state
        .set('loading', false)
        .set('notFound', true);
    }
    case START_EDIT_CURRENT_PRODUCT: {
      const copy = state.get('currentProduct').toJS();
      return state
        .set('currentProductCopy', fromJS(copy))
        .set('isEditing', true);
    }
    case CANCEL_EDIT_CURRENT_PRODUCT: {
      const restore = state.get('currentProductCopy').toJS();
      return state
        .set('currentProduct', fromJS(restore))
        .set('isEditing', false);
    }
    case EDIT_CURRENT_PRODUCT: {
      const product = state.get('currentProduct').toJS();
      switch (action.field) {
        case 'WholesalePrice':
        case 'ShippingFee':
          product[action.field] = parseFloat(action.newVal);
          break;
        case 'Inventory':
          product[action.field] = parseInt(action.newVal, 10);
          break;
        default:
          product[action.field] = action.newVal;
          break;
      }
      return state
        .set('currentProduct', fromJS(product));
    }
    case SAVE_EDIT_CURRENT_PRODUCT: {
      return state
        .set('currentProductCopy', fromJS({}))
        .set('isEditing', false);
    }
    default:
      return state;
  }
}

export default productProfilePageReducer;
