import React, {Component} from 'react';
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './store';
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SettingsScreen from "./screens/SettingsScreen";
import {Icon} from 'react-native-elements';
import requestPushNotifications from './services/push_notification';
import {Notifications} from 'expo';
import {Alert} from 'react-native';

const reviewStack = createStackNavigator({
            review: ReviewScreen,
            settings: SettingsScreen,
        });

reviewStack.navigationOptions = {
    title: 'Review',
    tabBarIcon: ({tintColor}) => {
        return <Icon name={'favorite'} size={30} color={tintColor}/>
    }
};

const mainTabNavigator = createBottomTabNavigator({
        map: MapScreen,
        deck: DeckScreen,
        review: reviewStack
    });


mainTabNavigator.navigationOptions = {
    tabBarVisible: false,
    labelStyle: {fontSize: 12},
};

const TabNavigator = createBottomTabNavigator({
    welcome: WelcomeScreen,
    auth: AuthScreen,
    main: mainTabNavigator,
});

const AppContainer = createAppContainer(TabNavigator);

class App extends Component{

    componentDidMount() {
        requestPushNotifications();

        Notifications.addListener((notification) => {
            const {data: {text}, origin} = notification;
            if (origin === 'received' && text){
                Alert.alert(
                    'New Push Notification Received',
                    text,
                    [{text: 'Ok'}]
                )
            }
        })
    }

    render() {
        return (
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        )
    }
}

export default App;
