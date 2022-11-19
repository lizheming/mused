import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {} as User,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    patchUser: (state, action: PayloadAction<Partial<User>>) => {
      return {
        ...state,
        user: {
          ...state,
          ...action.payload,
        },
      };
    },
  },
});

export const { setUser, patchUser } = userSlice.actions;

export default userSlice.reducer;
