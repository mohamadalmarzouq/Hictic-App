import _ from 'lodash';
import React from 'react';
import {View, Image, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {ButtonView} from '../../../components';
import {RoundImage} from '../../../specifics';
import {
  Metrics,
  Colors,
  Images,
  ApplicationStyles,
  Strings,
} from '../../../theme';
import Utils from '../../../utils';
import {isIphoneX} from 'react-native-iphone-screen-helper';

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  justifyContent: "flex-end",
    alignItems: 'center',
    paddingTop: Utils.isPlatformAndroid() ? 0 : Metrics.statusBarHeight + 10,
    height: Utils.isPlatformAndroid()
      ? Metrics.navBarHeightWithoutStatusBar + 35
      : Metrics.navBarHeight + 10,
    backgroundColor: Colors.background.quaternary,
    paddingHorizontal: Metrics.ratio(12),
  },
  imageStyle: {
    padding: Metrics.ratio(10),
  },
  rightImageStyle: {
    paddingHorizontal: Metrics.ratio(10),
    // paddingVertical: Metrics.baseMargin,
  },
};

class Header extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      !_.isEqual(nextProps.user.data.avatar, this.props.user.data.avatar) ||
      !_.isEqual(
        nextProps.user.notification_count,
        this.props.user.notification_count,
      )
    );
  }

  render() {
    const {notification_count, data} = this.props.user;
    const {onUserPress, onFilterPress, onNotificationPress} = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            top: Utils.isPlatformAndroid() ? 0 : 10,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Utils.isPlatformAndroid() ? 0 : Metrics.statusBarHeight,
          }}>
          <Image source={Images.logo_navbar} />
        </View>

        {/* <RoundImage
          // image={data.avatar}
          // image={() => <Image source={Images.tabs.myprofile} />}
          imageSize={22}
          imageBorderWidth={0}
          hideShadow
          onPress={onUserPress}
          containerStyle={styles.imageStyle}
          imageStyle={{
            backgroundColor: Colors.navbar,
            borderRadius: 0,
          }}
          // isUser
        /> */}
        <ButtonView style={styles.rightImageStyle} onPress={onUserPress}>
          <Image source={Images.tabs.myprofile} />
        </ButtonView>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ButtonView style={styles.rightImageStyle} onPress={onFilterPress}>
            {/* <Image source={Images.filter} /> */}
            <Text style={{color: Colors.white, fontSize: Metrics.ratio(18)}}>
              {Strings.navbar_title.filter}
            </Text>
          </ButtonView>

          {/*
            <ButtonView
              style={styles.rightImageStyle}
              onPress={onNotificationPress}
            >
              <Image source={Images.notification_count} />
              {notification_count > 0 && (
                <View
                  style={{
                    top: Metrics.ratio(8),
                    right: Metrics.ratio(4),
                    position: "absolute"
                  }}
                >
                  <View
                    style={{
                      right: 0,
                      position: "absolute",
                      backgroundColor: Colors.background.septenary,
                      borderRadius: Metrics.ratio(12),
                      minWidth: Metrics.ratio(24),
                      height: Metrics.ratio(24),
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: Metrics.ratio(4)
                    }}
                  >
                    <Text
                      style={[ApplicationStyles.m15Primary, { lineHeight: 18 }]}
                    >
                      {notification_count > 999 ? "999+" : notification_count}
                    </Text>
                  </View>
                </View>
              )}
            </ButtonView>
                  */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps, null)(Header);
