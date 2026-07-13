// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../theme";

export default StyleSheet.create({
  filterHeader: {
    marginHorizontal: Metrics.baseMargin * 1.25,
    marginTop: Metrics.baseMargin * 0.8,
    marginBottom: Metrics.smallMargin * 1.5
  },
  filterItemsContainer: {
    marginHorizontal: Metrics.baseMargin * 1.25,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  filterText: {
    paddingHorizontal: Metrics.baseMargin * 0.75,
    paddingVertical: Metrics.ratio(6)
  },
  filterSelect: {
    padding: Metrics.ratio(1)
  },
  filterUnselect: {
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.background.quinary
  },
  seperator: {
    marginTop: Metrics.smallMargin * 1.2
  },
  gradientStyle: {
    borderRadius: Metrics.borderRadius,
    marginRight: Metrics.smallMargin * 1.5,
    marginBottom: Metrics.smallMargin * 1.5
  }
});
