import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {facebookLogin} from '../actions';

class AuthScreen extends Component {
    static navigationOptions = {
        tabBarVisible: false,
    };

    componentWillMount() {
        this.props.facebookLogin();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.auth.fbToken) {
            this.props.navigation.navigate('map');
        }
    }

    render() {
        return (
            <View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, {facebookLogin})(AuthScreen);
