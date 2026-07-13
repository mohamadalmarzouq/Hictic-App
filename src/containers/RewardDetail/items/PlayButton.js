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
    const {isActive, onPress} = this.props;

    return (
      <View style={styles.bottomButtonContainer}>
        {Utils.isPlatformAndroid() && (
          <Separator style={styles.bottomSeparator} />
        )}
        <GradientButtonBorder
          style={styles.bottomButtonStyle}
          icon={isActive ? Images.redeem : undefined}
          title={Strings.button_redeem}
          onPress={isActive ? onPress : undefined}
          containerGradients={
            isActive ? Colors.gradients.primaryBg : Colors.gradients.disableBg
          }
          borderGradients={
            isActive
              ? Colors.gradients.primaryBgBorder
              : Colors.gradients.disableBgBorder
          }
        />
      </View>
    );
  }
}
