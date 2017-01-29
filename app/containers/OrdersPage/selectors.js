import { createSelector } from 'reselect';

const selectOrdersPage = () => (state) => state.get('ordersPage');

const selectOrders = () => createSelector(
  selectOrdersPage(),
  (state) => state.get('orders').toJS(),
);

const selectLoading = () => createSelector(
  selectOrdersPage(),
  (state) => state.get('loading'),
);

export {
  selectOrders,
  selectLoading,
};
