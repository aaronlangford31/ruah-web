import { createSelector } from 'reselect';

const selectStoreProfilePage = () => (state) => state.get('storeProfilePage');

const selectCurrentStore = () => createSelector(
  selectStoreProfilePage(),
  (state) => state.get('currentStore').toJS(),
);

const selectCurrentStoreId = () => createSelector(
  selectStoreProfilePage(),
  (state) => state.get('currentStoreId'),
);

const selectLoading = () => createSelector(
  selectStoreProfilePage(),
  (state) => state.get('loading'),
);

const selectNotFound = () => createSelector(
  selectStoreProfilePage(),
  (state) => state.get('notFound'),
);

export {
  selectCurrentStore,
  selectCurrentStoreId,
  selectLoading,
  selectNotFound,
};
