import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    news: [],
}

export const NewsSlice = createSlice({
    name:"news",
    initialState,
    reducers:{
        AddNews:(state, action)=>{
            state.news = action.payload;
        },
        EmptyNews:(state)=>{
            state.news = []
        }
    }
})

export const {AddNews, EmptyNews} = NewsSlice.actions
export const SelectNewsByCateId =(state, cateid) => state.news.news.filter(i=>i.cateID.includes(cateid));
export const Selec5tNewsByCateId =(state, cateid) => state.news.news.filter(i=>i.cateID.includes(cateid));
export const getAllNews = state => state.news
export default NewsSlice.reducer
