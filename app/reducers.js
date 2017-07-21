/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as form } from 'redux-form/immutable';
import signUpPageReducer from 'containers/SignUpPage/reducers';
import myCatalogPageReducer from 'containers/Catalog/MyCatalogPage/reducers';
import channelsCatalogPageReducer from 'containers/Catalog/ChannelsCatalogPage/reducers';
import productProfilePageReducer from 'containers/ProductProfilePage/reducers';
import productCreatePageReducer from 'containers/ProductCreatePage/reducers';
import productImportPageReducer from 'containers/ProductImportPage/reducers';
import receivedOrdersPageReducer from 'containers/Fulfillment/ReceivedOrdersPage/reducers';
import sentOrdersPageReducer from 'containers/Fulfillment/SentOrdersPage/reducers';
import orderProfilePageReducer from 'containers/Fulfillment/OrderProfilePage/reducers';
import myStorePageReducer from 'containers/MyStorePage/reducers';
import discoverPageReducer from 'containers/Marketplace/DiscoverPage/reducers';
import requestsPageReducer from 'containers/Marketplace/RequestsPage/reducers';
import channelsPageReducer from 'containers/Marketplace/ChannelsPage/reducers';
import storeProfilePageReducer from 'containers/Marketplace/StoreProfilePage/reducers';
import checkoutPageReducer from 'containers/CheckoutPage/reducers';
import conversationsPageReducer from 'containers/ConversationsPage/reducers';
import conversationPageReducer from 'containers/ConversationPage/reducers';
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
    myCatalogPage: myCatalogPageReducer,
    channelsCatalogPage: channelsCatalogPageReducer,
    productProfilePage: productProfilePageReducer,
    productCreatePage: productCreatePageReducer,
    productImportPage: productImportPageReducer,
    receivedOrdersPage: receivedOrdersPageReducer,
    sentOrdersPage: sentOrdersPageReducer,
    orderProfilePage: orderProfilePageReducer,
    myStorePage: myStorePageReducer,
    discoverPage: discoverPageReducer,
    requestsPage: requestsPageReducer,
    channelsPage: channelsPageReducer,
    storeProfilePage: storeProfilePageReducer,
    checkoutPage: checkoutPageReducer,
    conversationsPage: conversationsPageReducer,
    conversationPage: conversationPageReducer,
    ...asyncReducers,
  });
}
