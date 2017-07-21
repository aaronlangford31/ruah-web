import { createSelector } from 'reselect';

const selectSentOrdersPage = () => (state) => state.get('sentOrdersPage');

const selectOrders = () => createSelector(
  selectSentOrdersPage(),
  (state) => state.get('orders').toJS(),
);

const selectLoading = () => createSelector(
  selectSentOrdersPage(),
  (state) => state.get('loading'),
);

const selectPageKey = () => createSelector(
  selectSentOrdersPage(),
  (state) => state.get('pageKey'),
);

export {
  selectOrders,
  selectLoading,
  selectPageKey,
};
