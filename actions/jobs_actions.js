import * as ActionTypes from './ActionTypes';
import JOB_DATA from './indeed_job_data';
import qs from 'qs';

const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript',
};

const buildUrl = (zip) => {
    const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip});
    return `${SEARCH_ROOT_URL}?${query}`;
};

export const searchJobs = (region, callback) => async (dispatch) => {
    try {
        // let zip = await reverseGeocode(region);
        // let zip = 9200;
        // const url = buildUrl(zip);
        // let {data} = await axios.get(url);
        dispatch({type: ActionTypes.FETCH_JOBS, payload: JOB_DATA});
        callback();
    } catch (err) {
        console.log('Error fetching zip code', err);
    }
};

export const likedJob = (job) => {
    return {
        type: ActionTypes.LIKED_JOB,
        payload: job,
    }
};

export function clearLikedJobs() {
    return {
        type: ActionTypes.CLEAR_LIKED_JOBS,
        payload: null,
    }
}


