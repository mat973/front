import {
    LOGIN,
    REGISTER,
    LOGOUT,
    REDIRECT,
    APP_LOAD, VALIDATION_ERROR
} from '../constants/actionTypes';

const defaultState = {
    appName: 'Lab4-Web',
    token: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.username || null,
            };
        case REDIRECT:
            return { ...state, redirect: null };
        case REGISTER:
            return {
                ...state,
                redirect: action.error ? '/register' : '/login',
            };
        case LOGOUT:
            return { appName: state.appName };
        case LOGIN:
            return {
                ...state,
                redirect: action.error ? null : '/',
                currentUser: action.error ? null : action.username
            };
        case VALIDATION_ERROR:
            return {
                ...state,
                errors: action.error,
            };
        default:
            return state;
    }
};
