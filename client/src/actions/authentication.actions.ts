import { post, handleError } from 'api/api';
import {
    AUTHENTICATION_FAILED,
    AUTHENTICATION_SUCCEED,
    GET_CURRENT_USERNAME,
    LOGOUT
} from './action-types';
// import {API_URL} from 'config';
import {setAuthData} from 'api/api';

const removeUserData = () =>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
};


export const logout = (dispatch: Function) => {
    removeUserData();
    dispatch({type: LOGOUT});
};

export const login = (dispatch: Function, data: any) => {
    const {username, password, customErrorHandlers} = data;

    removeUserData()

    return post(`http://localhost:44358/api/authentication/token`, {password, username})
        .then((response) => {
            setAuthData(response);
            dispatch({type: AUTHENTICATION_SUCCEED, data: {username, ...response}});
        })
        .catch((error) => {
            dispatch({type: AUTHENTICATION_FAILED});
            handleError(error, customErrorHandlers)
        });
};

export const loadCurrentUsername = (dispatch: Function) => {
    const username = localStorage.getItem('username');
    dispatch({type: GET_CURRENT_USERNAME, username});
};
