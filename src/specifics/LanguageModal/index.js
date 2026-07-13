import React, {useImperativeHandle, useState} from 'react';
import Modal from 'react-native-modal';
import {View, Image} from 'react-native';

import {ButtonView, Text} from '../../components';
import {GradientButtonBorder, SelectionButton} from '../';
import styles from './styles';
import {Colors, ApplicationStyles, Metrics, Images, Strings} from '../../theme';
import {LANGUAGES} from '../../constants';

const LanguageModal = ({onNext}, forwardedRef) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setLanguage] = useState(LANGUAGES[0].identifier);

  useImperativeHandle(forwardedRef, () => ({
    show: () => {
      setModalVisible(true);
    },
    hide: hideModal,
  }));

  const hideModal = () => {
    setModalVisible(false);
  };
  const onSelectLanguage = ln => {
    setLanguage(ln);
  };

  const _renderCrossIcon = () => (
    <ButtonView onPress={hideModal} style={styles.crossIcon}>
      <Image source={Images.cross} />
    </ButtonView>
  );

  const _renderTitle = () => (
    <Text style={[ApplicationStyles.b22Secondary, styles.titleStyle]}>
      {Strings.select_language}
    </Text>
  );

  const _renderLanguages = () => <>{LANGUAGES.map(Item)}</>;

  const _renderButton = () => (
    <GradientButtonBorder
      style={styles.buttonStyle}
      textStyle={styles.buttonTitle}
      title={Strings.button_next}
      onPress={() => {
        hideModal();
        onNext(selectedLanguage);
      }}
    />
  );

  const Item = item => {
    return (
      <ButtonView
        style={[styles.itemStyle]}
        onPress={() => onSelectLanguage(item.identifier)}>
        <Text
          style={[
            ApplicationStyles.m20Secondary,
            {
              color:
                item.identifier === selectedLanguage
                  ? Colors.text.senary
                  : Colors.text.secondary,
            },
          ]}>
          {item.title}
        </Text>
      </ButtonView>
    );
  };

  return (
    <Modal
      isVisible={modalVisible}
      // onBackdropPress={hideModal}
      // onBackButtonPress={hideModal}
      hasBackdrop={true}
      backdropOpacity={0.6}
      useNativeDriver>
      <View style={styles.body}>
        {_renderCrossIcon()}
        {_renderTitle()}
        {_renderLanguages()}
        {_renderButton()}
      </View>
    </Modal>
  );
};

export default React.forwardRef(LanguageModal);
