import Permissions, {RESULTS, PERMISSIONS} from 'react-native-permissions';
import {Platform, Alert, Linking} from 'react-native';
// import {PERMISSIONS} from 'react-native-permissions';

// Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'

function openSettingModal(
  title = 'Permission required',
  description = 'Need permissions to access camera',
) {
  Alert.alert(
    title,
    description,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open Settings',
        onPress: () => Linking.openSettings(),
      },
    ],
    {cancelable: false},
  );
}

export function checkAndRequestPermission(
  type = Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.CAMERA
    : PERMISSIONS.IOS.CAMERA,
  title = 'Permission required',
  description = 'Need permissions to access camera',
) {
  console.log('Inside checkAndRequestPermission', type);
  return new Promise((resolve, reject) => {
    console.log('Promise ', type);
    Permissions.check(type).then(result => {
      console.log('Permissions check type', result);
      if (result === RESULTS.BLOCKED) {
        console.log('result blocked', result);
        reject();
        openSettingModal(title, description);
      } else {
        console.log('else result', result);
        Permissions.request(type).then(result => {
          // result = 'granted';
          console.log('type = ', type);
          if (result === RESULTS.GRANTED) {
            console.log('resolve GRANTED', result);
            resolve();
          }
          console.log('After If condition ', result);
        });
      }
    });
  });
}
