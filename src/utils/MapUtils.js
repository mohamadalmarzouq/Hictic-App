import Geolocation from 'react-native-geolocation-service';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
// import OpenSettings from 'react-native-open-settings';

async function hasLocationPermissions() {
  if (
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
  ) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) return true;

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  console.log(status);

  if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

  // status is PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN is handled on error response thats why allow
  if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) return true;

  // else status is PermissionsAndroid.RESULTS.DENIED then return false
  return false;
}

function openSettingModal() {
  Alert.alert(
    'Permission required',
    'Need permissions to access location',
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

export async function getLocation() {
  const hasLocationPermission = await hasLocationPermissions();

  if (!hasLocationPermission) return;

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position.coords);
        // console.log(position);
      },
      error => {
        // console.log(error);
        if (error.code === 1) {
          openSettingModal();
        } else {
          reject(error.message);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
}
