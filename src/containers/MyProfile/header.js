import _ from 'lodash';
import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import {ButtonView} from '../../components';
import {RoundImage} from '../../specifics';
import {ApplicationStyles, Colors, Metrics, Images} from '../../theme';
import styles from './styles';

class Header extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      !_.isEqual(nextProps.user.data.avatar, this.props.user.data.avatar) ||
      !_.isEqual(
        nextProps.user.data.full_name,
        this.props.user.data.full_name,
      ) ||
      !_.isEqual(nextProps.user.data.email, this.props.user.data.email)
    );
  }

  render() {
    const {avatar, full_name, email} = this.props.user.data;
    return (
      <ButtonView onPress={this.props.onPress}>
        {/* <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={Colors.gradients.primaryBg}
          style={styles.headerStyle}
       > */}
        <ImageBackground
          source={Images.drawer_header}
          style={styles.imageBgStyle}
          resizeMode="cover">
          <RoundImage
            hideShadow
            image={avatar}
            imageSize={Metrics.ratio(60)}
            imageBorderWidth={0}
            isUser
            containerStyle={styles.headerImageStyle}
            disabledOpacity={1}
            resizeMode="cover"
          />
          <View style={styles.headerTextContainer}>
            <Text style={ApplicationStyles.b20Primary}>{full_name}</Text>
            <Text style={ApplicationStyles.re17Primary}>{email}</Text>
          </View>
        </ImageBackground>
        {/* </LinearGradient> */}
      </ButtonView>
    );
  }
}

const mapStateToProps = ({user}) => ({user});

const actions = {};

export default connect(mapStateToProps, actions)(Header);
