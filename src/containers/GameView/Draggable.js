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
  constructor(x, y, canvasSize) {
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
      outputRange: [selectedSchemaSize, maxY * 1],
      extrapolate: "clamp"
    });
    this.pan.setValue({ x, y });
    this.panResponder = this._buildPanResponder(canvasSize);
  }

  get panResponderRef() {
    return this.panResponder;
  }

  _buildPanResponder(canvasSize) {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      // onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx != 0 && gestureState.dy != 0;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return !(gestureState.dx === 0 && gestureState.dy === 0);
      },

      onPanResponderGrant: () => {
        this.pan.setOffset({ x: this.pan.x._value, y: this.pan.y._value });
        this.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (event, gestureState) => {
        this.pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: () => {
        this.pan.flattenOffset();
      }
    });
  }
}

export default class Draggable extends React.Component {
  render() {
    const { x, y, children, canvasSize } = this.props;
    if (!this.item) {
      this.item = new Item(x, y, canvasSize);
    } else {
      this.item.pan.setValue({ x, y });
    }
    return (
      <View style={styles.container}>
        <Animated.View
          style={StyleSheet.flatten([
            styles.item,
            {
              left: this.item.constrainedX,
              top: this.item.constrainedY
            }
          ])}
          {...this.item.panResponderRef.panHandlers}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
}
