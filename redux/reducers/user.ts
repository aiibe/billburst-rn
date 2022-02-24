import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/transactions";

interface ICurrentUser {
  currentUser: IUser | null;
  isSignedIn: boolean;
}

const initialState: ICurrentUser = {
  currentUser: {
    email: "souksavanh.sy@gmail.com",
    id: "e5755cf4-0efb-493d-8828-06be5947951d",
    username: "souksavanh",
  },
  isSignedIn: false,
};

export const userSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<IUser>) => ({
      isSignedIn: true,
      currentUser: action.payload,
    }),
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
