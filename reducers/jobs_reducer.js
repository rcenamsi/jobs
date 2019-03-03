import * as ActionType from '../actions/ActionTypes';

const INITIAL_STATE = {
    results: []
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case ActionType.FETCH_JOBS:
            return {results: [...action.payload.results]};
        default:
            return state;
    }
}
