import { createSlice } from "@reduxjs/toolkit";
import { resetPassword, userLogin } from "./authThunks";
import {
  getUserToken,
  resetUserToken,
  setUserToken,
} from "./services/localStorage";

export interface AuthState {
  userToken: string | null;
  status: "idle" | "loading" | "failed";
  error: any;
}

// initialize userToken from local storage
const userTokenInit = getUserToken();

const initialState: AuthState = {
  userToken: userTokenInit,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (state) => {
      resetUserToken();
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.userToken = action.payload.token;
        setUserToken(action.payload.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setLogout } = authSlice.actions;

export default authSlice.reducer;
