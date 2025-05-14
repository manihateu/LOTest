import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  isAuth: boolean;
};

const initialState: UserState = {
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuth = true;
    },
    setUnAuth: (state) => {
      state.isAuth = false;
    },
  },
});

export const { setAuth, setUnAuth } = userSlice.actions;
