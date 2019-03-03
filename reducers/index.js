import {combineReducers} from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer'
import likedJobs from './liked_jobs_reducer';

export default combineReducers({
    auth,
    jobs,
    likedJobs,
});
