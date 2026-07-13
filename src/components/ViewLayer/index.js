import React from 'react';
import {View} from 'react-native';

export default class ViewLayer extends React.PureComponent {
  render() {
    const {style} = this.props;
    return (
      <View
        style={[
          {
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.5)',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          },
          style,
        ]}
      />
    );
  }
}
