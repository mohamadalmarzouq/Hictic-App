// button texts
const button_login = 'LOGIN';
const button_google = 'CONTINUE WITH GOOGLE';
const button_apple = 'CONTINUE WITH APPLE';
const button_instagram = 'CONTINUE WITH INSTAGRAM';
const button_submit = 'SUBMIT';
const button_sign_up = 'SIGN UP';
const button_next = 'NEXT';
const button_forgot = 'Forgot Password ';
const button_save = 'SAVE';
const button_apply = 'Apply';
const button_play = 'PLAY';
const button_ended = 'ENDED';
const button_interested = 'INTERESTED';
const button_resend_code = 'RESEND CODE';
const button_notify = 'TAP TO GET NOTIFICATION';
const button_notified = 'DISABLE NOTIFICATION';
const button_invite = 'INVITE FRIENDS';
// const button_redeem = 'REDEEM COUPON';
const button_redeem = 'REDEEM REWARD';
const button_expired = 'EXPIRED';

// tabs
const tabs = {
  running: 'Running',
  upComing: 'Upcoming',
  ended: 'Ended',
  won: 'Won',
  received: 'Received',
  sent: 'Sent',
  interested: 'Interested',
  active_campaigns: 'Active Campaigns',
  ended_campaigns: 'Ended Campaigns',
  coming_soon: 'Coming Soon',
  interested_in: 'Interested In',
};

// login flow header texts
const login_title = 'Login';
const sign_up_title = 'Sign Up';
const forgot_pwd_title = 'Forgot Password';
const verification_title = 'Enter Access Code';
const verification_description =
  'We have sent you a code on the email address you have provided.';
const verification_description_phone =
  'We have sent you a code on the mobile number you have provided.';
const new_pwd_title = 'New Password';
const change_pwd_title = 'Change Password';

// text fields
const email = 'Email';
const password = 'Password';
const phone = 'Phone';
const old_pwd = 'Old Password';
const new_pwd = 'New Password';
const confirm_pwd = 'Confirm Password';
const name = 'Name';
const message = 'Message';
const branch_code = 'Branch Code';
const select_language = 'Select Language';

// texts
const rewards = 'Rewards';
const interested_campaigns = 'Interested Campaigns';
const account_settings = 'Account Settings';
const notifications = 'Notifications';
const privacy_policy = 'Privacy Policy';
const terms_and_conditions = 'Terms & Conditions';
const support = 'Support';
const change_phone = 'Change Phone';
const add_details = 'Add Details';
const newly_added = 'Currently Active';
const missed = 'Missed';
const participated = 'Participated';
const top_scorers = 'Top Scorers';
const date_and_time = 'Date & Time';
const interested = 'Interested';
const invite = 'Invite Friends to HicTic';
const shared_with = 'Shared With';
const expiry = 'Expiry';
const reward_received_on = 'Reward Received On';
const max_usage = 'Max Usage';
const usage_left = 'Usage Left';
const rewarded = 'Rewarded';
const contain_rewards = 'Contain Rewards';
const have_account = 'Already have an account?';
const have_not_account = 'Don’t have an account?';
const sign_in = 'Sign in';
const sign_up = 'Sign up';
const rewardCodeCongratulation =
  'Congratulation! on winning this reward. You can find the reward details below. Please go to the branch with code below to redeem it.';
const rewardAmountCongratulation =
  'Congratulation! on winning this reward. You can find the reward details below. Please go to the branch with the amount details below to redeem it.';
const rewardAmount = 'REWARD AMOUNT';
const rewardCode = 'REWARD CODE';
const redeemCode = 'REDEEM CODE';
const redeemed = 'Redeemed';

// errors password
const errorMessageEmail = 'Please enter valid email address';
const errorMessageEmailRequired = 'Please enter email address';
const errorMessagePasswordRequired = 'Please enter password';
const errorMessageName = 'Please enter name';
const errorMessagePhone = 'Please enter valid phone number';
const errorMessagePhoneRequired = 'Please enter phone number';
const errorMessagePassword = 'Please enter password between 8 to 15 characters';
const errorMessageConfirmPassword =
  'Password and confirm password should be same';
const errorMessageOldPassword = 'Please enter old password';
const errorMessageNewPassword = 'Please enter new password';
const errorMessageNewConfirmPassword =
  'New password and confirm password should be same';
const errorMessageSupportMessage = 'Please enter message';
const errorMessageCampaignRegion = 'Yoa are not in the region of campaign';
const errorMessageBranchCode = 'Please enter branch code';
const errorVerifyAccount = 'Please verify your account first';

// success messages
const forgot_pwd_msg = 'Please check your email for new password';
const password_change_msg = 'Password changed successfully';
const profile_edited_msg = 'Profile edited successfully';
const phone_changes_msg = 'Phone number changes successfully';
const support_success_msg =
  'Thank you for contacting us. One of our representatives will get in touch with you.';
const coupon_shared = 'Coupon shared successfully.';

