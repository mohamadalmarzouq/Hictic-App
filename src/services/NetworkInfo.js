import NetInfo from '@react-native-community/netinfo';

let unsubscribe;

class NetworkInfo {
  networkInfoListener(dispatch, networkInfoAction) {
    let timer = null;
    NetInfo.fetch().then(state => {
      dispatch(networkInfoAction(state.isConnected));
    });

    unsubscribe = NetInfo.addEventListener(state => {
      // console.log("=================>>> Network Status Change <<<================== ");
      // console.log("=========== Network Status ============ ", isNetworkConnected);
      // console.log("=================>>> Network Status Change <<<================== ");

      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(networkInfoAction(state.isConnected));
      }, 300);

      // dispatch(
      //   generalSaveAction(CONNECT_SOCKET_ON_NETWORK_CONNECTION, {
      //     isNetworkConnected
      //   })
      // );
    });
  }

  removeNetworkInfoListener(dispatch, networkInfoAction) {
    unsubscribe && unsubscribe();

    NetInfo.fetch().then(state => {
      dispatch(networkInfoAction(state.isConnected));
    });
  }
}

export default new NetworkInfo();
