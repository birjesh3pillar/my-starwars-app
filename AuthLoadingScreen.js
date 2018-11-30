import React from 'react';
import {View, StatusBar, AsyncStorage, ActivityIndicator} from 'react-native';
export default class AuthLoadingScreen extends React.Component{
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const loginUser =  await AsyncStorage.getItem('loginUser');
        this.props.navigation.navigate(loginUser ? 'App' : 'Auth');
    } 
    
    render(){
        return(
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}
