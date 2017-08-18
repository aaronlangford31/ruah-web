// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

import AppSaga from 'containers/App/sagas';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  injectSagas(AppSaga);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/introduction',
      name: 'introduction',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/IntroductionPage/reducers'),
          System.import('containers/IntroductionPage/sagas'),
          System.import('containers/IntroductionPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('introductionPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/sign-up',
      name: 'sign-up',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SignUpPage/reducers'),
          System.import('containers/SignUpPage/sagas'),
          System.import('containers/SignUpPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signUpPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/catalog/myproduct',
      name: 'myCatalogPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Catalog/MyCatalogPage/reducers'),
          System.import('containers/Catalog/MyCatalogPage/sagas'),
          System.import('containers/Catalog/MyCatalogPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('myCatalogPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/catalog/channels',
      name: 'channelsCatalogPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Catalog/ChannelsCatalogPage/reducers'),
          System.import('containers/Catalog/ChannelsCatalogPage/sagas'),
          System.import('containers/Catalog/ChannelsCatalogPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('channelsCatalogPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/product/create',
      name: 'product-create',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ProductCreatePage/reducers'),
          System.import('containers/ProductCreatePage/sagas'),
          System.import('containers/ProductCreatePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('productCreatePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/product/import',
      name: 'product-import',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ProductImportPage/reducers'),
          System.import('containers/ProductImportPage/sagas'),
          System.import('containers/ProductImportPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('productImportPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/product/:productId',
      name: 'product-profile',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ProductProfilePage/reducers'),
          System.import('containers/ProductProfilePage/sagas'),
          System.import('containers/ProductProfilePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('productProfilePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/fulfillment/order/:orderId',
      name: 'order-profile',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Fulfillment/OrderProfilePage/reducers'),
          System.import('containers/Fulfillment/OrderProfilePage/sagas'),
          System.import('containers/Fulfillment/OrderProfilePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('orderProfilePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/fulfillment/received',
      name: 'receivedOrders',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Fulfillment/ReceivedOrdersPage/reducers'),
          System.import('containers/Fulfillment/ReceivedOrdersPage/sagas'),
          System.import('containers/Fulfillment/ReceivedOrdersPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('receivedOrdersPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/fulfillment/sent',
      name: 'sentOrders',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Fulfillment/SentOrdersPage/reducers'),
          System.import('containers/Fulfillment/SentOrdersPage/sagas'),
          System.import('containers/Fulfillment/SentOrdersPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('sentOrdersPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/myStore',
      name: 'myStore',

      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/MyStorePage/reducers'),
          System.import('containers/MyStorePage/sagas'),
          System.import('containers/MyStorePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('myStorePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/marketplace/discover',
      name: 'discoverPage',

      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Marketplace/DiscoverPage/reducers'),
          System.import('containers/Marketplace/DiscoverPage/sagas'),
          System.import('containers/Marketplace/DiscoverPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('discoverPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/marketplace/requests',
      name: 'requestsPage',

      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Marketplace/RequestsPage/reducers'),
          System.import('containers/Marketplace/RequestsPage/sagas'),
          System.import('containers/Marketplace/RequestsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('requestsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/marketplace/channels',
      name: 'channelsPage',

      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Marketplace/ChannelsPage/reducers'),
          System.import('containers/Marketplace/ChannelsPage/sagas'),
          System.import('containers/Marketplace/ChannelsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('channelsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/marketplace/store/:storeId',
      name: 'storeProfilePage',

      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Marketplace/StoreProfilePage/reducers'),
          System.import('containers/Marketplace/StoreProfilePage/sagas'),
          System.import('containers/Marketplace/StoreProfilePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('storeProfilePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/billing/received',
      name: 'receivedInvoicesPage',

      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Billing/ReceivedInvoicesPage/reducers'),
          System.import('containers/Billing/ReceivedInvoicesPage/sagas'),
          System.import('containers/Billing/ReceivedInvoicesPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('receivedInvoicesPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/conversations',
      name: 'conversationsPage',

      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ConversationsPage/reducers'),
          System.import('containers/ConversationsPage/sagas'),
          System.import('containers/ConversationsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('conversationsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/conversation/:channelId',
      name: 'conversationPage',

      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ConversationPage/reducers'),
          System.import('containers/ConversationPage/sagas'),
          System.import('containers/ConversationPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('conversationPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/search/:query',
      name: 'searchPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/SearchPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/feed',
      name: 'feedPage',

      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/FeedPage/reducers'),
          System.import('containers/FeedPage/sagas'),
          System.import('containers/FeedPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('feedPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
