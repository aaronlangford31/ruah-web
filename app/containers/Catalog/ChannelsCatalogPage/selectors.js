import { createSelector } from 'reselect';

const selectChannelCatalogPage = () => (state) => state.get('channelsCatalogPage');

const selectProducts = () => createSelector(
  selectChannelCatalogPage(),
  (state) => state.get('products').toJS(),
);

const selectVisibleProducts = () => createSelector(
  selectChannelCatalogPage(),
  (state) => state.get('visibleProducts').toJS(),
);

const selecetVisibleStartIx = () => createSelector(
  selectChannelCatalogPage(),
  (state) => state.get('visibleStartIx'),
);

const selectLoading = () => createSelector(
  selectChannelCatalogPage(),
  (state) => state.get('loading'),
);

const selectFilteredProducts = () => createSelector(
  selectChannelCatalogPage(),
  (state) => state.get('filteredProducts').toJS()
);

const selectAutocomplete = () => createSelector(
  selectChannelCatalogPage(),
  (state) => state.get('autocomplete').toArray()
);

export {
  selectVisibleProducts,
  selecetVisibleStartIx,
  selectProducts,
  selectFilteredProducts,
  selectLoading,
  selectAutocomplete,
};
