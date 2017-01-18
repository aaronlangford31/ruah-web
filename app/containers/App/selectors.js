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

const selectLoginPage = () => (state) => state.get('loginPage');

const selectAuthenticated = () => createSelector(
  selectLoginPage(),
  (state) => state.get('authenticated'),
);

const selectUserType = () => createSelector(
  selectLoginPage(),
  (state) => state.get('userType'),
);

export {
  selectAuthenticated,
  selectLocationState,
  selectUserType,
};
