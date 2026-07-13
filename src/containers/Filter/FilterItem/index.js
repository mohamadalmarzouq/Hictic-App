// @flow
import _ from "lodash";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import React, { Component } from "react";

import styles from "./styles";
import { Colors, Metrics, ApplicationStyles } from "../../../theme";
import { ButtonView, Separator } from "../../../components";

export default class FilterItem extends Component {
  static propTypes = {
    disableSeprator: PropTypes.bool,
    filterItem: PropTypes.object.isRequired,
    updateFilter: PropTypes.func,
    mainIndex: PropTypes.number.isRequired
  };

  static defaultProps = {
    disableSeprator: false,
    updateFilter: () => {}
  };

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.filterItem, this.props.filterItem);
  }

  _renderFilterText = (item, index) => {
    const { mainIndex, updateFilter } = this.props;
    const gradients = item.isSelected
      ? Colors.gradients.primaryBg
      : Colors.gradients.white;
    const filterStyle = item.isSelected
      ? styles.filterSelect
      : styles.filterUnselect;
    const textStyle = item.isSelected
      ? ApplicationStyles.re15Primary
      : ApplicationStyles.re15Quinary;
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => updateFilter(mainIndex, index)}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={gradients}
          style={[styles.gradientStyle, filterStyle]}
        >
          <Text style={[textStyle, styles.filterText]}>
            {item.name || item.title || item.type}
          </Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  };

  _renderFilterHeader() {
    const { name } = this.props.filterItem;
    return (
      <Text style={[ApplicationStyles.b20Secondary, styles.filterHeader]}>
        {name}
      </Text>
    );
  }

  _renderFilterItems() {
    const { filterItem } = this.props;
    return (
      <View style={styles.filterItemsContainer}>
        {filterItem.filterList.map(this._renderFilterText)}
      </View>
    );
  }

  _renderSeperator = () => <Separator style={styles.seperator} />;

  render() {
    const { disableSeprator } = this.props;
    return (
      <View>
        {this._renderFilterHeader()}
        {this._renderFilterItems()}
        {!disableSeprator && this._renderSeperator()}
      </View>
    );
  }
}
