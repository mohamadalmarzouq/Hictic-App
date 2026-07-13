import ImagePicker from 'react-native-image-crop-picker';
import {RESULTS, check, request, PERMISSIONS} from 'react-native-permissions';
import {PICKER_TYPE, IMAGE_COMPRESS_MAX_WIDTH} from '../constants';
import {Alert, Platform, Linking} from 'react-native';

const IMAGE_PICKER_OPTIONS = {
  includeExif: false, // Include image details in the response
  includeBase64: false, // (default false) | image as a base64-encoded string in the data property
  mediaType: 'photo', // default 'any' | ('photo', 'video', or 'any')
  useFrontCamera: false, // (default false) 'front' or 'selfie' camera when opened

  /* multiple selection  */
  multiple: false,
  waitAnimationEnd: false, // (ios only) default true
  forceJpg: true, // (ios only) default false

  /* Should be use without cropping, just resizing after selection  */
  compressImageMaxWidth: IMAGE_COMPRESS_MAX_WIDTH,
  compressImageMaxHeight: IMAGE_COMPRESS_MAX_WIDTH,
  compressImageQuality: 0.5, // default 1 (Android) | 0.8 (iOS))

  /* Should be use when cropping */
  // Metrics.screenWidth
  width: IMAGE_COMPRESS_MAX_WIDTH, // only work with cropping
  height: IMAGE_COMPRESS_MAX_WIDTH, // only work with cropping
  cropping: false,
  cropperCircleOverlay: false, // Enable or disable circular cropping mask.
  enableRotationGesture: false, // (android only) default false
  freeStyleCropEnabled: true, // (android only) default false | Enable custom rectangle area for cropping
};

const CAMERA_PERMISSION =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.CAMERA
    : PERMISSIONS.IOS.CAMERA;

const GALLERY_PERMISSION =
  Platform.OS === 'android'
    ? Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    : PERMISSIONS.IOS.PHOTO_LIBRARY;

class ImagePickerHelper {
  /**
   *
   * Show Picker
   *
   * @param {*} callback callback handle response
   * @param {*} pickerTypeCamera
   * @param {*} cameraOptions
   * @param {*} pickerTypeGallery
   * @param {*} galleryOptions
   */
  showImagePicker(
    callback,
    pickerTypeCamera = PICKER_TYPE.CAMERA,
    cameraOptions = {},
    pickerTypeGallery = PICKER_TYPE.GALLERY,
    galleryOptions = {},
  ) {
    this.checkPermission(() => {
      Platform.OS === 'ios'
        ? this.showPickerIOS(
            callback,
            pickerTypeCamera,
            cameraOptions,
            pickerTypeGallery,
            galleryOptions,
          )
        : this.showPickerAndroid(
            callback,
            pickerTypeCamera,
            cameraOptions,
            pickerTypeGallery,
            galleryOptions,
          );
    });
  }

  showPickerAndroid(...args) {
    Alert.alert('Select Image', null, [
      {text: 'Camera', onPress: () => this.pickCameraOptions(...args)},
      {text: 'Gallery', onPress: () => this.pickGalleryOptions(...args)},
      {text: 'Cancel', onPress: () => console.log('Cancel')},
    ]);
  }

  showPickerIOS(...args) {
    Alert.alert('Select Image', null, [
      {text: 'Camera', onPress: () => this.pickCameraOptions(...args)},
      {text: 'Gallery', onPress: () => this.pickGalleryOptions(...args)},
      {text: 'Cancel', onPress: () => console.log('Cancel')},
    ]);
  }

  pickCameraOptions(...args) {
    let [
      callback,
      pickerTypeCamera,
      cameraOptions,
      pickerTypeGallery,
      galleryOptions,
    ] = args;

    console.log('pickerTypeGallery : ', pickerTypeGallery);
    //this.pickImageFromCameraWithCropping(callback, cameraOptions);

    switch (pickerTypeCamera) {
      case PICKER_TYPE.CAMERA:
      case PICKER_TYPE.CAMERA_BINARY_DATA:
        this.pickImageFromCamera(callback, cameraOptions);
        break;
      case PICKER_TYPE.CAMERA_WITH_CROPPING:
      case PICKER_TYPE.CAMERA_WITH_CROPPING_BINARY_DATA:
        this.pickImageFromCameraWithCropping(callback, cameraOptions);
        break;
    }
  }

