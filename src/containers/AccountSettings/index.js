import React from 'react';
import {View, FlatList, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ButtonView} from '../../components';
import {SettingsItem} from '../../specifics';
import {ApplicationStyles, Images, Strings, Metrics} from '../../theme';

class AccountSettings extends React.PureComponent {
  static propTypes = {
    platform_type: PropTypes.string,
  };

  static defaultProps = {
    platform_type: 'custom',
  };

  constructor(props) {
    super(props);

    const {platform_type} = props;

    const data = [
      // {
      //   title: Strings.change_phone,
      //   icon: Images.phone,
      //   onPress: () => Actions.changePhone(),
      // },
    ];

    if (platform_type === 'custom') {
      data.push({
        title: Strings.change_pwd_title,
        icon: Images.lock,
        // onPress: () => Actions.changePassword(),
        onPress: () => this.props.navigation.navigate("changePassword"),
      });
    }

    this.state = {
      data,
    };
  }

  _renderItem = ({item}) => {
    return <SettingsItem item={item} onPress={item.onPress} />;
  };

  render() {
    const {data} = this.state;
    return (
      <FlatList
        style={ApplicationStyles.scrollContainer}
        contentContainerStyle={{
          paddingVertical: Metrics.smallMargin,
        }}
        data={data}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  platform_type: user.data.platform_type,
});

export default connect(mapStateToProps, null)(AccountSettings);
