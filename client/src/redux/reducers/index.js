import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import itemReducer from "./item.reducer";

export default combineReducers({
    auth: authReducer,
    items: itemReducer
});
