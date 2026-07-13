// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  button: {
    position: "absolute",
    width: Metrics.screenWidth,
    bottom: 0
  },
  spacer: {
    height: Metrics.doubleBaseMargin * 3.3
  }
});
