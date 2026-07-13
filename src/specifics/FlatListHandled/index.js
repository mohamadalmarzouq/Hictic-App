import React from 'react';
import {View, FlatList, Text} from 'react-native';
import PropTypes from 'prop-types';
import * as ProgressLib from 'react-native-progress';
import {Loading, Progress} from '../../components';
import {EmptyView} from '../';
import {Colors, ApplicationStyles, Metrics, Images} from '../../theme';

export default class FlatListHandled extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    isFetching: PropTypes.bool,
    isPullToRefresh: PropTypes.bool,
    errorMessage: PropTypes.string,
    errorRequest: PropTypes.func,
    emptyImage: PropTypes.any,
    emptyTitle: PropTypes.string,
    emptyDescription: PropTypes.string,
    showEmptyView: PropTypes.bool,
    contentContainerStyle: PropTypes.any,
    modalLoading: PropTypes.bool,
    hideLoading: PropTypes.bool,
  };

  static defaultProps = {
    data: [],
    isFetching: false,
    isPullToRefresh: false,
    errorMessage: '',
    errorRequest: () => {},
    emptyImage: '',
    emptyTitle: '',
    emptyDescription: '',
    showEmptyView: true,
    contentContainerStyle: {},
    modalLoading: false,
    hideLoading: false,
  };

  _renderFetching = () => {
    const {modalLoading, hideLoading} = this.props;

    if (hideLoading) {
      return <View style={{flex: 1, backgroundColor: 'white'}} />;
    }

    return (
      <Loading
        loading
        showNative={false}
        isModal={modalLoading}
        // json={Images.jsons.loader}
        image={Images.gifs.loader}
        isTransparent
      />
    );

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ProgressLib.Circle
          color={Colors.background.quaternary}
          borderWidth={3}
          indeterminate={true}
          endAngle={0.7}
          progress={1}
        />
      </View>
    );
  };

  _renderEmptyView = (errorMessage = '', errorRequest = undefined) => {
    const {emptyImage, emptyTitle, emptyDescription, showEmptyView} =
      this.props;

    if (!showEmptyView) {
      return null;
    }

    return (
      <EmptyView
        image={emptyImage}
        title={emptyTitle}
        description={emptyDescription}
        errorMessage={errorMessage}
        onPress={
          errorMessage && errorRequest ? () => errorRequest() : undefined
        }
        bottomStyle={{paddingHorizontal: Metrics.baseMargin * 1.25}}
      />
    );
  };

  _renderFooter = () => {
    const {data, isPullToRefresh, isFetching} = this.props;
    if (data && data.length > 0 && isFetching && !isPullToRefresh) {
      return <Progress style={{padding: Metrics.baseMargin}} />;
    }
    return null;
  };

  render() {
    const {
      data,
      contentContainerStyle,
      isFetching,
      isPullToRefresh,
      errorMessage,
      errorRequest,
      showEmptyView,
      ...rest
    } = this.props;

    if (showEmptyView && !data.length && isFetching && !isPullToRefresh) {
      return this._renderFetching();
    }

    if (showEmptyView && !isFetching && !data.length && errorMessage) {
      return this._renderEmptyView(errorMessage, errorRequest);
    }

    return (
      <FlatList
        data={data}
        contentContainerStyle={
          showEmptyView && !data.length
            ? ApplicationStyles.emptyListContainerStyle
            : contentContainerStyle
        }
        refreshing={isPullToRefresh}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={this._renderFooter}
        ListEmptyComponent={this._renderEmptyView()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...rest}
      />
    );
  }
}
