import * as types from '../constants/offer.constants'

const initialState = {
    loading: false,
    offers: []
}

const offerReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_ALL_OFFERS_REQUEST:
        case types.UPDATE_OFFER_REQUEST:
            return { ...state, loading: true };
        case types.GET_ALL_OFFERS_SUCCESS:
        case types.UPDATE_OFFER_SUCCESS:
            return { ...state, loading: false, offers: payload };
        case types.GET_ALL_OFFERS_FAILURE:
        case types.UPDATE_OFFER_FAILURE:
            return { ...state, loading: false };
        default:
            return state
    }
};

export default offerReducer;