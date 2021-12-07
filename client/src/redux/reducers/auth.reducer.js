const  isAuthenticated = !!localStorage.getItem("accessToken");
const initialState = {
  loading: false,
  isAuthenticated,
  accessToken: localStorage.getItem("accessToken"),
  user: {},
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        default:
            return state
    }
};

export default authReducer;