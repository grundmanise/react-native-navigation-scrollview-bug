import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

const ITEM_HEIGHT = 100;
const { width: vw } = Dimensions.get('screen');

class App extends Component {
  static navigatorStyle = {
    statusBarTextColorSchemeSingleScreen: 'dark',
    screenBackgroundColor: 'green',
  };

  getData = () => {
    return Array(20).fill('test');
  };

  flatListCell = ({ item, index }) => {
    return (
      <TouchableHighlight
        style={{
          height: ITEM_HEIGHT,
          width: vw,
          backgroundColor: `rgba(0,${index * 10 + 100},0,1)`,
        }}
        onPress={() => {
          alert('pressed');
        }}
      >
        <Text style={styles.text}>{index}</Text>
      </TouchableHighlight>
    );
  };

  getItemLayout = (data, index) => {
    return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
  };

  keyExtractor = (item, index) => {
    return index.toString();
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={this.getData()}
          renderItem={this.flatListCell}
          keyExtractor={this.keyExtractor}
          getItemLayout={this.getItemLayout}
        />
      </View>
    );
  }
}

function Foo() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  flatList: {
    flex: 1,
  },
  text: {
    color: 'red',
  },
});

// Register screens
Navigation.registerComponent('App', () => App);
Navigation.registerComponent('Foo', () => Foo);

// Bootstrap
const navigatorStyle = { navBarHidden: true };

Navigation.startTabBasedApp({
  tabs: [
    {
      screen: 'App',
      navigatorStyle: navigatorStyle,
      label: 'A',
    },
    {
      screen: 'Foo',
      navigatorStyle: navigatorStyle,
      label: 'B',
    },
  ],
  tabsStyle: {
    tabBarButtonColor: 'grey',
    tabBarSelectedButtonColor: 'black',
    tabBarBackgroundColor: 'blue',
    tabBarHideShadow: true,
  },
  animationType: 'fade',
});
