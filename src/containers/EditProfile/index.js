import React from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {FloatLabelTextInput} from '../../components';
import {RoundImage, GradientButtonBorder} from '../../specifics';
import {ApplicationStyles, Strings, Images, Metrics} from '../../theme';
import Utils from '../../utils';
import MediaPicker from '../../utils/MediaPicker';

//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {UPDATE_CHUNK_USER} from '../../actions/ActionTypes';
import {generalAction, generalSaveAction} from '../../actions/GeneralAction';
import {
  BASE_URL,
  API_USER_UPDATE,
  API_UPLOAD_IMAGE,
} from '../../config/WebService';
import {MAX_NAME_LENGTH} from '../../constants';
import { navPop } from '../../navigator';

const styles = {
  container: {
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.mediumMargin,
  },
};

class EditProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    const {avatar} = props.user.data;
    this.state = {
      newImage: {path: avatar || ''},
      imageRemoved: false,
    };
  }

  _onImagePress = () => {
    MediaPicker.showImagePicker(image => {
      console.log('IMAGE  = ', image);
      if (image) {
        this.setState({newImage: image, imageRemoved: false});
      }
    });
  };

  _uploadImage = () => {
    const {generalAction, cbShowLoader} = this.props;

    const data = new FormData();
    const photo = {
      uri: this.state.newImage.path,
      type: 'image/jpeg',
      name: 'thumb.jpg',
    };

    data.append('file', photo);

    cbShowLoader(true);
    generalAction(
      API_UPLOAD_IMAGE,
      data,
      '',
      '',
      data => {
        // concat base url with image path and save to user object
        this._saveData(BASE_URL + '/' + data);
      },
      err => {
        cbShowLoader(false);
      },
    );
  };

  _saveData = (newImage = '') => {
    const {generalAction, generalSaveAction, cbShowLoader, user} = this.props;
    const {imageRemoved} = this.state;
    const payload = {
      id: user.data.id,
      full_name: this.nameInput.getText(),
    };

    // if image is updated then concat the new image url in payload
    if (newImage) {
      payload.avatar = newImage;
    }

    if (imageRemoved) {
      payload.avatar = '';
    }

    cbShowLoader(true);
    generalAction(
      API_USER_UPDATE,
      payload,
      '',
      '',
      data => {
        // on response save data to user reducer
        const newData = {
          full_name: this.nameInput.getText(),
        };

        if (newImage) {
          newData.avatar = newImage;
        }

        if (imageRemoved) {
          newData.avatar = '';
        }

        // on response save data to user reducer
        generalSaveAction(UPDATE_CHUNK_USER, newData);

        // disable loading
        cbShowLoader(false);

        // show success message
        // Utils.showMessage(Strings.profile_edited_msg, "success");

        // pop screen to profile
        setTimeout(() => {
          // Actions.pop();
          navPop()
        }, 1000);
      },
      err => {
        cbShowLoader(false);
      },
    );
  };

  _onButtonPress = () => {
    const {newImage} = this.state;
    const inputFields = [this.nameInput];
    const fieldsValid = Utils.validateFields(inputFields);
    // if image is changed then first upload image and then save data to server
    if (newImage && newImage.path && fieldsValid) {
      this._uploadImage();
    } else if (fieldsValid) {
      this._saveData();
    }
  };

  _onSubmitEditing = () => {
    this.nameInput.blur();
  };

  _renderName() {
    const {full_name} = this.props.user.data;
    return (
      <FloatLabelTextInput
        returnKeyType="done"
        ref={ref => {
          this.nameInput = ref;
        }}
        valueText={full_name}
        autoCapitalize="sentences"
        onSubmitEditing={this._onSubmitEditing}
        placeholder={Strings.name}
        errorType="required"
        errorMessage={Strings.errorMessageName}
        maxLength={MAX_NAME_LENGTH}
      />
    );
  }

  removeImage = () => {
    this.setState({newImage: {path: ''}, imageRemoved: true});
  };

  _renderImage = () => {
    const {newImage, imageRemoved} = this.state;
    const {avatar} = this.props.user.data;
    return (
      <RoundImage
        hideShadow
        imageSize={100}
        imageBorderWidth={0}
        containerStyle={styles.container}
        rightIcon={
          imageRemoved || newImage.path === ''
            ? Images.camera
            : Images.removeImage
        }
        onPressRightIcon={this.removeImage}
        isRightIconTapAble={newImage.path !== ''}
        onPress={this._onImagePress}
        isUser
        image={!imageRemoved ? newImage.path : null}
        resizeMode="cover"
      />
    );
  };

  render() {
    return (
      <View style={ApplicationStyles.container}>
        {this._renderImage()}
        {this._renderName()}
        <GradientButtonBorder
          title={Strings.button_save}
          onPress={this._onButtonPress}
        />
      </View>
    );
  }
}

const mapStateToProps = ({user}) => ({user});

const actions = {generalAction, generalSaveAction};

export default connect(mapStateToProps, actions)(WithFetching(EditProfile));
