/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as form } from 'redux-form/immutable';
import signUpPageReducer from 'containers/SignUpPage/reducers';
import catalogPageReducer from 'containers/CatalogPage/reducers';
import productCreatePageReducer from 'containers/ProductCreatePage/reducers';
import productImportPageReducer from 'containers/ProductImportPage/reducers';
import ordersPageReducer from 'containers/OrdersPage/reducers';
import appReducer from 'containers/App/reducers';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    form,
    route: routeReducer,
    app: appReducer,
    signUpPage: signUpPageReducer,
    catalogPage: catalogPageReducer,
    productCreatePage: productCreatePageReducer,
    productImportPage: productImportPageReducer,
    ordersPage: ordersPageReducer,
    ...asyncReducers,
  });
}
