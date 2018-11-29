import React from 'react';
import { TextInput,View, StyleSheet } from 'react-native';

export default class Input extends React.Component{
    render(){
        return(
            <View style={[style.inputView,this.props.style]}>
                <TextInput {...this.props} onChangeText={this.props.onChangeText}  style={[style.input,this.props.textStyle]}>
                </TextInput>
            </View>
        )
    }
}

const style = StyleSheet.create({
    inputView:{
        padding: 5
    },
    input:{
        fontSize: 15
    }
})
