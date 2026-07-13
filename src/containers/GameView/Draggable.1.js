import React from "react";
import { StyleSheet, View, Animated, PanResponder } from "react-native";
import { Metrics } from "../../theme";

const selectedSchemaSize = Metrics.ratio(50);
const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    height: selectedSchemaSize,
    width: selectedSchemaSize
  },
  item: {
    position: "absolute",
    width: selectedSchemaSize,
    height: selectedSchemaSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: selectedSchemaSize / 2
  }
});

class Item {
  constructor(x, y, onDragStart, onDragRelease, canvasSize, isInDeleteArea) {
    const minXY = 0;
    // const maxXY = canvasSize - selectedSchemaSize;
    const maxX = 0;
    const maxY = canvasSize.y - selectedSchemaSize;

    this.pan = new Animated.ValueXY();
    this._value = { x: 0, y: 0 };

    this.pan.addListener(value => {
      this._value = value;
    });

    this.constrainedX = this.pan.x.interpolate({
      inputRange: [minXY, maxX],
      outputRange: [minXY, maxX],
      extrapolate: "clamp"
    });
    this.constrainedY = this.pan.y.interpolate({
      inputRange: [minXY, maxY],
      outputRange: [minXY, maxY * 1],
      extrapolate: "clamp"
    });
    this.pan.setValue({ x, y });
    this.panResponder = this._buildPanResponder(
      onDragStart,
      onDragRelease,
      canvasSize,
      isInDeleteArea
    );
  }

  get panResponderRef() {
    return this.panResponder;
  }

  _isValidSwipe(
    velocity,
    velocityThreshold,
    directionalOffset,
    directionalOffsetThreshold
  ) {
    return (
      Math.abs(velocity) > velocityThreshold &&
      Math.abs(directionalOffset) < directionalOffsetThreshold
    );
  }

  _isValidHorizontalSwipe(
    gestureState,
    velocityThreshold,
    directionalOffsetThreshold
  ) {
    const { vx, dy } = gestureState;
    return this._isValidSwipe(
      vx,
      velocityThreshold,
      dy,
      directionalOffsetThreshold
    );
  }

  _isValidVerticalSwipe(
    gestureState,
    velocityThreshold,
    directionalOffsetThreshold
  ) {
    const { vy, dx } = gestureState;
    return this._isValidSwipe(
      vy,
      velocityThreshold,
      dx,
      directionalOffsetThreshold
    );
  }

  _buildPanResponder(
    onDragStart,
    onDragRelease,
    canvasSize,
    isInDeleteArea,
    velocityThreshold = 0.4,
    directionalOffsetThreshold = 20
  ) {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        this.pan.setOffset({ x: this.pan.x._value, y: this.pan.y._value });
        this.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (event, gestureState) => {
        this.pan.setValue({ x: gestureState.dx, y: gestureState.dy });

        if (onDragStart && !this.hasDragStarted) {
          this.hasDragStarted = true;
          onDragStart({ x: this.pan.x._value, y: this.pan.y._value });
        }
      },
      onPanResponderRelease: () => {
        this.hasDragStarted = false;
        if (onDragRelease) {
          const maxX = canvasSize.x;
          const maxY = canvasSize.y;

          let xAxis = 0;
          if (this._value.x > maxX) {
            xAxis = maxX;
          } else if (this._value.x < 0) {
            xAxis = 0;
          } else {
            xAxis = this._value.x;
          }

          let yAxis = 0;
          if (this._value.y > maxY) {
            yAxis = maxY;
          } else if (this._value.y < 0) {
            yAxis = 0;
          } else {
            yAxis = this._value.y;
          }

          onDragRelease({
            x: xAxis,
            y: yAxis
          });
        }
        /* console.log(
          "onPanResponderRelease",
          this._value.x + " - " + this._value.y
        ); */
        this.pan.flattenOffset();
        this.hasDragStarted = false;
      }
    });
  }
}

export default class Draggable extends React.Component {
  _renderItem(children) {
    return (
      <Animated.View
        style={StyleSheet.flatten([
          styles.item,
          {
            left: this.item.constrainedX,
            top: this.item.constrainedY,
            height: selectedSchemaSize,
            width: selectedSchemaSize
          }
        ])}
        /* style={[styles.item, this.pan.getLayout()]} */
        {...this.item.panResponderRef.panHandlers}
      >
        {children}
      </Animated.View>
    );
  }

  render() {
    // eslint-disable-next-line
    const {
      x,
      y,
      onDragStart,
      onDragRelease,
      children,
      canvasSize,
      isInDeleteArea
    } = this.props;
    if (!this.item) {
      this.item = new Item(
        x,
        y,
        onDragStart,
        onDragRelease,
        canvasSize,
        isInDeleteArea
      );
    } else {
      /* console.log("ELSE", x + " - " + y); */
      this.item.pan.setValue({ x, y });
    }
    return <View style={styles.container}>{this._renderItem(children)}</View>;
  }
}
