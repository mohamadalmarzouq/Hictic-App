export const PAGE_LIMIT = 10;
export const PASSWORD_MIN_LIMIT = 8;
export const PASSWORD_MAX_LIMIT = 15;
export const PHONE_NUM_LIMIT = 12;
export const ITEM_LIMIT = 5;
export const MAX_NAME_LENGTH = 40;
// IMAGE
export const PICKER_TYPE = {
  // FOR CAMERA
  CAMERA: 'CAMERA',
  CAMERA_WITH_CROPPING: 'CAMERA_WITH_CROPPING',
  CAMERA_BINARY_DATA: 'CAMERA_BINARY_DATA',
  CAMERA_WITH_CROPPING_BINARY_DATA: 'CAMERA_WITH_CROPPING_BINARY_DATA',

  // FOR GALLERY
  GALLERY: 'GALLERY',
  GALLERY_WITH_CROPPING: 'GALLERY_WITH_CROPPING',
  GALLERY_BINARY_DATA: 'GALLERY_BINARY_DATA',
  GALLERY_WITH_CROPPING_BINARY_DATA: 'GALLERY_WITH_CROPPING_BINARY_DATA',

  // FOR MULTI PICK
  MULTI_PICK: 'MULTI_PICK',
  MULTI_PICK_BINARY_DATA: 'MULTI_PICK_BINARY_DATA',
};
export const IMAGE_QUALITY = 1;
export const IMAGE_MAX_WIDTH = 720;
export const IMAGE_MAX_HEIGHT = 480;
export const IMAGE_COMPRESS_MAX_WIDTH = 720;
export const IMAGE_COMPRESS_MAX_HEIGHT = 480;
export const IMAGE_COMPRESS_FORMAT = 'JPEG';

export const VERIFICATION_TYPE_CHANGE_NUMBER = 1;

// REWARD TYPES (FROM SERVER)
export const REWARD_TYPE_CASH = 1;
export const REWARD_TYPE_COUPON = 4;
export const REWARD_TYPE_ITEM = 3;

// GAME TYPES (FROM SERVER)
export const GAME_TYPE_AR = '4';

// date formats
export const DATE_FORMAT = 'DD MMM YYYY';
export const MONTH = 'MMM';
export const DATE = 'DD';
export const DAY = 'ddd';
export const DAY_TIME = 'ddd h:mm A';
export const TIME = 'hh:mm A';
export const DATE_FORMAT_COMA = 'DD MMM, YYYY';
export const DATE_TIME_FORMAT = 'DD MMM, YYYY, hh:mm A';
export const DATE_TIME_FORMAT2 = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT3 = 'YYYY-MM-DD HH:mm:ss';

export const CAMPAIGN_VIEWED_DELAY = 3000;

// campaign status
export const CAMPAIGN_STARTS_IN = 'Starts In';
export const CAMPAIGN_ENDS_IN = 'Ends In';
export const CAMPAIGN_ENDED = 'Ended';

export const CURRENCY = '$';
export const PRIVACY_POLICY = 'content/privacy_policy';
export const TERMS_AND_CONDITION = 'content/terms_and_condition';

// social platforms
export const PLATFORM_TYPE_GOOGLE = 'google';
export const PLATFORM_TYPE_INSTAGRAM = 'instagram';
export const PLATFORM_TYPE_APPLE = 'apple';

export const INSTAGRAM_CLIENT_ID = '64ce4c57d3904f1390281b3876e6f4d2';
export const INSTAGRAM_SCOPES = ['public_content'];

export const LANGUAGES = [
  {title: 'English', identifier: 'en'},
  {title: 'Arabic', identifier: 'ar'},
];

export const WIKITUDE_IOS_KEY =
  'xUGTFnevGSLQbOvws06m3fDRe3pZH2lrfPtwApCftGM7RzN449vYFMdVou096kpeeLNmcZUxBh8SzLQNIhQEaUYyHQP/BGP2i0cWn8OAqD8Lbv1ZIEvzDMxNcUKv3kFaNuZE+QiYnP3U06ugA0yMpNMvzG0mnEmw5Eh+cmtL9/pTYWx0ZWRfX0R7yrxKhZKD6R2TN1Snh89bOspqMlZxDHPkEL8kWu/k5ELNE1MTaErEGulqWM8tRW7S8co/tmMgMvmj7oQeZj4A4dse201Ut7eVlqi3ByeNX0KvDEMKeIlxiUC19yXWbmQOOxPG5CzHLPe4daAKZcrIwDylg863Q/F4Vk97/y4csIVJCPt4PeGJKjcv2EJEsdPu51XSlB3ZVmooVbhfQY2b5HNBCKV8OeDRmn1AmJuqUXLnJUzKRbplwru769UggzzJeRrhfE1vpYXdGPf70rYceoeiIzRmaWwuVIoiM3cSm0caFlED+PHq4/PmOrTvbQc9zYYGCbjizcOqsK8NciT52ZxjUZlxMf3EEoxQwzk+zNBtYTOvgR1Er6f0TW3/fAAuXN3uScJWyvpK41KlPxSJVJBcbBho+tHf2k+tARKl2DNw39wb/ZW9LribVl0PsZ/0Ft33DvlsKueT+kfcXJmzkKzNihhIji+3aCnEKHWx2K91KmqWYTyUCXyJJ8PmJRc801Z50gbB4QZ7riM2NtP01r3Wa4ioTdNDHqwmB1CRjt/Ch0V4w9M=';

export const WIKITUDE_KEY =
  'eCnTcGYfxXa+YNI/OdLQx79w6ZRxVhLMY8henKUkS3a/agUMhrH3YtN854XGr4qkiusewozByBMqL90cTAsrZkCJ996BUQpv2nSg5A8rNc2KVCz/yheLlCwDrzwJGSRIPAsszsrFKKjDxJeDVW5N85Ll8y0fL/obkgACvIJEeRlTYWx0ZWRfX//Di5YBAgexUpRlAnluaqL0uVW5yKdGm0DT2JJJsrJVa0558rxZc91hB14qGcVV4Q44r11oeT73kqAvNn0P15TutGj4HWcrL+LYGKQRgQoq129FKJdGoHvnf/ycbA+seIvrxAivwWBy3Up8LHY0zEeX7OuC7u53YksNQzkSEaK9UVqYvyOFXb+/iK417cxq1x3L525aimMnC00hVQ7bsyxdPjaGxJzQdL4/ERiisMYGHCSlg+bVfc+6fNoF0oZVtyt+QiRLW6xMYd2FS02XKNI0Z0XymsgUMrK6MZHYYoukIiJ/tzb1r6IRDDVeC2jYiCxADAGf4M6bimldnKlcVhMCRBcFgkOb6IOAa63OrnEfh/Ad7Fc/HKsmRIgeMWp2HZ+bTojvhaJzVB9tJ046/r+6X40t4Me+SfPx9xaYi9dRwi5bQPRyi25C6wUxVgqY6K59F6eOrt83OhyUnWsKOmzjdZ4Hxb6CoaQenVvXd8+vaIBZiXXLlEQdwC8rxTP6gwgf0skZE8LPvoNBsIbkF/BScjiCqvwnjw==';
