import React from 'react';
import {MessageBar, MessageBarManager} from 'react-native-message-bar';
import {Colors, Metrics} from '../../theme';
import Utils from '../../utils';

export default class extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      MessageBarManager.registerMessageBar(this.alert);
    }, 0);
  }
  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  styles = {
    error: {
      backgroundColor: Colors.error,
      strokeColor: Colors.error,
      titleColor: Colors.errorText,
      messageColor: Colors.errorText,
    },
    success: {
      backgroundColor: Colors.success,
      strokeColor: Colors.success,
      titleColor: Colors.successText,
      messageColor: Colors.successText,
    },
  };

  render() {
    const {error, success} = this.styles;
    return (
      <MessageBar
        ref={a => {
          this.alert = a;
        }}
        stylesheetError={error}
        stylesheetSuccess={success}
        viewTopInset={Utils.isPlatformAndroid() ? 0 : Metrics.statusBarHeight}
      />
    );
  }
}
