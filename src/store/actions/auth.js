import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : idToken,
        userId : userId
    }
};

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type : actionTypes.AUTH_LOGOUT
    }
};

export const authTimeout = (expirationTime) => {
      return dispatch => {
          setTimeout(() => {
              dispatch(logout());
          }, expirationTime * 1000);
      }
};

export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
};


export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_FB_KEY;
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_FB_KEY;
        }
        axios
            .post(url,
                authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(authTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });

    }
};

export const authCheckState = () => {

    return dispatch => {
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const userId = localStorage.getItem('userId');

        if(!token || expirationDate < new Date()) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token, userId));
            dispatch(authTimeout( (expirationDate.getTime() - new Date().getTime())/1000 ));
        }
    }

};