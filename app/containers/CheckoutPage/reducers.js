import {
  ADD_ITEM_TO_CART,
  UPDATE_SHIPPING_FORM,
  UPDATE_ITEM_QUANTITY,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  cartItems: fromJS([]),
  order: fromJS({}),
});

export default function checkoutPageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      const items = state.get('cartItems').toJS();
      const item = action.product;
      item.Quantity = 1;
      items.push(item);
      return state
        .set('cartItems', fromJS(items));
    }
    case UPDATE_SHIPPING_FORM: {
      const order = state.get('order').toJS();
      order[action.field] = action.newVal;
      return state
        .set('order', fromJS(order));
    }
    case UPDATE_ITEM_QUANTITY: {
      const items = state.get('cartItems').toJS();
      items[action.ix].Quantity = action.quantity;
      return state
        .set('cartItems', fromJS(items));
    }
    default:
      return state;
  }
}
