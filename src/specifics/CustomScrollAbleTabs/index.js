import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, useWindowDimensions, Text } from "react-native";
import { TabView } from "react-native-tab-view";
import { Colors, ApplicationStyles, Fonts } from "../../theme";

export default function CustomScrollAbleTabs({ children, isScrollable }) {
  const layout = useWindowDimensions();

  // Ensure children is always an array
  const childArray = React.Children.toArray(children);

  const routes = childArray.map((child, index) => ({
    key: index.toString(),
    title: child.props.tabLabel || `Tab ${index + 1}`,
  }));

  const [index, setIndex] = useState(0);

  const renderScene = ({ route }) => {
    const child = childArray[parseInt(route.key, 10)];
    return <View style={{ flex: 1 }}>{child}</View>;
  };

//   const renderTabBar = ({ navigationState, jumpTo }) => {
//     const tabs = navigationState.routes;

//     // NON-scrollable tabs
//     if (!isScrollable) {
//       return (
//         <View
//           style={{
//             flexDirection: "row",
//             borderWidth: 0,
//             alignItems: "center",
//             backgroundColor: Colors.background.primary,
//           }}
//         >
//           {tabs.map((tab, idx) => (
//             <TouchableOpacity
//               key={tab.key}
//               onPress={() => jumpTo(tab.key)}
//               style={{
//                 flex: 1,
//                 paddingVertical: 12,
//                 alignItems: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   color:
//                     navigationState.index === idx
//                       ? Colors.text.secondary
//                       : Colors.text.secondary,
//                   ...ApplicationStyles.b20Secondary,
//                 }}
//               >
//                 {tab.title}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       );
//     }

//     // SCROLLABLE tabs
//     return (
//      <View style={{backgroundColor: Colors.background.primary }}>
//   <ScrollView
//     horizontal
//     showsHorizontalScrollIndicator={false}
//     contentContainerStyle={{ alignItems: 'center' }}
//   >
//         {tabs.map((tab, idx) => (
//           <TouchableOpacity
//             key={tab.key}
//             onPress={() => jumpTo(tab.key)}
//             style={{ paddingVertical: 12, paddingHorizontal: 20 }}
//           >
//             <Text
//               style={{
//                 fontFamily: Fonts.type.light,
//                 fontSize: Fonts.size.large,
//                 color:
//                   navigationState.index === idx
//                     ? Colors.text.septenary
//                     : Colors.text.secondary,
//               }}
//             >
//               {tab.title}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
// </View>
//     );
//   };

const renderTabBar = ({ navigationState, jumpTo }) => {
  const tabs = navigationState.routes;

  const activeColor = Colors.text.septenary;     // Highlight color
  const inactiveColor = Colors.text.secondary; // Normal color
  const underlineColor = Colors.primary;       // Tab underline color

  // NON-scrollable tabs
  if (!isScrollable) {
    return (
      <View style={{ flexDirection: "row", backgroundColor: Colors.background.primary }}>
        {tabs.map((tab, idx) => {
          const isActive = navigationState.index === idx;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => jumpTo(tab.key)}
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: isActive ? 3 : 0,
                borderBottomColor: underlineColor,
              }}
            >
              <Text
                style={{
                  ...ApplicationStyles.b20Secondary,
                  color: isActive ? activeColor : inactiveColor,
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // SCROLLABLE tabs
  return (
    <View style={{ backgroundColor: Colors.background.primary }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {tabs.map((tab, idx) => {
          const isActive = navigationState.index === idx;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => jumpTo(tab.key)}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 22,
                borderBottomWidth: isActive ? 3 : 0,
                borderBottomColor: underlineColor,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.type.light,
                  fontSize: Fonts.size.large,
                  color: isActive ? activeColor : inactiveColor,
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};


  return (
    <TabView
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      initialLayout={{ width: layout.width }}
      lazy
      style={{ backgroundColor: Colors.background.primary }}
    />
  );
}

// import React, { useState } from 'react';
// import { View, useWindowDimensions } from 'react-native';
// import { TabView } from 'react-native-tab-view';
// import { Colors, ApplicationStyles, Fonts } from '../../theme';
// import { CustomTabs, CustomScrollableTabBar } from '../';

// export default function CustomScrollAbleTabs({ children, isScrollable }) {
//   const layout = useWindowDimensions();

//   // convert children → routes
//   const routes = React.Children.map(children, (child, index) => ({
//     key: index.toString(),
//     title: child.props.tabLabel || `Tab ${index + 1}`,
//   }));

//   const [index, setIndex] = useState(0);

//   const renderScene = ({ route }) => {
//     const child = children[parseInt(route.key, 10)];
//     return <View style={{ flex: 1 }}>{child}</View>;
//   };

//   const renderTabBar = (props) =>
//     !isScrollable ? (
//       <CustomTabs
//         {...props}
//         style={{ borderWidth: 0, alignItems: 'center' }}
//         tabStyle={{ paddingBottom: 0 }}
//         activeTextColor={Colors.text.secondary}
//         inactiveTextColor={Colors.text.secondary}
//         textStyle={ApplicationStyles.b20Secondary}
//       />
//     ) : (
//       <CustomScrollableTabBar
//         {...props}
//         style={{ borderWidth: 0 }}
//         activeTextColor={Colors.text.septenary}
//         inactiveTextColor={Colors.text.secondary}
//         textStyle={styles.customScrollableTabBarTextStyle}
//       />
//     );

//   return (
//     <TabView
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderTabBar={renderTabBar}
//       renderScene={renderScene}
//       initialLayout={{ width: layout.width }}
//       lazy
//       style={{ backgroundColor: Colors.background.primary }}
//     />
//   );
// }

// const styles = {
//   customScrollableTabBarTextStyle: {
//     fontFamily: Fonts.type.light,
//     fontSize: Fonts.size.large,
//   },
// };



// old code
// import React from 'react';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import {Colors, ApplicationStyles, Fonts} from '../../theme';
// import {CustomTabs, CustomScrollableTabBar} from '../';
// import {Platform} from 'react-native';

// export default class CustomScrollAbleTabs extends React.Component {
//   _renderTabBar = () => {
//     const {isScrollable} = this.props;

//     return !isScrollable ? (
//       <CustomTabs
//         style={{borderWidth: 0, alignItems: 'center'}}
//         tabStyle={{paddingBottom: 0}}
//         activeTextColor={Colors.text.secondary}
//         inactiveTextColor={Colors.text.secondary}
//         textStyle={ApplicationStyles.b20Secondary}
//       />
//     ) : (
//       <CustomScrollableTabBar
//         style={{borderWidth: 0}}
//         activeTextColor={Colors.text.septenary}
//         inactiveTextColor={Colors.text.secondary}
//         textStyle={styles.customScrollableTabBarTextStyle}
//       />
//     );
//   };

//   render() {
//     const {isScrollable, ...rest} = this.props;
//     return (
//       // <ScrollableTabView
//       //   style={{
//       //     backgroundColor: Colors.background.primary,
//       //   }}
//       //   tabBarUnderlineStyle={{backgroundColor: Colors.transparent}}
//       //   tabBarBackgroundColor={Colors.background.primary}
//       //   renderTabBar={this._renderTabBar}
//       //   locked
//       //   {...rest}>
//       //   {this.props.children}
//       // </ScrollableTabView>
//       <></>
//     );
//   }
// }

// const styles = {
//   customScrollableTabBarTextStyle: {
//     fontFamily: Fonts.type.light,
//     fontSize: Fonts.size.large,
//   },
// };
