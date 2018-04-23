import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
//import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';
import reducers from './reducers';
import Main from './components/Main';
import Menu from './components/Menu';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{flex: 1}}>
          <Main style={{flex: 1}} />
          <Menu />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
});
