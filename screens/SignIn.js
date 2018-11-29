import React from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {Input, Loader, TouchableHighlightButton } from './../components/index';
import { BASE_URL } from './../Constants';
import deviceStorage from './../services/deviceStorage';

const initialState = {
    username: '',
    usernameError: false,
    password: '',
    passwordError: false,
    err: '',
    loading: false
};
export default class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = initialState;
        console.log(this.props);
    }
    static navigationOptions = {
        header: null
    }

    validation = (text,name) => {
        if(name === 'username'){
            if (text === ''){
                this.setState({
                    usernameError: true
                })
            } else {
                this.setState({
                    usernameError: false
                })
            }
            this.setState({
                username: text,
                err: ''
            })
        }
        if(name === 'password'){
            if (text === ''){
                this.setState({
                    passwordError: true
                })
            } else {
                this.setState({
                    passwordError: false
                })
            }
            this.setState({
                password: text,
                err: ''
            })
        }
    }

    handleSubmit = () => {
        this.Login(this.state);
    }

    Login = async (state) => {
        let {username,password} = {...state};
        username = username.trim();
        password = password.trim();
        if(username === '' && password === '') {
            this.setState({
                usernameError: true,
                passwordError: true
            })
        } else if(username === ''){
            this.setState({
                usernameError: true
            })
        } else if(password === ''){
            this.setState({
                passwordError: true
            })
        } else {
            this.setState({
                loading: true
            });
            fetch(BASE_URL+'people/?search='+ username)
            .then((response) => response.json())
            .then((res) => {
                let result = res.results;
                if(result.length > 0 && result[0].name.toLowerCase() === username.toLowerCase() && result[0].birth_year === password){
                    // Successfully validate user credential
                    this.setState({
                        loading:false,
                        err: ''
                    })
                    deviceStorage.saveItem('loginUser',result[0].name);
                    this.setState(initialState);
                    this.props.navigation.navigate('Search');
                } else {
                    this.setState({
                        loading:false,
                        err: 'Wrong Credential'
                    })
                }
             })
             .catch((error) => {
                this.setState({
                    loading:false,
                    err: 'Unable to connect server'
                })
                console.log('Error', error);
            });
        }
    }

    render(){
        return(
            <View style={style.containerView}>
                <Image 
                source={require('./../images/logo.png')} 
                style={{width:180,height:100,resizeMode:'center',marginBottom: 20}}></Image>
                <Text style={style.error}>{this.state.err}</Text>
                <Input 
                placeholder="User Name" 
                onChangeText={(text) => this.validation(text,'username')} 
                value={this.state.username} 
                style={[style.input,this.state.usernameError ? style.requiredError : null]} 
                placeholderTextColor='#fff' 
                textStyle={{color:'#fff'}}></Input>
                
                <Input 
                placeholder="Password"
                onChangeText={(text) => this.validation(text,'password')} 
                value={this.state.password} 
                secureTextEntry={true} 
                style={[style.input,this.state.passwordError ? style.requiredError : null]} 
                placeholderTextColor='#fff' 
                textStyle={{color:'#fff'}}></Input>
                
                {!this.state.loading ? 
                    <TouchableHighlightButton onPress={this.handleSubmit} label='LOGIN' style={style.button} />
                    : <Loader />
                }
            </View>
        )
    }
};

const style = StyleSheet.create({
    containerView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#2B3C6F',
        alignItems: 'center'
    },
    input:{
        padding: 10,
        marginBottom: 10,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        width: '85%'
    },
    button:{
        borderColor: '#ffffff',
        backgroundColor:'#2B3C6F',
        borderWidth: 1,
        marginTop: 20
    },
    requiredError: {
        borderBottomColor: 'red'
    },
    error:{
        color: 'red'
    }
})

