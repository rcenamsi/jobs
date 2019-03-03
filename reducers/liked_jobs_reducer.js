import * as ActionTypes from '../actions/ActionTypes';
import _ from 'lodash';
import {REHYDRATE} from 'redux-persist/constants';

const INIT_STATE = [];

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case REHYDRATE:
            return action.payload.likedJobs || [];
        case ActionTypes.LIKED_JOB:
            return _.uniqBy([action.payload, ...state], 'jobkey');
        case ActionTypes.CLEAR_LIKED_JOBS:
            return [];
        default:
            return state;
    }
}
