import axios from 'axios';

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('https://localhost:44318/api/users',userData);
    }
}