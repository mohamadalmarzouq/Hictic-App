import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Animated,
  ScrollView,
  // Image,
  RefreshControl,
} from 'react-native';
import {Image} from '../';
import {ViewLayer} from '../';
import {TimerComponent} from '../../specifics';
import {Colors, Metrics} from '../../theme';
import styles from './styles';

// export const HEADER_MIN_HEIGHT = 80;
export const HEADER_MIN_HEIGHT = Math.round(80);
export const HEADER_MAX_HEIGHT = 240;

export default class ScrollableHeader extends React.PureComponent {
  static propTypes = {
    headerMinHeight: PropTypes.number,
    headerMaxHeight: PropTypes.number,
    renderFixedHeader: PropTypes.func,
    children: PropTypes.node.isRequired,
    headerBackgroundColor: PropTypes.string,
    headerImage: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
  };

  static defaultProps = {
    headerImage: undefined,
    renderFixedHeader: undefined,
    headerBackgroundColor: 'white',
    headerMinHeight: HEADER_MIN_HEIGHT,
    headerMaxHeight: HEADER_MAX_HEIGHT,
    refreshing: false,
    onRefresh: undefined,
  };

  state = {
    scrollY: new Animated.Value(0),
  };

  _getAnim(inputRange, outputRange, extrapolate = 'clamp') {
    return this.state.scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate,
    });
  }

  _renderScrollViewContent(scrollContentMargin, children) {
    return <View style={{marginTop: scrollContentMargin}}>{children}</View>;
  }

//   _renderHeader(
//     headerImage,
//     renderHeader,
//     headerMinHeight,
//     headerMaxHeight,
//     headerScrollDistance,
//     headerBackgroundColor,
//     timerCallback,
//   ) {
//     // const height = this._getAnim(
//     //   [0, headerScrollDistance],
//     //   [headerMaxHeight, headerMaxHeight - headerMinHeight],
//     // );
//     const height = this._getAnim(
//   [0, headerScrollDistance],
//   [
//     Math.round(headerMaxHeight),
//     Math.round(headerMaxHeight - headerMinHeight)
//   ]
// );

//     const opacity = this._getAnim(
//       [0, headerScrollDistance / 2, headerScrollDistance],
//       [1, 1, 0],
//     );
//     // const zIndex = this._getAnim([0, headerScrollDistance], [-1, 0.5]);
//     // zIndex must be INT only
// const zIndex = this._getAnim(
//   [0, headerScrollDistance],
//   [0, 1] // both integers
// );

//     const translateY = this._getAnim([0, headerScrollDistance], [0, -50]);
//     return (
//       <Animated.View
//         style={[
//           styles.header,
//           {
//             height,
//             zIndex,
//             backgroundColor: headerBackgroundColor,
//           },
//         ]}>
//         <Animated.View
//           style={{
//             opacity,
//             height: headerMaxHeight,
//             transform: [{translateY}],
//           }}>
//           <Image
//             source={headerImage}
//             style={{
//               height: headerMaxHeight,
//             }}
//           />
//           <ViewLayer />
//           {timerCallback && this._renderTimer()}
//         </Animated.View>
//       </Animated.View>
//     );
//   }



_renderHeader(
  headerImage,
  renderHeader,
  headerMinHeight,
  headerMaxHeight,
  headerScrollDistance,
  headerBackgroundColor,
  timerCallback,
) {

  return (
    <View
      style={[
        styles.header,
        {
          height: headerMaxHeight,
          backgroundColor: headerBackgroundColor,
          zIndex: 1,
        },
      ]}>
      <View
        style={{
          height: headerMaxHeight,
        }}>
        <Image
          source={headerImage}
          style={{
            height: headerMaxHeight,
          }}
        />
        <ViewLayer />
        {timerCallback && this._renderTimer()}
      </View>
    </View>
  );
}

  _renderFixedHeader(renderFixedHeader) {
    if (renderFixedHeader) {
      return <View style={{}}>{renderFixedHeader(this.state.scrollY)}</View>;
    }

    return null;
  }

  _renderTimer = () => {
    const {data, timerCallback} = this.props;
    const {start_date_time, end_date_time} = data;
    return (
      <TimerComponent
        style={{
          position: 'absolute',
          right: Metrics.ratio(20),
          bottom: Metrics.baseMargin,
        }}
        digitBgColor={Colors.background.septenary}
        digitTxtColor={Colors.text.primary}
        timeTxtColor={Colors.text.primary}
        start_date_time={start_date_time}
        end_date_time={end_date_time}
        callBack={timerCallback}
      />
    );
  };

  render() {
    const {
      children,
      headerImage,
      renderHeader,
      headerMinHeight,
      headerMaxHeight,
      renderFixedHeader,
      headerBackgroundColor,
      refreshing,
      onRefresh,
      data,
    } = this.props;

    const scrollContentMargin = headerMaxHeight - headerMinHeight;
    // const headerScrollDistance = headerMaxHeight - headerMinHeight * 2;
    const headerScrollDistance = Math.round(headerMaxHeight - headerMinHeight * 2);


    return (
      <View style={styles.container}>
        {this._renderFixedHeader(renderFixedHeader)}
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{backgroundColor: '#fff'}}
          // onScroll={Animated.event([
          //   {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          // ])}
          onScroll={Animated.event(
  [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
  { useNativeDriver: false }
)}
          refreshControl={
            onRefresh ? (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            ) : null
          }
          bounces={onRefresh !== undefined}>
          {this._renderHeader(
            headerImage,
            renderHeader,
            headerMinHeight,
            headerMaxHeight,
            headerScrollDistance,
            headerBackgroundColor,
            data,
          )}
          {this._renderScrollViewContent(scrollContentMargin, children)}
        </ScrollView>
        {/* {this._renderFixedHeader(renderFixedHeader)} */}
      </View>
    );
  }
}
