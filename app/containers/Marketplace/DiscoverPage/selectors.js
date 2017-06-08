import { createSelector } from 'reselect';

const selectDiscoverPage = () => (state) => state.get('discoverPage');

const selectStores = () => createSelector(
  selectDiscoverPage(),
  (state) => state.get('stores').toJS(),
);

const selectLoading = () => createSelector(
  selectDiscoverPage(),
  (state) => state.get('loading'),
);

export {
  selectStores,
  selectLoading,
};
