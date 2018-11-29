/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import SignIn from './screens/SignIn';
import Search from './screens/Search';
import Detail from './screens/Detail';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MyRoute = createStackNavigator({
  SignIn: SignIn,
  Search: Search,
  Detail: Detail,
},{
  initialRouteName: 'SignIn'
});

const AppContainer = createAppContainer(MyRoute);
export default class App extends Component{
  render() {
    return (
      <AppContainer></AppContainer>
    );
  }
}

