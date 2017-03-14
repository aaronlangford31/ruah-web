/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectOrderProfilePage = () => (state) => state.get('orderProfilePage');

const selectCurrentOrder = () => createSelector(
  selectOrderProfilePage(),
  (state) => state.get('currentOrder').toJS(),
);

const selectCurrentOrderId = () => createSelector(
  selectOrderProfilePage(),
  (state) => state.get('currentOrderId'),
);

const selectCurrentOrderLoaded = () => createSelector(
  selectOrderProfilePage(),
  (state) => state.get('currentOrderLoaded'),
);

const selectLoading = () => createSelector(
  selectOrderProfilePage(),
  (state) => state.get('loading'),
);

export {
  selectCurrentOrder,
  selectCurrentOrderId,
  selectCurrentOrderLoaded,
  selectLoading,
};
