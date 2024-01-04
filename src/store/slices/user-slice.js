import { createSlice } from "@reduxjs/toolkit";
import stateStatus from "../../helper/state-status";
import { apiEndpoints } from "./../../config/api-config";
const INITIALSTATE = {
  status: stateStatus.IDLE,
  user: null,
  isAuthenticated: false,
  error: null,
};
const slice = createSlice({
  name: "user",
  initialState: INITIALSTATE,
  reducers: {
    setUserState(state, action) {
      return { ...state, ...action.payload };
    },
  },
});
export const { setUserState } = slice.actions;
export default slice.reducer;
export const loginThunk = (data) => {
  return async function (dispatch) {
    dispatch(setUserState({ ...INITIALSTATE, status: stateStatus.LOADING }));
    try {
      const response = await fetch(apiEndpoints.userAuthEndpoints.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw result;
      localStorage.setItem("token", result.data.token);
      console.log(result);
      dispatch(
        setUserState({
          status: stateStatus.IDLE,
          user: result.data.user,
          isAuthenticated: true,
        })
      );
    } catch (err) {
      dispatch(
        setUserState({
          ...INITIALSTATE,
          status: stateStatus.ERROR,
          error: err.message,
        })
      );
    }
  };
};

export const loginByTokenThunk = (token) => {
  return async function (dispatch) {
    dispatch(setUserState({ ...INITIALSTATE, status: stateStatus.LOADING }));
    try {
      const response = await fetch(
        apiEndpoints.userAuthEndpoints.GETMYPROFILE,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) throw result;
      dispatch(
        setUserState({
          status: stateStatus.IDLE,
          user: result.user,
          isAuthenticated: true,
        })
      );
    } catch (err) {
      dispatch(
        setUserState({
          ...INITIALSTATE,
          status: stateStatus.ERROR,
          error: err.message,
        })
      );
    }
  };
};
