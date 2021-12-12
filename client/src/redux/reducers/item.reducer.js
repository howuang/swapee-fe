import * as types from "../constants/item.constants"

const initialState = {
    loading: false,
    items: [],
    singleItem: {},
    ownItems:[]
}

const itemReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_ALL_ITEMS_REQUEST:
        case types.GET_SINGLE_ITEM_REQUEST:
        case types.UPDATE_ITEM_REQUEST:
        case types.GET_OWN_ITEMS_REQUEST:
            return { ...state, loading: true };
        case types.GET_ALL_ITEMS_SUCCESS:
            return { ...state, loading: false, items: payload };
        case types.GET_SINGLE_ITEM_SUCCESS:
        case types.UPDATE_ITEM_SUCCESS:
            return { ...state, loading: false, singleItem: payload };
        case types.GET_OWN_ITEMS_SUCCESS:
            return { ...state, loading: false, ownItems: payload }
        case types.GET_ALL_ITEMS_FAILURE:
        case types.GET_SINGLE_ITEM_FAILURE:
        case types.UPDATE_ITEM_FAILURE:
        case types.GET_OWN_ITEMS_FAILURE:
            return { ...state, loading: false };
        default:
            return state
    }
};

export default itemReducer;