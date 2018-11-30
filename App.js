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
import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import AuthLoadingScreen from './AuthLoadingScreen';

const AppStack = createStackNavigator({
  Search: Search,
  Detail: Detail
});
const AuthStack = createStackNavigator({SignIn: SignIn});
const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
export default class App extends Component{
  render() {
    return (
      <AppContainer></AppContainer>
    );
  }
}

