// @flow
// import base64 from "base-64";
import {create} from 'apisauce';
import {eventChannel, END} from 'redux-saga';
// import UserAgent from 'react-native-user-agent';
import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  API_PASSWORD,
  API_USER_NAME,
  API_SECRET_KEY,
  API_USER_AGENT,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_KICK_USER,
  ERROR_SESSION_EXPIRED,
} from '../config/WebService';
import DataHandler from './DataHandler';
import {Actions} from 'react-native-router-flux';
import {generalDispatchType} from '../actions/GeneralAction';
import {LOGOUT_USER} from '../actions/ActionTypes';
import { navNavigate, navReset } from '../navigator';

const TIME = new Date().getTime();
let enableLogout = true;
const api = create({
  baseURL: BASE_URL,
  headers: {
    // Authorization: `Basic ${base64.encode(`${API_USER_NAME}:${API_PASSWORD}`)}`
    // "X-Authorization-Token": md5.str_md5(
    //   API_SECRET_KEY + TIME + UserAgent.getUserAgent()
    // ),
    // "X-Authorization-Time": TIME
  },
  timeout: API_TIMEOUT,
});

class ApiSauce {
  async post(url, data, headersData) {
    const access_token =
      DataHandler?.getStore()?.getState()?.user?.data?.access_token;

    let headers = {...headersData};
    if (access_token) {
      headers = {...headers, 'X-Access-Token': access_token};
    }

    const response = await api.post(url, data, {
      headers,
    });

    console.log('url', url);
    console.log('response', response);
    // console.log("data", JSON.stringify(data));
    console.log('data', data);

    if (__DEV__ && API_LOG) {
      console.log(response);
    }
    return new Promise((resolve, reject) => {
      if (response.ok && response.data && response.data.api_status) {
        resolve(response.data);
      } else {
        if (response?.data?.status_code === 403) {
          if (enableLogout) {
            enableLogout = false;
            setTimeout(() => {
              enableLogout = true;
              reject(ERROR_SESSION_EXPIRED);
              // Actions.loginNavigator();
              // navNavigate("AuthRoot")
              navReset("AuthRoot")
              DataHandler.getStore().dispatch(generalDispatchType(LOGOUT_USER));
            }, 1000);
          }
          return;
        }
        if (response.status === 500 || response.status === 404) {
          // 404 invalid route
          // 500 api crash
          reject(ERROR_SOMETHING_WENT_WRONG);
        }
        if (response.problem === 'NETWORK_ERROR') {
          reject(ERROR_NETWORK_NOT_AVAILABLE);
        }
        reject(response.data || ERROR_SOMETHING_WENT_WRONG);
      }
    });
  }

  async get(url, data, headersData) {
    // console.log("API_SECRET_KEY", API_SECRET_KEY);
    // console.log("TIME", TIME);
    // console.log("API_USER_AGENT", UserAgent.getUserAgent());
    // console.log("MD5", md5.str_md5(API_SECRET_KEY + TIME + API_USER_AGENT));

    const access_token =
      DataHandler?.getStore()?.getState()?.user?.data?.access_token;
    let headers = {...headersData};
    if (access_token) {
      headers = {...headers, 'X-Access-Token': access_token};
    }
    const response = await api.get(url, data, {
      headers,
    });

    console.log('url', url);
    console.log('response', response);
    // console.log("data", JSON.stringify(data));
    console.log('data', data);

    return new Promise((resolve, reject) => {
      if (response.ok && response.data && response.data.api_status) {
        resolve(response.data);
      } else {
        if (response?.data?.status_code === 403) {
          if (enableLogout) {
            enableLogout = false;
            setTimeout(() => {
              enableLogout = true;
              reject(ERROR_SESSION_EXPIRED);
              // Actions.loginNavigator();
              // navNavigate("AuthRoot")
              navReset("AuthRoot")
              DataHandler.getStore().dispatch(generalDispatchType(LOGOUT_USER));
            }, 1000);
          }
          return;
        }
        if (response.status === 500 || response.status === 404) {
          // 404 invalid route
          // 500 api crash
          reject(ERROR_SOMETHING_WENT_WRONG);
        }
        if (response.problem === 'NETWORK_ERROR') {
          reject(ERROR_NETWORK_NOT_AVAILABLE);
        }
        reject(response.data || ERROR_SOMETHING_WENT_WRONG);
      }
    });
  }

  postWithProgress(url, data, headersData) {
    // console.log("url", url);
    // console.log("data", JSON.stringify(data));
    const access_token =
      DataHandler?.getStore()?.getState()?.user?.data?.access_token;

    let headers = {...headersData};
    if (access_token) {
      headers = {...headers, 'X-Access-Token': access_token};
    }

    return eventChannel(emitter => {
      api
        .post(url, data, {
          headers,
          onUploadProgress: e => {
            if (e.lengthComputable) {
              const progress = Math.round((e.loaded / e.total) * 100);
              emitter({progress});
            }
          },
        })
        .then(
          response => {
            if (response.ok && response.data && response.data.api_status) {
              emitter({success: response.data.data});
              emitter(END);
            } else if (response.problem === 'NETWORK_ERROR') {
              emitter({err: ERROR_NETWORK_NOT_AVAILABLE});
              emitter(END);
            } else {
              emitter({err: ERROR_SOMETHING_WENT_WRONG});
              emitter(END);
            }
          },
          err => {
            if (err.problem === 'NETWORK_ERROR') {
              emitter({err: ERROR_NETWORK_NOT_AVAILABLE});
              emitter(END);
            } else {
              emitter({err: ERROR_SOMETHING_WENT_WRONG});
              emitter(END);
            }
          },
        );

      return () => {};
    });
  }
}

export default new ApiSauce();
