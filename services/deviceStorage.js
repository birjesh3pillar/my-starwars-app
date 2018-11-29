import { AsyncStorage } from 'react-native';

const deviceStorage = {
    async saveItem(key,value){
        try{
            await AsyncStorage.setItem(key,value);
        } catch (error) {
            console.log('AsyncStorage saveitem error'+ error);
        }
    },
    async getItem(key){
        try{
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.log('AsyncStorage getItem error'+ error);
        }
    },
    async removeItem(key){
        try{
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log('AsyncStorage removeitem error'+ error);
        }
    }
}

export default deviceStorage;