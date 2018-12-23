import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    };
}

export function login(data) {
    return dispatch => {
        return axios.post('https://localhost:44318/api/account/login', data)
        .then(res => {
                console.log(res.data);
                console.log(jwt.decode(res.data));
            dispatch(setCurrentUser({id: 1, username: 'telesyk'}));
        });
    }
}