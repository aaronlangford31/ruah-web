import { createSelector } from 'reselect';

const selectProductPage = () => (state) => state.get('myStoreProductsPage');

const selectProducts = () => createSelector(
  selectProductPage(),
  (state) => state.get('products').toJS(),
);

const selectFilteredProducts = () => createSelector(
  selectProductPage(),
  (state) => state.get('filteredProducts').toJS(),
);

const selectLoading = () => createSelector(
  selectProductPage(),
  (state) => state.get('loading'),
);

export {
  selectProducts,
  selectFilteredProducts,
  selectLoading,
};
