import { createSelector } from 'reselect';

const selectProductProfilePage = () => (state) => state.get('productProfilePage');

const selectCurrentProduct = () => createSelector(
  selectProductProfilePage(),
  (state) => state.get('currentProduct').toJS(),
);

const selectCurrentProductId = () => createSelector(
  selectProductProfilePage(),
  (state) => state.get('currentProductId'),
);

const selectLoading = () => createSelector(
  selectProductProfilePage(),
  (state) => state.get('loading'),
);

const selectNotFound = () => createSelector(
  selectProductProfilePage(),
  (state) => state.get('notFound'),
);

export {
  selectCurrentProduct,
  selectCurrentProductId,
  selectLoading,
  selectNotFound,
};
