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
      path: '/catalog',
      name: 'catalog',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/CatalogPage/reducers'),
          System.import('containers/CatalogPage/sagas'),
          System.import('containers/CatalogPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('catalogPage', reducer.default);
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
      path: '/order/:orderId',
      name: 'order-profile',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/OrderProfilePage/reducers'),
          System.import('containers/OrderProfilePage/sagas'),
          System.import('containers/OrderProfilePage'),
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
      path: '/orders',
      name: 'orders',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/OrdersPage/reducers'),
          System.import('containers/OrdersPage/sagas'),
          System.import('containers/OrdersPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('ordersPage', reducer.default);
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
