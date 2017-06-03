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

const selectUserType = () => createSelector(
  selectLoginPage(),
  (state) => state.get('userType'),
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

export {
  selectLocationState,
  selectUserType,
  selectLoggedIn,
  selectLoginFields,
  selectError,
  selectLoading,
};
