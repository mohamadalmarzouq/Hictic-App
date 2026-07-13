// // @flow
// import _ from 'lodash';
// import {View, ScrollView, Keyboard, Text} from 'react-native';
// import React, {Component} from 'react';
// import {Actions} from 'react-native-router-flux';
// import styles from './styles';
// import {ButtonView, HeaderButton} from '../../components';
// import {EmptyView} from '../../specifics';
// import FilterItem from './FilterItem';
// import {ApplicationStyles, Strings, Images, Metrics} from '../../theme';

// //
// import {connect} from 'react-redux';
// import {WithFetching} from '../../HOC';
// import {FILTER} from '../../actions/ActionTypes';
// import {generalAction} from '../../actions/GeneralAction';
// import {API_FILTER} from '../../config/WebService';
// import { navNavigate } from '../../navigator';

// const data = [
//   {
//     id: 1,
//     name: 'Brands',
//     filterList: [{id: 1, name: 'Nike', isSelected: true}],
//   },
//   {
//     id: 2,
//     name: 'Categories',
//     filterList: [{id: 1, name: 'Arcade', isSelected: true}],
//   },
// ];

// class Filter extends Component {
//   state = {
//     data: [],
//   };

//   componentWillMount() {
//     // Hide that keyboard!
//     Keyboard.dismiss();
//   }

//   componentDidMount() {
//     this.setApplyButton(true);
//     this._getData();
//   }

//   setApplyButton = (disabled = false) => {
//     // setTimeout(() => {
//     this.props.navigation.setOptions({
//   headerRight: () => (
//     <HeaderButton
//       text={Strings.button_apply}
//       onPress={this._onApplyPress}
//       disabled={disabled}
//     />
//   ),
// });
//     // }, 100);
//   };

//   _onApplyPress = () => {
//     const {data} = this.state;
//     const selectedItems = {};

//     data.forEach(item => {
//       selectedItems[item.serverKey] = item.filterList
//         .filter(item => item.isSelected)
//         .map(item => item.id)
//         .join(',');
//     });

//     console.log('selectedItems', selectedItems);
//     // Actions.filterCampaigns({selectedItems});
//      navNavigate("filterCampaigns",{selectedItems})
//   };

//   _clear = () => {
//     const newData = _.cloneDeep(this.state.data);

//     for (let i = 0; i < newData.length; i += 1) {
//       const filterListData = newData[i].filterList;
//       for (let j = 0; j < filterListData.length; j += 1) {
//         filterListData[j].isSelected = false;
//       }
//     }
//     this.setState({
//       data: newData,
//     });
//   };

//   _renderFilterItem = (item, index, array) => (
//     <FilterItem
//       filterItem={item}
//       key={index}
//       mainIndex={index}
//       updateFilter={this.updateFilter}
//       disableSeprator={index === array.length - 1}
//     />
//   );

//   updateFilter = (mainIndex, index) => {
//     const newData = _.cloneDeep(this.state.data);
//     newData[mainIndex].filterList[index].isSelected =
//       !newData[mainIndex].filterList[index].isSelected;

//     let disable = true;
//     for (let index = 0; index < newData.length; index++) {
//       //  const element = array[index];
//       console.log(newData[index].filterList.filter(item => item.isSelected));

//       if (
//         newData[index].filterList.filter(item => item.isSelected).length > 0
//       ) {
//         disable = false;
//         break;
//       }
//     }

//     this.setApplyButton(disable);

//     this.setState({
//       data: newData,
//     });
//   };

//   _getData = () => {
//     console.log("this.props",this.props);
    
//     const {generalAction, cbShowLoader} = this.props;
//     cbShowLoader(true);
//     generalAction(
//       API_FILTER,
//       {},
//       FILTER.SUCCESS,
//       FILTER.FAILURE,
//       data => {
//         cbShowLoader(false);
//         this._setData(data);
//       },
//       err => {
//         cbShowLoader(false);
//       },
//       false,
//       true,
//     );
//   };

//   _setData = data => {
//     const filterData = [];

//     if (data.brands && data.brands.length) {
//       filterData.push({
//         id: 1,
//         name: 'Brands',
//         filterList: data.brands,
//         serverKey: 'game_brand',
//       });
//     }

//     if (data.games && data.games.length) {
//       filterData.push({
//         id: 2,
//         name: 'Games',
//         filterList: data.games,
//         serverKey: 'games_id',
//       });
//     }

//     if (data.categories && data.categories.length) {
//       filterData.push({
//         id: 3,
//         name: 'Categories',
//         filterList: data.categories,
//         serverKey: 'game_category',
//       });
//     }

//     if (data.reward_types && data.reward_types.length) {
//       filterData.push({
//         id: 4,
//         name: 'Reward Types',
//         filterList: data.reward_types,
//         serverKey: 'reward_type',
//       });
//     }

//     this.setState({data: filterData});
//   };

//   _renderEmptyView = (errorMessage = '') => {
//     return (
//       <View style={ApplicationStyles.scrollContainer}>
//         <EmptyView
//           image={Images.emptyImages.campaigns}
//           title={Strings.emptyTitles.filters}
//           description={Strings.emptyDescriptions.filters}
//           errorMessage={errorMessage}
//           onPress={errorMessage ? this._getData : undefined}
//           bottomStyle={{paddingHorizontal: Metrics.baseMargin * 1.25}}
//         />
//       </View>
//     );
//   };

