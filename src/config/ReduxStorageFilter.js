// import filter from 'redux-storage-decorator-filter';
// import createEngine from 'redux-storage-engine-reactnativeasyncstorage';

// const REDUX_STORAGE = filter(
//   createEngine('AppTree'),
//   ['whitelisted-key', ['user', 'data'], ['home', 'data']],
//   [],
// );

// export default REDUX_STORAGE;

export const whiteList = [
  'user',      // corresponds to ['user', 'data'] in old filter
  'home',      // corresponds to ['home', 'data'] in old filter
  'whitelisted-key', // if you still need this top-level key persisted
];