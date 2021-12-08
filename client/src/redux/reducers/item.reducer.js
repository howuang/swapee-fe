import * as types from "../constants/item.constants"

const initialState = {
    loading: false,
    items: [],
}

const itemReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_ALL_ITEMS_REQUEST:
            return { ...state, loading: true };
        case types.GET_ALL_ITEMS_SUCCESS:
            return { ...state, loading: false, items: payload };
        case types.GET_ALL_ITEMS_FAILURE:
            return { ...state, loading: false };
        default:
            return state
    }
}

export default itemReducer;