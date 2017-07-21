import { createSelector } from 'reselect';

const selectMyCatalogPage = () => (state) => state.get('myCatalogPage');

const selectProducts = () => createSelector(
  selectMyCatalogPage(),
  (state) => state.get('products').toJS(),
);

const selectLoading = () => createSelector(
  selectMyCatalogPage(),
  (state) => state.get('loading'),
);

export {
  selectProducts,
  selectLoading,
};
