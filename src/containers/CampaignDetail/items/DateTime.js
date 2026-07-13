import React from "react";
import { View, Text } from "react-native";
import { ApplicationStyles, Colors, Strings, Metrics } from "../../../theme";
import {
  DATE_TIME_FORMAT,
  DATE_TIME_FORMAT2,
  DATE,
  MONTH,
  DAY_TIME,
} from "../../../constants";
import Utils from "../../../utils";

const styles = {
  dateTimeContainer: {
    paddingHorizontal: Metrics.baseMargin * 1.25,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
  },
  dateTimeSubContainer: {
    flexDirection: "row",
  },
  dateStyle: {
    // marginTop: Metrics.baseMargin,
    // marginBottom: Metrics.ratio(10)
    marginTop: Metrics.smallMargin * 1.5,
    marginBottom: Metrics.ratio(10),
  },
  dateTimeStyle: {
    flex: 1,
    flexDirection: "row",
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.background.octonary,
    borderRadius: Metrics.borderRadius,
    alignItems: "center",
    paddingVertical: Metrics.smallMargin * 0.75,
    paddingHorizontal: Metrics.smallMargin * 1.5,
    justifyContent: "space-between",
  },
};

export default class DateTime extends React.PureComponent {
  _renderDateItem = (date, time, margin) => {
    return (
      <View
        style={[
          styles.dateTimeStyle,
          {
            marginRight: margin ? Metrics.ratio(10) : 0,
          },
        ]}
      >
        <View>
          <Text
            style={[
              ApplicationStyles.m17Senary,
              ApplicationStyles.centerAligned,
            ]}
          >
            {Utils.getDateTimeFormatInLocalGmt(date, time, MONTH).toUpperCase()}
          </Text>
          <Text
            style={[
              ApplicationStyles.re17Secondary,
              ApplicationStyles.textCenter,
            ]}
          >
            {Utils.getDateTimeFormatInLocalGmt(date, time, DATE)}
          </Text>
        </View>
        <Text style={ApplicationStyles.re17Secondary}>
          {Utils.getDateTimeFormatInLocalGmt(date, time, DAY_TIME)}
        </Text>
      </View>
    );
  };

  render() {
    const { start_date_time, end_date_time } = this.props;
    return (
      <View style={styles.dateTimeContainer}>
        <Text style={ApplicationStyles.b20Secondary}>
          {Strings.date_and_time}
        </Text>
        <Text style={[ApplicationStyles.b17Secondary, styles.dateStyle]}>
          {start_date_time && end_date_time
            ? `${Utils.getDateTimeFormatInLocalGmt(
                start_date_time.split(" ")[0],
                start_date_time.split(" ")[1],

                DATE_TIME_FORMAT2
              )} - ${Utils.getDateTimeFormatInLocalGmt(
                end_date_time.split(" ")[0],
                end_date_time.split(" ")[1],
                DATE_TIME_FORMAT2
              )}`
            : "N/A"}
        </Text>
        {start_date_time && end_date_time && (
          <View style={styles.dateTimeSubContainer}>
            {this._renderDateItem(
              start_date_time.split(" ")[0],
              start_date_time.split(" ")[1],
              true
            )}
            {this._renderDateItem(
              end_date_time.split(" ")[0],
              end_date_time.split(" ")[1]
            )}
          </View>
        )}
      </View>
    );
  }
}
