const IS_PRODUCTION = false;

export const BASE_URL = IS_PRODUCTION
  ? 'https://hicticadmin.com' // PRODUCTION
  : 'https://sandbox4.cubix.co/staging/hictic/public';

const API = '/api/';

export const API_USER_LOGIN = `${API}user_login`;
export const API_USER_SOCIAL_LOGIN = `${API}social_login`;
export const API_USER_SIGN_UP = `${API}register_user`;
export const API_USER_UPDATE = `${API}update_user`;
export const API_USER_SOCIAL_EXIST = `${API}check_third_party_user_exists`;
export const API_USER_REQUEST_FORGOT_PWD = `${API}forgot_password`;
export const API_USER_LOGOUT = `${API}logout_user`;
export const API_CHANGE_PASSWORD = `${API}change_password`;
export const API_SUBMIT_SUPPORT = `${API}add_support_ticket`;

export const API_UPLOAD_IMAGE = `${API}image_upload`;

// twillio api's
export const API_VERIFY_PHONE = `${API}verify_custom_code`;
// export const API_VERIFY_PHONE = `${API}verify_twilio_code`;
export const API_TWILIO_SEND_CODE = `${API}send_twilio_code`;
export const API_TWILIO_VERIFY_CHANGE_PHONE = `${API}verify_twilio_code_for_phone_change`;

export const API_HOME_DATA = `${API}get_home`;

// campaign
export const API_CAMPAIGN_LISTING = `${API}campaign_listing_by_filters`;
export const API_CAMPAIGN_DETAILS = `${API}category_detail`;
export const API_CAMPAIGN_MARK_INTERESTED = `${API}save_interested`;
export const API_CAMPAIGN_MARK_VIEWED = `${API}add_views`;
export const API_CAMPAIGN_CHECK_REGION = `${API}check_campaign_region`;
export const API_CAMPAIGN_PARTICIPATE = `${API}participate`;

export const API_REWARDS = `${API}list_rewards`;
export const API_NOTIFICATIONS = `${API}list_notification`;
export const API_LEADER_BOARD = `${API}leaderboard`;
export const API_FILTER = `${API}get_filters`;
export const API_NOTIFICATION_COUNT = `${API}list_notification`;
export const API_NOTIFICATION_COUNT_RESET = `${API}list_notification`;
export const API_USERS_SEARCH = `${API}search_users`;
export const API_REWARD_DETAIL = `${API}coupon_detail`;
export const API_SHARE_COUPON = `${API}share_coupon`;
export const API_REDEEM_COUPON = `${API}claim_coupon`;

export const API_USER_NAME = 'cubixapiuser';
export const API_PASSWORD = 'apipass123';
export const API_TIMEOUT = 30000;
export const API_SECRET_KEY = 'a8abedd909363819a1851172fc7e21a4';
export const API_USER_AGENT = '';

export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 1,
};

export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 1,
};

export const ERROR_KICK_USER = {message: 'invalid user', error: 1};

export const ERROR_SESSION_EXPIRED = {
  message: 'Your session has been expired',
  error: 1,
};