  pickGalleryOptions(...args) {
    let [
      callback,
      pickerTypeCamera,
      cameraOptions,
      pickerTypeGallery,
      galleryOptions,
    ] = args;

    console.log('pickerTypeGallery : ', pickerTypeGallery);
    // this.pickImageFromGalleryWithCropping(callback, galleryOptions);

    switch (pickerTypeGallery) {
      case PICKER_TYPE.GALLERY:
      case PICKER_TYPE.GALLERY_BINARY_DATA:
        this.pickImageFromGallery(callback, galleryOptions);
        break;
      case PICKER_TYPE.GALLERY_WITH_CROPPING:
      case PICKER_TYPE.GALLERY_WITH_CROPPING_BINARY_DATA:
        this.pickImageFromGalleryWithCropping(callback, galleryOptions);
        break;
      case PICKER_TYPE.MULTI_PICK:
      case PICKER_TYPE.MULTI_PICK_BINARY_DATA:
        this.pickMultiple(callback, galleryOptions);
        break;
    }
  }

  /**
   * Pick image from camera
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *
   */
  pickImageFromCamera(callback, options = {}) {
    options = {...IMAGE_PICKER_OPTIONS, ...options};

    // clean all images
    // this.cleanupImages();

    ImagePicker.openCamera({
      compressImageMaxWidth: options.compressImageMaxWidth,
      compressImageMaxHeight: options.compressImageMaxHeight,
      compressImageQuality: options.compressImageQuality,
      mediaType: options.mediaType,
      includeExif: options.includeExif,
      includeBase64: options.includeBase64,
    })
      .then(image => {
        let path = this.getImageUriFromData(options.includeBase64, image);
        const imageData = {...image, path};
        console.log('image Data', imageData);
        callback && callback(imageData);
      })
      .catch(e => this.handleError(e));
  }

  /**
   * Pick image from camera with cropping functionality
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *
   */
  pickImageFromCameraWithCropping(callback, options = {}) {
    options = {...IMAGE_PICKER_OPTIONS, ...options};

    // clean all images
    // this.cleanupImages();

    ImagePicker.openCamera({
      width: options.width,
      height: options.height,
      cropping: true,
      cropperCircleOverlay: options.cropperCircleOverlay,
      enableRotationGesture: options.enableRotationGesture,
      mediaType: options.mediaType,
      includeExif: options.includeExif,
      includeBase64: options.includeBase64,
    })
      .then(image => {
        let path = this.getImageUriFromData(options.includeBase64, image);
        const imageData = {...image, path};
        console.log('image Data', imageData);
        callback && callback(imageData);
      })
      .catch(e => this.handleError(e));
  }

  /**
   * Pick image from gallery
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *
   */
  pickImageFromGallery(callback, options = {}) {
    options = {...IMAGE_PICKER_OPTIONS, ...options};

    // clean all images
    // this.cleanupImages();

    ImagePicker.openPicker({
      compressImageMaxWidth: options.compressImageMaxWidth,
      compressImageMaxHeight: options.compressImageMaxHeight,
      compressImageQuality: options.compressImageQuality,
      mediaType: options.mediaType,
      includeExif: options.includeExif,
      includeBase64: options.includeBase64,
    })
      .then(image => {
        let path = this.getImageUriFromData(options.includeBase64, image);
        const imageData = {...image, path};
        console.log('image Data', imageData);
        callback && callback(imageData);
      })
      .catch(e => this.handleError(e));
  }

