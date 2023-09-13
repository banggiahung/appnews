import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: [],
}

export const CategoriesSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        AddCate: (state, action) => {
            state.categories = action.payload;
        },
        EmptyCate: (sate)=> {
            sate.categories = [];
        }
    },
})

export const { AddCate, EmptyCate} = CategoriesSlice.actions;
export const getCate = state=>state.category.categories;
export default CategoriesSlice.reducer;
