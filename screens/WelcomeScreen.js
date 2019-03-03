import _ from 'lodash';
import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native';
import Slides from "../components/Slides";
import {AppLoading} from 'expo';
import {FB_TOKEN} from "../reducers/auth_reducer";

const DATA = [
    {text: 'This app will help you find jobs', color: '#03A9F4'},
    {text: 'Just set your location and then swipe away', color: '#009688'}
];

class WelcomeScreen extends Component {
    static navigationOptions = {
        tabBarVisible: false
    };

    state = {
        [FB_TOKEN]: null,
    };

    proceed = () => {
        this.props.navigation.navigate('auth');
    };

    async componentWillMount() {
        let fbToken = await AsyncStorage.getItem(FB_TOKEN);
        if (fbToken) {
            this.setState({[FB_TOKEN]: fbToken});
            this.props.navigation.navigate('map');
        } else {
            this.setState({[FB_TOKEN]: false});
        }
    }

    render() {
        console.log('fb_token:', this.state[FB_TOKEN]);
        if (_.isNull(this.state[FB_TOKEN])) {
            return <AppLoading/>
        }
        if (!this.state[FB_TOKEN]) {
            return (
                <View style={{flex: 1}}>
                    <Slides data={DATA} proceed={this.proceed}/>
                </View>
            )
        }

        return <View/>;
    }
}

export default WelcomeScreen;
