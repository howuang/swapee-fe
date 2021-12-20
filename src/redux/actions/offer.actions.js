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

const updateOffers = (offerId, { ...status }) => async (dispatch) => {
    dispatch({ type: types.UPDATE_OFFER_REQUEST, payload: null });
    try {
        const res = await api.put(`/offers/${offerId}`, {...status});
        dispatch({ type: types.UPDATE_OFFER_SUCCESS, payload: res.data.data.offers })
        toast.success('Thank you for your response!')
    } catch (error) {
        dispatch({ type: types.UPDATE_OFFER_FAILURE, payload: error });
    }
}

const cancelOfferRequest = (offerId) => async (dispatch) => {
    dispatch({ type: types.CANCEL_OFFER_REQUEST, payload: null });
    try {
        const res = await api.delete(`/offers/${offerId}`);
        toast.success('Successfully cancel swap request');
        dispatch(offerActions.getAllOffers());
    } catch (error) {
        dispatch({ type: types.CANCEL_OFFER_FAILURE, payload: error})
    }
}

export const offerActions = {
    getAllOffers,
    updateOffers,
    cancelOfferRequest
};