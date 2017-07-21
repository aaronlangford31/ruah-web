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

const selectLoading = () => createSelector(
  selectCheckoutPage(),
  (state) => state.get('loading'),
);

const selectSubmitOrderSuccess = () => createSelector(
  selectCheckoutPage(),
  (state) => state.get('orderSubmitSuccess'),
);

export {
  selectCartItems,
  selectOrder,
  selectLoading,
  selectSubmitOrderSuccess,
};
