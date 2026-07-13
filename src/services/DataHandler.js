let isLoggedIn = false;
let store;

export default {
  setLogin(value) {
    isLoggedIn = value;
  },
  isLoggedIn() {
    return isLoggedIn;
  },
  setStore(value) {
    store = value;
  },
  getStore() {
    return store;
  },
};
