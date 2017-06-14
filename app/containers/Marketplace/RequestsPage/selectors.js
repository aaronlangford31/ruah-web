import { createSelector } from 'reselect';

const selectRequestsPage = () => (state) => state.get('requestsPage');

const selectReceivedRequests = () => createSelector(
  selectRequestsPage(),
  (state) => state.get('receivedRequests').toJS()
);

const selectLoading = () => createSelector(
  selectRequestsPage(),
  (state) => state.get('loading'),
);

export {
  selectReceivedRequests,
  selectLoading,
};
