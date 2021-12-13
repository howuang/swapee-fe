import * as types from "../constants/offer.constants";
import api from "../api";
import { toast } from "react-toastify";

const getAllOffers = () => async (dispatch) => {
    dispatch({ type: types.GET_ALL_OFFERS_REQUEST, payload: null });
    try {
        const res = await api.get('/offers');
        dispatch({ type: types.GET_ALL_OFFERS_SUCCESS, payload: res.data.data.offers})
    } catch (error) {
        dispatch({ type: types.GET_ALL_OFFERS_FAILURE, payload: error });
    }
}


export const offerActions = {
    getAllOffers
};