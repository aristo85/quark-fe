import {
  LoginResponse,
  LoginRequest,
  ResetPassResponse,
  RessetPassRequest,
} from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login/request",
  async (loginData, thunkApi) => {
    try {
      const response = await fetch(
        `https://quark-fe.free.beeceptor.com/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      if (!response.ok) {
        return thunkApi.rejectWithValue("something went wrong");
      }
      const resData = await response.json();
      return resData as LoginResponse;
    } catch (error: any) {
      console.log(error);
      let message = error?.message;
      return thunkApi.rejectWithValue(message ?? "something went wrong");
    }
  }
);

export const resetPassword = createAsyncThunk<
  ResetPassResponse,
  RessetPassRequest
>("auth/resset/request", async (loginData, thunkApi) => {
  try {
    const response = await fetch(`https://quark-fe.free.beeceptor.com/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (!response.ok) {
      return thunkApi.rejectWithValue("something went wrong");
    }
    const resData = await response.json();
    return resData as ResetPassResponse;
  } catch (error: any) {
    console.log(error);
    let message = error?.message;
    return thunkApi.rejectWithValue(message ?? "something went wrong");
  }
});
