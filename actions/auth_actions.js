import {AsyncStorage} from 'react-native';
import * as ActionTypes from '../actions/ActionTypes';
import {Facebook} from 'expo';
import {FB_TOKEN} from "../reducers/auth_reducer";

const doFacebookLogin = async dispatch => {
    let {type, token} = await Facebook.logInWithReadPermissionsAsync('2153606804893585', {
        permissions: ['public_profile'],
    });

    if (type === 'cancel') {
        dispatch({
            type: ActionTypes.FACEBOOK_LOGIN_FAILED,
        });
        return;
    }


    AsyncStorage.setItem(FB_TOKEN, token);

    dispatch({
        type: ActionTypes.FACEBOOK_LOGIN_SUCCESS,
        payload: token,
    });
};

export const facebookLogin = () => {
    return async (dispatch) => {
        try {
            let token = await AsyncStorage.getItem(FB_TOKEN);
            if (token) {
                dispatch({
                    type: ActionTypes.FACEBOOK_LOGIN_SUCCESS,
                    payload: token,
                })
            } else {
                //Initiate login process
                doFacebookLogin(dispatch)
            }
        } catch (error) {
            console.log(error);
        }
    };
};
