import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface PageState {
  page: number;
  per_page: number;
}

const initialState: PageState = {
  page: 1,
  per_page: 15,
};

export const PageSlice = createSlice({
  name: "PageSlice",
  initialState,
  reducers: {
    incrementPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    incrementPerPage: (state, action: PayloadAction<number>) => {
      state.per_page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementPage, incrementPerPage } = PageSlice.actions;

export default PageSlice.reducer;
