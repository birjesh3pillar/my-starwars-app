import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export default class Loader extends React.Component{
    render(){
        return(
            <View {...this.props}>
                <ActivityIndicator {...this.props.loaderProp}>

                </ActivityIndicator>
            </View>
        )
    }
}