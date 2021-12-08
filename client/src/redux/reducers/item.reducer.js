import * as types from "../constants/item.constants"

const initialState = {
    loading: false,
    items: [],
}

const itemReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        default:
            return state
    }
}

export default itemReducer;