import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  completed: boolean | undefined;
}

const initialState: FilterState = {
  completed: undefined,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<boolean | undefined>) => {
      state.completed = action.payload;
    },
    resetFilter: (state) => {
      state.completed = undefined;
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
