// @flow
// Facebook Settings
export const FACEBOOK_APP_ID = '';
export const FACEBOOK_PERMISSIONS = ['email', 'public_profile'];
export const PROFILE_REQUEST_PARAMS = {
  fields: {
    string:
      'id, name, email, first_name, last_name, gender, verified, picture.type(large), birthday, hometown',
  },
};
export function profileRequestConfig(accessToken) {
  return {
    accessToken,
    parameters: PROFILE_REQUEST_PARAMS,
  };
}

export const googleProfileRequestConfig = {
  // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  scopes: ['email'],
  webClientId:
    '412203085099-pve4gg0piisoho42p1l4k9g0rniuqf1f.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  // '598023828025-pq9u57p05r2o4ijekfm7k6miip5p1j5i.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
};
