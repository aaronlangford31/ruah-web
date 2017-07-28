import { createSelector } from 'reselect';

/**
 * The global state selectors
 */

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectLoginPage = () => (state) => state.get('app');

const selectUserId = () => createSelector(
  selectLoginPage(),
  (state) => state.get('userId'),
);

const selectStoreId = () => createSelector(
  selectLoginPage(),
  (state) => state.get('storeId'),
);

const selectStore = () => createSelector(
  selectLoginPage(),
  (state) => state.get('store').toJS(),
);

const selectLoggedIn = () => createSelector(
  selectLoginPage(),
  (state) => state.get('loggedIn'),
);

const selectForms = () => (state) => state.get('form');

const selectLoginFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['loginForm', 'values']),
);

const selectError = () => createSelector(
  selectLoginPage(),
  (state) => state.get('error') || '',
);

const selectLoading = () => createSelector(
  selectLoginPage(),
  (state) => state.get('loading'),
);

const selectLocationOnSuccess = () => createSelector(
  selectLoginPage(),
  (state) => state.get('locationOnSuccess'),
);

const selectSearchResults = () => createSelector(
  selectLoginPage(),
  (state) => state.get('searchResults').toJS(),
);

export {
  selectLocationState,
  selectUserId,
  selectStoreId,
  selectLoggedIn,
  selectLoginFields,
  selectError,
  selectLoading,
  selectStore,
  selectLocationOnSuccess,
  selectSearchResults,
};
