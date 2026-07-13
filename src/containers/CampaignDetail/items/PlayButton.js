import React from 'react';
import {View} from 'react-native';
import {Separator} from '../../../components';
import {GradientButtonBorder} from '../../../specifics';
import {Colors, Strings, Metrics, Images} from '../../../theme';
import Utils from '../../../utils';

const styles = {
  bottomButtonContainer: {
    backgroundColor: Colors.background.primary,
    shadowColor: 'rgba(0, 0, 0, 0.13)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  bottomSeparator: {marginHorizontal: 0},
  bottomButtonStyle: {
    marginHorizontal: Metrics.baseMargin * 1.25,
    marginBottom: Metrics.baseMargin * 1.25,
    marginTop: Metrics.smallMargin * 1.5,
  },
};

export default class PlayButton extends React.PureComponent {
  render() {
    const {is_ended, is_started, onPress} = this.props;

    let icon = Images.play;

    if (is_ended) {
      icon = undefined;
    } else if (!is_started) {
      icon = Images.play_disable;
    }

    const isEnable = is_started && !is_ended;

    return (
      <View style={styles.bottomButtonContainer}>
        {Utils.isPlatformAndroid() && (
          <Separator style={styles.bottomSeparator} />
        )}
        <GradientButtonBorder
          style={styles.bottomButtonStyle}
          icon={icon}
          title={is_ended ? Strings.button_ended : Strings.button_play}
          onPress={isEnable ? onPress : undefined}
          containerGradients={
            isEnable ? Colors.gradients.primaryBg : Colors.gradients.disableBg
          }
          borderGradients={
            isEnable
              ? Colors.gradients.primaryBgBorder
              : Colors.gradients.disableBgBorder
          }
        />
      </View>
    );
  }
}
