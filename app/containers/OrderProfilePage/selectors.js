/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectCatalogPage = () => (state) => state.get('ordersPage');

const selectOrders = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('orders').toJS(),
);

const selectLoading = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('loading'),
);

export {
  selectOrders,
  selectLoading,
};
