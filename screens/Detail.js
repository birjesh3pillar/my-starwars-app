import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { APP_COLOR } from './../Constants';
import Logout from './Logout';

const Row = (props) => {
    return (
    <View style={style.innerContainer}>
        <View style={[style.rowItem,{backgroundColor:'#CCCCCC', flex:3, borderBottomColor:'#ffffff',borderBottomWidth:2}]}>
            <Text>{props.label}</Text>
        </View>
        <View style={[style.rowItem,{flex:7}]}>
            <Text>{props.value}</Text>
        </View>
    </View>)
};

export default class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            planet: this.props.navigation.getParam('item'),
            loading: false
        }
        
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Planet Detail',
            headerRight: (<Logout navigation={navigation}/>)
        }
    }

    getPlanetDetail = (url) => {
        this.setState({
            planet: '',
            loading: true
        });
        fetch(url)
        .then((res) => res.json())
        .then((jsonRes) => {
            console.log(jsonRes);
        }).catch((error) => {
            console.log(error);
        })
    }
    render(){
        let planet = this.state.planet;
        return(
            <ScrollView>
                <Row label='Name' value={planet.name}/>
                <Row label='Population' value={planet.population}/>
                <Row label='Rotation Period' value={planet.rotation_period}/>
                <Row label='Orbital Period' value={planet.orbital_period}/>
                <Row label='Diameter' value={planet.diameter}/>
                <Row label='Climate' value={planet.climate}/>
                <Row label='Gravity' value={planet.gravity}/>
                <Row label='Terrain' value={planet.terrain}/>
                <Row label='Surface Water' value={planet.surface_water}/>
                <Row label='Residents' value={planet.residents}/>
                <Row label='films' value={planet.films}/>
                <Row label='Created' value={planet.created}/>
                <Row label='Edited' value={planet.edited}/>
                <Row label='URL' value={planet.url}/>
            </ScrollView>
            
        )
    }
}

const style = StyleSheet.create({
    innerContainer: {
        flex: 1, 
        flexDirection: "row",
    },
    rowItem: {
        flex: 1,
        padding:10
    }
})