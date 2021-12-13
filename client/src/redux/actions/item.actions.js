import * as types from "../constants/item.constants";
import api from "../api";
import { toast } from "react-toastify";

const createItem = ({name, category, description, condition, imageUrl}, userId) => async (dispatch) => {
    dispatch({ type: types.CREATE_ITEM_REQUEST, payload: null });
    try {
        const res = await api.post("/items", { name, category, description, condition, imageUrl });
        dispatch({ type: types.CREATE_ITEM_SUCCESS, payload: res.data.data })
        toast.success(`You added 1 ${name}. Let's start exploring!`)
        dispatch(itemActions.getAllItems(null, 10, 1, userId, null));
    } catch (error) {
        dispatch({ type: types.CREATE_ITEM_FAILURE, payload: error })
    }
};

const getAllItems = (query = null, limit = 12, pageNum = 1, ownerId = null, sortBy = null, category=null) => async (dispatch) => {
    dispatch({ type: types.GET_ALL_ITEMS_REQUEST, payload: null });
    try {
        let queryString = "";
        if (query) {
            queryString = `&q=${query.query}`;
        }

        let categoryString = "";
        if (category) {
            categoryString = `&category=${category}`;
        }

        if (ownerId) {
            queryString = `${queryString}&owner=${ownerId}`;
        }

        let sortByString = "";
        if (sortBy?.key) {
            sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
        }
        const res = await api.get(`/items?page=${pageNum}&limit=${limit}${queryString}${categoryString}${sortByString}`);
        dispatch({ type: types.GET_ALL_ITEMS_SUCCESS, payload: res.data.data.items })
    } catch (error) {
        dispatch({ type: types.GET_ALL_ITEMS_FAILURE, payload: error });
    }
};

const getOwnItems = () => async (dispatch) => {
    dispatch({ type: types.GET_OWN_ITEMS_REQUEST, payload: null });
    try {
        const res = await api.get(`/items/own`);
        dispatch({ type: types.GET_OWN_ITEMS_SUCCESS, payload: res.data.data })
    } catch (error) {
        dispatch({ type: types.GET_OWN_ITEMS_FAILURE, payload: error });
    }
};

const getSingleItem = (itemId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_ITEM_REQUEST, payload: null });
  try {
      const res = await api.get(`/items/${itemId}`);
    dispatch({
      type: types.GET_SINGLE_ITEM_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_ITEM_FAILURE, payload: error });
  }
};

const updateItem = ({...updateInfo}, itemId) => async (dispatch) => {
  dispatch({ type: types.UPDATE_ITEM_REQUEST, payload: null });
  try {
    const res = await api.put(`/items/${itemId}`, {...updateInfo});
    dispatch({ type: types.UPDATE_ITEM_SUCCESS, payload: res.data.data });
    toast.success(`Item info has been updated.`);
    dispatch(itemActions.getSingleItem());
  } catch (error) {
    dispatch({ type: types.UPDATE_ITEM_FAILURE, payload: error });
  }
};

const createOffer = (offerInfo, itemId) => async (dispatch) => {
    console.log("offer info", offerInfo);
    dispatch({ type: types.CREATE_OFFER_REQUEST, payload: null });
    try {
        const res = await api.post(`/items/${itemId}`, offerInfo);
        dispatch({ type: types.CREATE_OFFER_SUCCESS, payload: res.data.data });
        toast.success(`Your offer request has been sent`);
    } catch (error) {
        dispatch({ type: types.CREATE_OFFER_FAILURE, payload: error })
    }
};

export const itemActions = {
    createItem,
    getAllItems,
    getOwnItems,
    getSingleItem,
    updateItem,
    createOffer
}