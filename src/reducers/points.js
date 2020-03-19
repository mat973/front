import {
    LOGOUT,
    POINT_ADDED, POINT_DELETE,
    POINTS_LOADED,
    POINTS_RECALCULATED,
    UPDATE_FIELD_POINT
} from '../constants/actionTypes';

export default (state = {xc: -4, rc: 1, yc: 0}, action) => {
    switch (action.type) {
        case UPDATE_FIELD_POINT:
            return { ...state, [action.key]: action.value };
        case POINT_ADDED:
            return {
                ...state,
                point: action.payload
            };
        case POINT_DELETE:
            return {
                ...state,
            };
        case LOGOUT:
            return { ...state, points: undefined};
        case POINTS_LOADED:
            return {
                ...state,
                points: action.payload,
            };
        case POINTS_RECALCULATED:
            return {
                ...state,
                points_r: action.payload,
                current_r: action.r
            };
        default:
            return state;
    }
};

