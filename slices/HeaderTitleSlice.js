import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: "Trang chủ",
}

export const HeaderTitleSlice = createSlice({
    name: 'title',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
    },
})

export const { setTitle} = HeaderTitleSlice.actions;
export const getTitle = state=>state.title.title;
export default HeaderTitleSlice.reducer;
