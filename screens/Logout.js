import React from 'react';
import {View, Text,TouchableWithoutFeedback} from 'react-native';
import deviceStorage from './../services/deviceStorage';
export default class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isUserLoggedIn: false,
            loggedInUser: ''
        }
    }
    componentDidMount(){
        deviceStorage.getItem('loginUser').then((res) => {
            if(res !== ''){
                this.setState({
                    isUserLoggedIn: true,
                    loggedInUser: res
                })
            }
        });
    }
    handleLogout = () => {
        deviceStorage.removeItem('loginUser');
        this.props.navigation.navigate('SignIn');
    }
    render(){
        console.log(this.props);
        return(
            <TouchableWithoutFeedback onPress={this.handleLogout}>
                <View style={{padding:5}}>
                    <Text style={{fontWeight:'bold'}}>Logout</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}