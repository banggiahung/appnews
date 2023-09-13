import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    SelectedCategory: 0,
}

export const SelectedCategorySlice = createSlice({
    name: 'SelectedCategory',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.SelectedCategory = action.payload;
        },
    },
})

export const { setSelectedCategory} = SelectedCategorySlice.actions;
export const getSelectedCategory = state=>state.SelectedCategory.SelectedCategory;
export default SelectedCategorySlice.reducer;
