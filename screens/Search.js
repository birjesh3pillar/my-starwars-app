import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableWithoutFeedback} from 'react-native';
import { Input, Loader } from './../components/index';
import { APP_COLOR,BASE_URL } from './../Constants';
import Logout from './Logout';
import deviceStorage from './../services/deviceStorage';

const apiCallRecord = {
    lastCalledTime: '',
    maxCalledLimit: 5,
    apiCalled: 0
};
export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            data: [],
            err: '',
            loggedInUser: ''
        }
    }

    componentDidMount(){
        deviceStorage.getItem('loginUser').then((res) => {
            this.setState({
                loggedInUser: res
            });
        });
        this.getPlanets();
    }

    getPlanets = (planetName=undefined) => {
        let url = planetName === undefined ? BASE_URL+ 'planets/' : BASE_URL+ 'planets/?search='+ planetName;
        fetch(url)
        .then((response) => response.json())
        .then((res) => {
            if(res.results.length > 0) {
                // Search keyword found
                let highestPopulation = 0;
                let highestPopulationIndex = 0;
                let data = res.results.map((item,index)=>{
                    if(item.population !== 'unknown' && parseInt(item.population) > highestPopulation){
                        highestPopulation = parseInt(item.population);
                        highestPopulationIndex = index;
                    } 
                    return Object.assign({},item,{key:item.name,isHighestPopulation:false});
                })
                data[highestPopulationIndex]['isHighestPopulation'] = true;
                this.setState({
                    loading: false,
                    data: data,
                    err: ''
                })
            } else {
                this.setState({
                    loading: false,
                    data: [],
                    err: 'No result found'
                })
            }
        })
        .catch((error) => {
            this.setState({
                loading: false,
                data: [],
                err: 'Unable to connect server'
            })
        });
    }

    handleSearch = (text) => {
        let searchKeyword = text.trim();
        if(searchKeyword !== ''){
            this.setState({
                loading: true
            });
            let limitValidation = this.validateApiCallLimit();
            if(limitValidation === true){
                this.getPlanets(searchKeyword);
            } else {
                this.setState({
                    loading: false,
                    data: [],
                    err: 'You have exceeded the allowed api hit.'
                })
            }
        }
    }

    validateApiCallLimit = () => {
        // Only the user Luke Skywalker should be able to make more than 5 searches in a minute.
        if(this.state.loggedInUser !== 'Luke Skywalker'){
            if(apiCallRecord.lastCalledTime != ''){
                let apiCalledInterval = new Date().getTime() - apiCallRecord.lastCalledTime.getTime();
                var seconds = Math.floor((apiCalledInterval) / (1000));
                if(seconds <= 60){
                    if(apiCallRecord.apiCalled < apiCallRecord.maxCalledLimit){
                        apiCallRecord.apiCalled += 1;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    apiCallRecord.lastCalledTime = new Date();
                    apiCallRecord.apiCalled = 1;
                    return true;
                }
            } else {
                apiCallRecord.lastCalledTime = new Date();
                apiCallRecord.apiCalled += 1;
                return true;
            }
        } else {
            return true;
        }
    }

    showDetail = (obj) => {
        this.props.navigation.navigate('Detail', {
            url: obj.url,
            item: obj
        });
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Search',
            headerLeft: null,
            headerRight: (<Logout navigation={navigation}/>)
        }
    }
    render(){
        return(
            <View style={style.containerView}>
                <Input style={style.searchInput} placeholder='Search...' placeholderTextColor='#fff' 
                textStyle={{color:'#fff'}} onChangeText={(text) => this.handleSearch(text)}></Input>
                {this.state.err !== '' && this.state.loading === false ? 
                <View style={style.noResult}>
                    <Text style={style.noResultText}>{this.state.err}</Text>
                </View> : null}
                {!this.state.loading ? 
                    <View>
                        <FlatList data={this.state.data}
                            renderItem={({item}) => 
                            <TouchableWithoutFeedback onPress={() => this.showDetail(item)}>
                                <View style={[style.item,{backgroundColor: item.isHighestPopulation ? '#D85858' : null}]}>
                                        <Text style={style.nameLabel}>{item.name}</Text>
                                        <Text style={style.populationLabel}>{item.population}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            } />
                    </View>
                    : <Loader style={{flex:1, justifyContent: 'center'}} loaderProp={{color:'#CCCCCC',size: 'small'}}/>
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: APP_COLOR
    },
    searchInput: {
        padding: 10,
        borderColor: '#CCCCCC',
        borderWidth: 2,
    },
    item: {
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 2,
        padding: 10,
        marginLeft: 8,
        marginRight: 8
    },
    noResult: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#CCCCCC'
    },
    nameLabel: {
        color: '#CCCCCC',
        fontSize: 18,
        fontWeight: 'bold'
    },
    populationLabel: {
        color: '#FDD24E',
        fontSize: 14
    }
})
