import * as types from "../constants/item.constants";
import api from "../api";

const createItem = ({name, description, condition, imageUrl}) => async (dispatch) => {
    dispatch({ type: types.CREATE_ITEM_REQUEST, payload: null });
    try {
        const res = await api.post("/items", { name, description, condition, imageUrl });
        dispatch({ type: types.CREATE_ITEM_SUCCESS, payload: res.data.data })
    } catch (error) {
        dispatch({ type: types.CREATE_ITEM_FAILURE, payload: error })
    }
};

const getAllItems = (pageNum = 1, limit = 10, query = null, ownerId = null, sortBy = null) => async (dispatch) => {
    dispatch({ type: types.GET_ALL_ITEMS_REQUEST, payload: null });
    try {
        let queryString = "";
        if (query) {
            queryString = `&name[$regex]=${query}&name[$options]=i`;
        }

        if (ownerId) {
            console.log("owner id", ownerId);
            queryString = `${queryString}&owner=${ownerId}`;
        }

        let sortByString = "";
        if (sortBy?.key) {
            sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
        }
        const res = await api.get("/items?page=${pageNum}&limit=${limit}${queryString}${sortByString}");
        dispatch({ type: types.GET_ALL_ITEMS_SUCCESS, payload: res.data.data.items })
    } catch (error) {
        dispatch({ type: types.GET_ALL_ITEMS_FAILURE, payload: error });
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

export const itemActions = {
    createItem,
    getAllItems,
    getSingleItem
}