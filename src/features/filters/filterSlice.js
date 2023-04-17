import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "all",
  search: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default filtersSlice;
export const { changeStatus, changeSearch } = filtersSlice.actions;