//   render() {
//     const {data} = this.state;
//     const {errorMessage} = this.props.filter;

//     if (errorMessage !== '') {
//       return this._renderEmptyView(errorMessage);
//     }

//     return (
//       <View style={ApplicationStyles.flex}>
//         <ScrollView style={styles.container}>
//           {data.map(this._renderFilterItem)}
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const mapStateToProps = ({filter}) => ({filter});
// const actions = {generalAction};

// export default connect(mapStateToProps, actions)(WithFetching(Filter));







// @flow
import _ from 'lodash';
import React, {Component} from 'react';
import {View, ScrollView, Keyboard} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {ButtonView, HeaderButton} from '../../components';
import {EmptyView} from '../../specifics';
import FilterItem from './FilterItem';
import {ApplicationStyles, Strings, Images, Metrics} from '../../theme';

import {WithFetching} from '../../HOC';
import {FILTER} from '../../actions/ActionTypes';
import {generalAction} from '../../actions/GeneralAction';
import {API_FILTER} from '../../config/WebService';
import {navNavigate} from '../../navigator';

class Filter extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    Keyboard.dismiss();

    // First-time apply button state
    this.setupHeader(true);

    // Fix for iOS header disappearing after navigating back
    this.focusListener = this.props.navigation.addListener('focus', () => {
      // Re-set header every time screen gains focus
      this.setupHeader(this.isApplyDisabled());
    });

    this.loadFilters();
  }

  componentWillUnmount() {
     if (this.focusListener) {
      this.focusListener(); // unsubscribe
    }
  }

  /** Setup header right button */
  setupHeader = (disabled = false) => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          text={Strings.button_apply}
          onPress={this.onApplyPress}
          disabled={disabled}
        />
      ),
    });
  };

  /** Determine if apply button should be disabled */
  isApplyDisabled = () => {
    const {data} = this.state;

    for (const item of data) {
      if (item.filterList.some(filter => filter.isSelected)) {
        return false;
      }
    }
    return true;
  };

  /** Apply button handler */
  onApplyPress = () => {
    const {data} = this.state;
    const selectedItems = {};

    data.forEach(item => {
      selectedItems[item.serverKey] = item.filterList
        .filter(f => f.isSelected)
        .map(f => f.id)
        .join(',');
    });

    navNavigate('filterCampaigns', {selectedItems});
  };

  /** Main API call */
  loadFilters = () => {
    const {generalAction, cbShowLoader} = this.props;

    cbShowLoader(true);
    generalAction(
      API_FILTER,
      {},
      FILTER.SUCCESS,
      FILTER.FAILURE,
      res => {
        cbShowLoader(false);
        this.setFilterData(res);
      },
      () => cbShowLoader(false),
      false,
      true
    );
  };

  /** Format filter data */
  setFilterData = (data) => {
    const result = [];

    if (data.brands?.length) {
      result.push({
        id: 1,
        name: 'Brands',
        filterList: data.brands,
        serverKey: 'game_brand',
      });
    }

    if (data.games?.length) {
      result.push({
        id: 2,
        name: 'Games',
        filterList: data.games,
       	serverKey: 'games_id',
      });
    }

    if (data.categories?.length) {
      result.push({
        id: 3,
        name: 'Categories',
        filterList: data.categories,
        serverKey: 'game_category',
      });
    }

    if (data.reward_types?.length) {
      result.push({
        id: 4,
        name: 'Reward Types',
        filterList: data.reward_types,
        serverKey: 'reward_type',
      });
    }

    this.setState({data: result}, () => {
      this.setupHeader(this.isApplyDisabled());
    });
  };

  /** Update filter selection */
  updateFilter = (mainIndex, index) => {
    const newData = _.cloneDeep(this.state.data);
    const filter = newData[mainIndex].filterList[index];
    filter.isSelected = !filter.isSelected;

    this.setState({data: newData}, () => {
      this.setupHeader(this.isApplyDisabled());
    });
  };

  /** Render one filter section */
  renderFilterItem = (item, index, array) => (
    <FilterItem
      key={index}
      filterItem={item}
      mainIndex={index}
      updateFilter={this.updateFilter}
      disableSeprator={index === array.length - 1}
    />
  );

  /** Empty view for error */
  renderEmptyView = (errorMessage = '') => (
    <View style={ApplicationStyles.scrollContainer}>
      <EmptyView
        image={Images.emptyImages.campaigns}
        title={Strings.emptyTitles.filters}
        description={Strings.emptyDescriptions.filters}
        errorMessage={errorMessage}
        onPress={errorMessage ? this.loadFilters : undefined}
        bottomStyle={{paddingHorizontal: Metrics.baseMargin * 1.25}}
      />
    </View>
  );

  /** Main Render */
  render() {
    const {data} = this.state;
    const {errorMessage} = this.props.filter;

    if (errorMessage) {
      return this.renderEmptyView(errorMessage);
    }

    return (
      <View style={ApplicationStyles.flex}>
        <ScrollView style={styles.container}>
          {data.map(this.renderFilterItem)}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({filter}) => ({filter});
const actions = {generalAction};

export default connect(mapStateToProps, actions)(WithFetching(Filter));
