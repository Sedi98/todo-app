import { configureStore } from "@reduxjs/toolkit";
import  ListSliceReducer  from "./ListSlice";
import FilterSliceReducer from "./FilterSlice";



export const store = configureStore({
    reducer: {
        list: ListSliceReducer,
        filter: FilterSliceReducer
    },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch