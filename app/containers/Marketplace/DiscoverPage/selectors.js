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

const selectChannelRequest = () => createSelector(
  selectDiscoverPage(),
  (state) => state.get('channelRequest').toJS()
);

const selectChannelRequestModalOpen = () => createSelector(
  selectDiscoverPage(),
  (state) => state.get('channelRequestModalOpen')
);

export {
  selectStores,
  selectLoading,
  selectChannelRequest,
  selectChannelRequestModalOpen,
};
