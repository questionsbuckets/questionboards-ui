"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Media {
  isProfilePic: any;
  id?: string;
  url?: string;
  type?: string;
}

interface UserProfile {
  expiryDate?: Date | null;
  id?: string;
  nickName?: string;
  discription?: string;
  accesCode?: string;
  media?: Media[];
  expiry?: string;
}

const initialState: UserProfile = {
  id: "",
  nickName: "",
  discription: "",
  accesCode: "",
  media: [],
  expiry: "",
  expiryDate: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setMyProfile(state, action: PayloadAction<UserProfile>) {
      return action.payload;
    },
  },
});

export const { setMyProfile } = profileSlice.actions;
export default profileSlice.reducer;
