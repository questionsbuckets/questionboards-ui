"use client";

import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import profileReducer from "@/store/slices/user-slice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

// useDispatch with types
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// RootState type
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = (
  selector,
  equalityFn
) => {
  return useSelector(selector, equalityFn);
};

// AppThunk type for thunk actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