// NavBar titles
const navbar_title = {
  myProfile: 'My Profile',
  accountSettings: 'Account Settings',
  support: 'Support',
  rewards: 'Rewards',
  notifications: 'Notifications',
  editProfile: 'Edit Profile',
  interestedCampaigns: 'Interested Campaigns',
  missedCampaigns: 'Missed Campaigns',
  newlyAdded: 'Newly Added',
  participated: 'Participated Campaigns',
  filter: 'Filter',
  leaderBoard: 'LeaderBoard',
  campaignDetail: 'Campaign Detail',
  searchedCampaigns: 'Search Campaigns',
  filteredCampaigns: 'Filtered Campaigns',
  gameView: 'Game',
  privacy: 'Privacy Policy',
  terms: 'Terms and Conditions',
  comments: 'Comments',
  search_people: 'Share Rewards',
  invite_friends: 'Invite Friends',
  rewardDetail: 'Reward Detail',
};

const emptyTitles = {
  home: 'No Campaigns Added yet',
  notifications: 'No Notifications',
  rewards: 'No Rewards',
  filteredCampaigns: 'No Filtered Campaigns',
  interestedCampaigns: 'No Interested Campaigns yet',
  missedCampaigns: 'No Missed Campaigns yet',
  runningCampaignsNew: 'No Running Campaigns yet',
  upcomingCampaignsNew: 'No Upcoming Campaigns yet',
  runningCampaignsParticipated: 'No Running Campaigns yet',
  endedCampaignsParticipated: 'No Ended Campaigns',
  searchedCampaigns: 'No Campaigns Found',
  campaignDetail: 'No Campaign Found',
  filters: 'No Filters Founds',
  leaderBoard: 'No Winners Found',
  searchUsers: 'No User Found',
};
const emptyDescriptions = {
  home: 'There are no campaigns available at this point. Please come back later for exciting rewards.',
  notifications: 'There are not Notifications.',
  rewards:
    'You have not earned any rewards yet. Keep playing and participate as much as possible to earn rewards.',
  rewardsWon:
    'You have not earned any rewards yet. Keep playing and participate as much as possible to earn rewards.',
  rewardsReceived:
    'You have not received any rewards yet. Keep playing and participate as much as possible to earn rewards.',
  rewardsSent:
    'You have not sent any rewards yet. Keep playing and participate as much as possible to earn rewards.',
  filteredCampaigns: "Your selected filters didn't match any Campaign Title.",
  interestedCampaigns:
    "You have not selected to be notified for any campaigns. When you mark a campaign for notification, you'll get instant notifications before a campaign Starts or End.",
  missedCampaigns:
    'You have not missed any campaign. Keep playing to earn amazing rewards and prizes.',
  runningCampaignsNew:
    'There are no active campaigns at this time. Please come back later for exciting rewards.',
  upcomingCampaignsNew:
    'There are no upcoming campaigns at this time. Please come back later for exciting rewards.',
  runningCampaignsParticipated:
    'You have not participated in any campaigns yet. Go to a campaign and Play to earn exciting rewards.',
  endedCampaignsParticipated:
    'All the campaigns are active right now. Go to a campaign and Play to earn exciting rewards.',
  searchedCampaigns: "Your entered keyword didn't match any Campaign Title.",
  campaignDetail: 'The selected campaign is no longer available',
  filters: 'There are no filters available right now.',
  leaderBoard:
    'Be the first one to participate. Keep playing to increase your chances of winning rewards and prizes.',
  leaderBoard2:
    'Keep playing to increase your chances of winning rewards and prizes.',
  searchUsers: "Your entered keyword didn't match any User.",
};

export default {
  button_login,
  button_google,
  button_apple,
  button_instagram,
  button_submit,
  button_sign_up,
  button_next,
  button_forgot,
  button_save,
  button_apply,
  button_play,
  button_ended,
  button_interested,
  button_resend_code,
  button_notify,
  button_notified,
  button_invite,
  button_redeem,
  button_expired,
  tabs,

  // login flow header texts
  login_title,
  sign_up_title,
  forgot_pwd_title,
  verification_title,
  verification_description,
  verification_description_phone,
  new_pwd_title,
  change_pwd_title,

  // text fields
  email,
  password,
  phone,
  new_pwd,
  old_pwd,
  confirm_pwd,
  name,
  message,
  branch_code,
  select_language,

  // texts
  rewards,
  interested_campaigns,
  account_settings,
  notifications,
  privacy_policy,
  terms_and_conditions,
  support,
  rewardAmountCongratulation,
  rewardCodeCongratulation,
  rewardAmount,
  rewardCode,
  redeemCode,
  redeemed,

  add_details,
  change_phone,
  newly_added,
  missed,
  participated,
  top_scorers,
  date_and_time,
  interested,
  invite,
  shared_with,
  expiry,
  reward_received_on,
  max_usage,
  usage_left,
  rewarded,
  contain_rewards,
  have_account,
  have_not_account,
  sign_in,
  sign_up,

  // error messages
  errorMessageEmail,
  errorMessageEmailRequired,
  errorMessagePasswordRequired,
  errorMessageName,
  errorMessagePhone,
  errorMessagePhoneRequired,
  errorMessagePassword,
  errorMessageConfirmPassword,
  errorMessageOldPassword,
  errorMessageNewPassword,
  errorMessageNewConfirmPassword,
  errorMessageSupportMessage,
  errorMessageCampaignRegion,
  errorMessageBranchCode,
  errorVerifyAccount,

  // success messages
  forgot_pwd_msg,
  password_change_msg,
  profile_edited_msg,
  phone_changes_msg,
  support_success_msg,
  coupon_shared,

  // navbar titles
  navbar_title,
  emptyTitles,
  emptyDescriptions,
};
