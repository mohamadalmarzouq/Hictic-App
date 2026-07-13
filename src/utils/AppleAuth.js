import {appleAuth} from '@invertase/react-native-apple-authentication';
import EncryptedStorage from 'react-native-encrypted-storage';

class AppleAuth {
  loginWithApple = async (onSuccess, onFailure) => {
    try {
      // request apple signin
      let appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get state of user
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // if user is authorized
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // fetch stored credentials
        const storedCredentials = await EncryptedStorage.getItem(
          'user_apple_credentials',
        );

        // if have stored credentials and are same with current account
        if (
          storedCredentials &&
          JSON.parse(storedCredentials).user === appleAuthRequestResponse.user
        ) {
          // set stored credentials
          appleAuthRequestResponse = JSON.parse(storedCredentials);
        } else {
          // store new credentials
          await EncryptedStorage.setItem(
            'user_apple_credentials',
            JSON.stringify(appleAuthRequestResponse),
          );
        }

        // return credentials
        onSuccess(appleAuthRequestResponse);
      } else {
        console.log('Not Authorized ->', credentialState);

        onFailure && onFailure('Not Authorized ->', credentialState);
      }
    } catch (error) {
      console.log('AppleAuth Error ->', error);

      onFailure && onFailure(error);
    }
  };
}

export default new AppleAuth();
