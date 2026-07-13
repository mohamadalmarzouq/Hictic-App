import _ from 'lodash';
import React from 'react';
import {View, FlatList, Text, Image, Switch} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ButtonView} from '../../components';
import {SettingsItem, RoundImage, MessageModal} from '../../specifics';
import {ApplicationStyles, Images, Strings} from '../../theme';
import Utils from '../../utils';
import styles from './styles';
import Header from './header';
import {PRIVACY_POLICY, TERMS_AND_CONDITION} from '../../constants';
//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {LOGOUT_USER} from '../../actions/ActionTypes';
import {generalAction, generalDispatchType} from '../../actions/GeneralAction';
import {request as settingRequest} from '../../actions/SettingsAction';
import {API_USER_LOGOUT} from '../../config/WebService';
import { navReset } from '../../navigator';
// import {removeNotificationTray} from '../../utils/FirebaseUtils';

// import {GoogleSignin} from 'react-native-google-signin';

class MyProfile extends React.PureComponent {
  constructor(props) {
    super(props);

    const {user} = this.props;

    this.state = {
      data: [
        // {
        //   title: Strings.rewards,
        //   icon: Images.rewards,
        // },
        // moved to home tabs
        // {
        //   title: Strings.interested_campaigns,
        //   icon: Images.interested_campaigns,
        //   onPress: () => Actions.interestedCampaigns()
        // },

        {
          title: Strings.notifications,
          icon: Images.notifications,
          onTogglePress: value => {
            this.setState(
              {
                value: !this.state.value,
              },
              () => {
                this._onNotificationToggle();
              },
            );
          },
          isToggle: true,
          // onPress: () => Actions.notifications()
        },
        // removed as per client CR
        // {
        //   title: Strings.invite,
        //   icon: Images.invite,
        //   onPress: () => Actions.invite()
        // },
        // {
        //   title: Strings.privacy_policy,
        //   icon: Images.lock,
        //   onPress: () =>
        //     Actions.webView({
        //       subPath: PRIVACY_POLICY
        //     })
        // },
        {
          title: Strings.terms_and_conditions,
          icon: Images.terms,
        },
        {
          title: Strings.support,
          icon: Images.support,
        },
      ],
      value: user.data.notification === 1,
    };
  }

  componentDidMount() {
    if (this.props.user.data.platform_type === 'custom') {
      this.setState({
        data: [
          {
            title: Strings.account_settings,
            icon: Images.settings,
          },
          ...this.state.data,
        ],
      });
    }
  }

  _onNotificationToggle = value => {
    const {settingRequest} = this.props;
    const {id} = this.props.user.data;

    settingRequest({id: id, notification: this.state.value ? 1 : 0});
  };

  _onPress = title => {
    // Actions.drawerClose();
    this.props.navigation.closeDrawer();
    setTimeout(() => {
      switch (title) {
        case Strings.rewards:
          // Actions.rewards();
          this.props.navigation.navigate("rewards")
          break;
        case Strings.account_settings:
          // Actions.accountSettings();
          this.props.navigation.navigate("accountSettings")
          break;
        case Strings.terms_and_conditions:
          // Actions.webView({
          //   subPath: TERMS_AND_CONDITION,
          // });
          this.props.navigation.navigate("webView", {
  subPath: TERMS_AND_CONDITION,
});
          break;
        case Strings.support:
          // Actions.support();
          this.props.navigation.navigate("support")
          break;
      }
    }, 700);
  };

  _onHeaderPress = () => {
    // Actions.drawerClose();
    this.props.navigation.closeDrawer();
    setTimeout(() => {
      // Actions.editProfile();
      this.props.navigation.navigate("editProfile")
    }, 0);
  };

  // signOutGoogle = async () => {
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   if (isSignedIn) {
  //     try {
  //       await GoogleSignin.revokeAccess();
  //       await GoogleSignin.signOut();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  _onLogoutPress = async () => {
    this.logoutModel.show();
    // await this.signOutGoogle();
  };

  _logoutUser = () => {
    const {generalAction, generalDispatchType, cbShowLoader, user} = this.props;
    cbShowLoader(true);
    // removeNotificationTray();
    generalAction(
      API_USER_LOGOUT,
      {
        id: user.data.id,
        device_token: 'no_token',
      },
      '',
      '',
      data => {
        // cbShowLoader(false);
        setTimeout(() => {
          // Actions.loginNavigator();
          // this.props.navigation.navigate("AuthRoot")
          navReset("AuthRoot")
          generalDispatchType(LOGOUT_USER);
        }, 500);
      },
      () => {
        cbShowLoader(false);
        setTimeout(() => {
          // Actions.loginNavigator();
          //  this.props.navigation.navigate("AuthRoot")
          navReset("AuthRoot")
          generalDispatchType(LOGOUT_USER);
        }, 500);
      },
    );
  };

  _renderHeader = () => {
    const {full_name, email} = this.props.user.data;
    return <Header onPress={this._onHeaderPress} />;
  };

  _renderItem = ({item, index}) => {
    return (
      <SettingsItem
        item={item}
        value={this.state.value}
        onPress={this._onPress}
      />
    );
  };

  _renderFooter = () => {
    return (
      <ButtonView style={styles.footerStyle} onPress={this._onLogoutPress}>
        <Image source={Images.logout} style={styles.iconStyle} />
        <Text style={ApplicationStyles.m20Secondary}>Logout</Text>
      </ButtonView>
    );
  };

  _renderLogOutModal() {
    return (
      <MessageModal
        ref={ref => {
          this.logoutModel = ref;
        }}
        description="Are you sure you want to Logout?"
        rightButtonTitle="Logout"
        onPress={() => {
          this.logoutModel.hide();
          setTimeout(() => {
            this._logoutUser();
          }, 500);
        }}
        isCancelable
      />
    );
  }

  render() {
    const {data} = this.state;
    return (
      <View style={[ApplicationStyles.scrollContainer]}>
        {this._renderHeader()}
        <FlatList
          contentContainerStyle={styles.container}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          // ListHeaderComponent={this._renderHeader}
          extraData={this.state.value}
          ListFooterComponent={this._renderFooter}
        />
        {/* this._renderFooter() */}
        {this._renderLogOutModal()}
      </View>
    );
  }
}

const mapStateToProps = ({user}) => ({user});

const actions = {generalAction, generalDispatchType, settingRequest};

export default connect(mapStateToProps, actions)(WithFetching(MyProfile));
