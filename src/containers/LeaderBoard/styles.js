import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.quaternary
  },
  contentContainerStyle: {
    // backgroundColor: Colors.background.quaternary,
    paddingTop: Metrics.baseMargin
  },
  headerContainer: {
    alignItems: "center",
    height: Metrics.ratio(300)
  },
  headerImage: {
    position: "absolute",
    top: Metrics.ratio(160),
    left: 0,
    right: 0,
    alignItems: "center"
  },
  headerItemContainer: {
    flex: 1,
    alignItems: "center"
  },
  headerItemImage: {
    marginBottom: Metrics.smallMargin
  },
  listStyle: {
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.ratio(10)
  },
  listItem: {
    flexDirection: "row",
    padding: Metrics.baseMargin,
    alignItems: "center"
  },
  listItemImage: {
    marginHorizontal: Metrics.baseMargin
  },
  listItemSeparator: {
    marginHorizontal: Metrics.baseMargin
  }
});