  /**
   * Pick image from gallery with cropping functionality
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *
   */
  pickImageFromGalleryWithCropping(callback, options = {}) {
    options = {...IMAGE_PICKER_OPTIONS, ...options};

    // clean all images
    // this.cleanupImages();

    ImagePicker.openPicker({
      // width: options.width,
      // height: options.height,
      width: options.width,
      height: options.height,
      cropping: true,
      cropperCircleOverlay: options.cropperCircleOverlay,
      enableRotationGesture: options.enableRotationGesture,
      mediaType: options.mediaType,
      includeExif: options.includeExif,
      includeBase64: options.includeBase64,
    })
      .then(image => {
        let path = this.getImageUriFromData(options.includeBase64, image);
        const imageData = {...image, path};
        console.log('image Data', imageData);
        callback && callback(imageData);
      })
      .catch(e => this.handleError(e));
  }

  /**
   * Pick multiple images
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *
   */
  pickMultiple(callback, options = {}) {
    options = {...IMAGE_PICKER_OPTIONS, ...options};

    // clean all images
    // this.cleanupImages();

    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: options.waitAnimationEnd,
      forceJpg: options.forceJpg,
      compressImageMaxWidth: options.compressImageMaxWidth,
      compressImageMaxHeight: options.compressImageMaxHeight,
      compressImageQuality: options.compressImageQuality,
      mediaType: options.mediaType,
      includeExif: options.includeExif,
      includeBase64: options.includeBase64,
      maxFiles: options.maxFiles || 10,
    })
      .then(images => {
        let imageData = images.map(img => {
          console.log('img.path', img.path);
          let uri =
            img.path || this.getImageUriFromData(options.includeBase64, img);
          return {...img, uri};
        });
        console.log('image Data', JSON.stringify(imageData));
        callback && callback(imageData);
      })
      .catch(e => this.handleError(e));
  }

  /**
   * Clean temp Images
   */
  cleanupImages() {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch(e => this.handleError(e));
  }

  /**
   *
   * Clean single temp image
   *
   * @param {*} image path to be clean
   */
  cleanupSingleImage(image) {
    console.log('will cleanup image', image);

    ImagePicker.cleanSingle(image ? image.uri : null)
      .then(() => {
        console.log(`removed tmp image ${image.uri} from tmp directory`);
      })
      .catch(e => this.handleError(e));
  }

  /**
   *
   * Get image path from response data
   *
   * @param {*} includeBase64
   * @param {*} image
   */
  getImageUriFromData(includeBase64, image) {
    console.log('includeBase64', includeBase64);
    return includeBase64
      ? `data:${image.mime};base64,` + image.data
      : image.path;
  }

  handleError(error) {
    if (error.code && error.code === 'E_PICKER_CANCELLED') return;

    let errorMsg = error.message ? error.message : error;

    Alert.alert('Error', errorMsg);
  }

  openSettingModal() {
    Alert.alert(
      'Permission required',
      'Need permissions to access gallery and camera',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open Settings', onPress: () => Linking.openSettings()},
      ],
      {cancelable: false},
    );
  }

  async handlePermissions(triggerFunc) {
    try {
      const cameraPermission = await request(CAMERA_PERMISSION);
      const photoPermission = await request(GALLERY_PERMISSION);

      if (
        cameraPermission === RESULTS.GRANTED &&
        (photoPermission === RESULTS.GRANTED ||
          photoPermission === RESULTS.LIMITED)
      ) {
        triggerFunc();
      } else {
        console.log('Permissions not granted:', {
          cameraPermission,
          photoPermission,
        });
        // Optionally show a message to the user
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  }

  checkPermission(triggerFunc) {
    Promise.all([
      check(CAMERA_PERMISSION),
      check(GALLERY_PERMISSION),
      // …
    ]).then(([cameraStatus, photoStatus]) => {
      if (cameraStatus === RESULTS.BLOCKED || photoStatus === RESULTS.BLOCKED) {
        this.openSettingModal();
      } else {
        this.handlePermissions(triggerFunc);
      }
    });

    // let permissionAsk = Platform.OS === 'ios' ? 'denied' : 'restricted';
    // Permissions.checkMultiple(['camera', 'photo']).then(response => {
    //   console.log(response, 'adad');
    //   if (
    //     response.camera === permissionAsk ||
    //     response.photo === permissionAsk
    //   ) {
    //     this.openSettingModal();
    //   } else {
    //     this.handlePermissions(triggerFunc);
    //   }
    // });
  }
}

export default new ImagePickerHelper();
