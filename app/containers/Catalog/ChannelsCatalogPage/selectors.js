import { createSelector } from 'reselect';

const selectChannelCatalogPage = () => (state) => state.get('channelsCatalogPage');

const selectProducts = () => createSelector(
  selectChannelCatalogPage(),
  (state) => state.get('products').toJS(),
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
  selectProducts,
  selectFilteredProducts,
  selectLoading,
  selectAutocomplete,
};
