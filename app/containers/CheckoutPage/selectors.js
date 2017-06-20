import { createSelector } from 'reselect';

const selectCheckoutPage = () => (state) => state.get('checkoutPage');

const selectCartItems = () => createSelector(
  selectCheckoutPage(),
  (state) => state.get('cartItems').toJS(),
);

const selectOrder = () => createSelector(
  selectCheckoutPage(),
  (state) => state.get('order').toJS(),
);

export {
  selectCartItems,
  selectOrder,
};
