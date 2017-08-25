import { createSelector } from 'reselect';

const selectProductPage = () => (state) => state.get('myStoreProductsPage');

const selectProducts = () => createSelector(
  selectProductPage(),
  (state) => state.get('products').toJS(),
);

const selectLoading = () => createSelector(
  selectProductPage(),
  (state) => state.get('loading'),
);

export {
  selectProducts,
  selectLoading,
};
