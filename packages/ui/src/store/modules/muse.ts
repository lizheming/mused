import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  muses: Muse[];
  tags: string[];
  isFetching: boolean;
}

const museSlice = createSlice({
  name: "muse",
  initialState: {
    muses: [],
    tags: [],
    // isFetching flag should starts with true.
    isFetching: true,
  } as State,
  reducers: {
    setmuses: (state, action: PayloadAction<Muse[]>) => {
      return {
        ...state,
        muses: action.payload,
      };
    },
    createmuse: (state, action: PayloadAction<Muse>) => {
      return {
        ...state,
        muses: state.muses.concat(action.payload),
      };
    },
    patchmuse: (state, action: PayloadAction<Partial<Muse>>) => {
      return {
        ...state,
        muses: state.muses
          .map((muse) => {
            if (muse.id === action.payload.id) {
              return {
                ...muse,
                ...action.payload,
              };
            } else {
              return muse;
            }
          })
          .filter((muse) => muse.rowStatus === "NORMAL"),
      };
    },
    deletemuse: (state, action: PayloadAction<MuseId>) => {
      return {
        ...state,
        muses: state.muses.filter((muse) => {
          return muse.id !== action.payload;
        }),
      };
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        tags: action.payload,
      };
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isFetching: action.payload,
      };
    },
  },
});

export const { setmuses, createmuse, patchmuse, deletemuse, setTags, setIsFetching } = museSlice.actions;

export default museSlice.reducer;
