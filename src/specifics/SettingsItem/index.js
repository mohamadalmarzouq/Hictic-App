import React from 'react';
import {Image, Text, Switch} from 'react-native';
import {ButtonView} from '../../components';
import {ApplicationStyles, Colors, Metrics} from '../../theme';
import Utils from '../../utils';

const styles = {
  container: {
    flexDirection: 'row',
    padding: Metrics.baseMargin,
    alignItems: 'center',
  },
  iconStyle: {marginRight: Metrics.ratio(10)},
};

export default class SettingsItem extends React.PureComponent {
  _onPress = () => {
    const {onPress, item} = this.props;
    onPress(item.title);
  };

  render() {
    const {item, value} = this.props;
    const {title, icon, isToggle, onTogglePress} = item;

    return (
      <ButtonView
        style={styles.container}
        onPress={this._onPress}
        disabled={isToggle}
        disabledOpacity={1}>
        <Image source={icon} style={styles.iconStyle} />

        <Text style={[ApplicationStyles.m20Secondary, ApplicationStyles.flex]}>
          {title}
        </Text>

        {isToggle && onTogglePress && (
          <Switch
            value={value}
            onValueChange={onTogglePress}
            ios_backgroundColor={Colors.toggle.ios_bg}
            trackColor={{
              false: Utils.isPlatformAndroid()
                ? Colors.toggle.android_track_false
                : Colors.toggle.ios_track_false,
              true: Colors.toggle.track_true,
            }}
            thumbColor={Colors.toggle.android_thumb}
          />
        )}
      </ButtonView>
    );
  }
}
