import { createSelector } from 'reselect';

const selectCatalogPage = () => (state) => state.get('catalogPage');

const selectProducts = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('products').toJS(),
);

const selectLoading = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('loading'),
);

export {
  selectProducts,
  selectLoading,
};
