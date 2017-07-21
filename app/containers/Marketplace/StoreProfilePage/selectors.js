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

const selectCurrentStoreProducts = () => createSelector(
  selectStoreProfilePage(),
  (state) => state.get('currentStoreProducts').toJS(),
);

export {
  selectCurrentStore,
  selectCurrentStoreProducts,
  selectCurrentStoreId,
  selectLoading,
  selectNotFound,
};
