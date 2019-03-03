import * as ActionTypes from '../actions/ActionTypes';

export const FB_TOKEN = 'fbToken';

export default (state = {}, action) => {
    switch(action.type){
        case ActionTypes.FACEBOOK_LOGIN_SUCCESS:
            return {[FB_TOKEN]: action.payload};
        case ActionTypes.FACEBOOK_LOGIN_FAILED:
            return {[FB_TOKEN]: null};
        default:
            return state;
    }
};

