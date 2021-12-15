import * as types from "../constants/user.constants";


const initialState = {
    users: [],
    otherUser: {},
    loading: false
}

const usersReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_SINGLE_USERS_REQUEST:
        case types.UPGRADE_MEMBERSHIP_REQUEST:
            return { ...state, loading: true };
        case types.GET_SINGLE_USERS_SUCCESS:
            return { ...state, loading: false, otherUser: payload };
        case types.GET_SINGLE_USERS_FAILURE:
        case types.UPGRADE_MEMBERSHIP_SUCCESS:
        case types.UPGRADE_MEMBERSHIP_FAILURE:
            return { ...state, loading: false };
        default:
            return state
    }
};

export default usersReducer;