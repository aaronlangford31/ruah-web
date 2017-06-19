import { createSelector } from 'reselect';

const selectCheckoutPage = () => (state) => state.get('checkoutPage');

const selectCartItems = () => createSelector(
  selectCheckoutPage(),
  (state) => state.get('cartItems').toJS(),
);

export { selectCartItems };
