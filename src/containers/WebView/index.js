import React from 'react';
import {Platform, View} from 'react-native';
import {WebView as RNWebView} from 'react-native-webview';
import {Actions} from 'react-native-router-flux';
import {Loading} from '../../components';
import {ApplicationStyles, Strings, Images} from '../../theme';
import {PRIVACY_POLICY} from '../../constants';
import Utils from '../../utils';

export default class WebView extends React.PureComponent {
  static defaultProps = {
    subPath: PRIVACY_POLICY,
  };

  componentDidMount() {
    console.log("this.props",this.props);
    
    const {subPath} = this.props.route.params;
    setTimeout(() => {
     this.props.navigation.setOptions({
    title:
      subPath === PRIVACY_POLICY
        ? Strings.navbar_title.privacy
        : Strings.navbar_title.terms,
  });
    }, 0);
  }

  state = {loading: true};

  render() {
    console.log("this.props",this.props.route.params);
    const {subPath} = this.props.route.params;
    const {loading} = this.state;

    return (
      <View style={ApplicationStyles.flex}>
        <RNWebView
          ref={ref => {
            this.webview = ref;
          }}
          //style={ApplicationStyles.flex}
          source={{
            uri: Utils.getImagePath(subPath),
            // uri: 'https://www.google.com',
          }}
          onLoadEnd={() => {
            this.setState({loading: false});
          }}
          scalesPageToFit={!Utils.isPlatformAndroid()}
        />
        <Loading
          loading={loading}
          showNative={false}
          image={Images.gifs.loader}
        />
      </View>
    );
  }
}
