// // @flow
// import * as storage from 'redux-storage';
// import {createLogger} from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';
// import {composeWithDevTools} from 'remote-redux-devtools';
// import {compose, createStore, applyMiddleware} from 'redux';
// import reduxStorageFilter from '../config/ReduxStorageFilter';
// import applyAppStateListener from 'redux-enhancer-react-native-appstate';

// import sagas from '../sagas';

// // const isDebuggingInChrome = false;
// const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

// const logger = createLogger({
//   predicate: () => isDebuggingInChrome,
//   collapsed: true,
//   duration: true,
//   diff: true,
// });

// export default function configureStore(reducers, onComplete: Function) {
//   const storeMiddleware = storage.createMiddleware(reduxStorageFilter);
//   const sagaMiddleware = createSagaMiddleware();
//   const appStateListener = applyAppStateListener();
//   console.log('reducers', reducers);
//   const store = createStore(
//     storage.reducer(reducers),
//     composeWithDevTools(
//       __DEV__
//         ? compose(
//             appStateListener,
//             applyMiddleware(sagaMiddleware, storeMiddleware, logger),
//           )
//         : compose(
//             appStateListener,
//             applyMiddleware(sagaMiddleware, storeMiddleware, logger),
//           ),
//     ),
//   );

//   if (isDebuggingInChrome) {
//     window.store = store;
//   }

//   const load = storage.createLoader(reduxStorageFilter);

//   load(store)
//     .then(onComplete)
//     .catch(() =>
//       console.log('Failed to load previous state @ configureStore.js#44'),
//     );

//   sagaMiddleware.run(sagas);

//   return store;
// }



// // @flow
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import storage from '@react-native-async-storage/async-storage';
// import createSagaMiddleware from 'redux-saga';
// import { persistStore, persistReducer } from 'redux-persist';
// import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
// import applyAppStateListener from 'redux-enhancer-react-native-appstate';

// import RootReducer from '../reducers'; // your root reducer
// import sagas from '../sagas';
// import { whiteList } from '../config/ReduxStorageFilter'; 

// const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

// export default function configureStore(onComplete: Function) {
//   // Logger middleware
//   const logger = createLogger({
//     predicate: () => isDebuggingInChrome,
//     collapsed: true,
//     duration: true,
//     diff: true,
//   });

//   // Saga middleware
//   const sagaMiddleware = createSagaMiddleware();

//   // App state listener
//   // const appStateListener = applyAppStateListener();

//   // Middleware list
//   const middlewareList = [sagaMiddleware];
//   if (__DEV__) {
//     middlewareList.push(logger);
//   }

//   // Apply middleware + app state listener
//   const middleware = applyMiddleware(...middlewareList);

//   // Persist config
//   const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: whiteList,
//     stateReconciler: autoMergeLevel2,
//   };

//   // Persisted reducer
//   const persistedReducer = persistReducer(persistConfig, RootReducer);

//   // Create store
//   const store = createStore(persistedReducer, middleware);

//   // Expose store in Chrome debugger
//   if (isDebuggingInChrome) {
//     window.store = store;
//   }

//   // Persistor
//   persistStore(store, null, () => onComplete(store));

//   // Run sagas
//   sagaMiddleware.run(sagas);

//   return store;
// }


import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
// import { composeWithDevTools } from "remote-redux-devtools";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import { whiteList } from "../config/ReduxStorageFilter";
import RootReducer from "../reducers";
import RootSaga from "../sagas";

// check if chrome debugger is on
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export default function configureStore(onComplete: Function) {
  // init logger
  const logger = createLogger({
    // predicate: () => isDebuggingInChrome,
    collapsed: true,
    duration: true,
    diff: true,
  });

  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // create list of middleware
  const middlewareList = [sagaMiddleware];
  if (__DEV__) {
    // if dev push logger middle ware
    middlewareList.push(logger);
  }

  // init middleware with list
  const middleware = applyMiddleware(...middlewareList);

  // init persist config - set which reducers to save
  const persistConfig = {
    key: "root",
    storage,
    whitelist: whiteList,
    stateReconciler: autoMergeLevel2,
  };

  // init redux persist reducer
  const persistedReducer = persistReducer(persistConfig, RootReducer);

  // create store with remote dev tools
  //const composeEnhancers = composeWithDevTools({ realtime: true });
  const store = createStore(persistedReducer, middleware);

  // set store in window
  if (isDebuggingInChrome) {
    window.store = store;
  }

  // init store with redux persist
  persistStore(store, null, () => onComplete(store));

  // then run the saga
  sagaMiddleware.run(RootSaga);
}
