import { client, linkResolver } from '../prismic-configuration';

import { GET_PAGE } from './actionTypes';


// Takes state ref and gets valid postal codes
const getPage = async dispatch => {
    try {
        await client.getSingle('landingpage').then(res => {
            dispatch({
                type: GET_PAGE,
                payload: res
            });
        });
    } catch (e) {
        console.error('could not retrieve page');
    }
};

export {
    getPage,
};
