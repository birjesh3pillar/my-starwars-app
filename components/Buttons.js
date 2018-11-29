import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet} from 'react-native';

export default class TouchableHighlightButton extends React.Component{
    render(){
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={[style.touchableHeighlightButton, this.props.style]}>
                    <Text style={[style.touchableHeighlightButtonText, this.props.bottonText]}>{this.props.label}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const style = StyleSheet.create({
    touchableHeighlightButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius:10,
        width: '50%' 
    },
    touchableHeighlightButtonText:{
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})