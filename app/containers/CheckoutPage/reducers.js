import {
  ADD_ITEM_TO_CART,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  cartItems: fromJS([]),
});

export default function checkoutPageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      const items = state.get('cartItems').toJS();
      items.push(action.product);
      return state
        .set('cartItems', fromJS(items));
    }
    default:
      return state;
  }
}
