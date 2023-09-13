import { configureStore  } from '@reduxjs/toolkit'
import HeaderTitleSlice from "../slices/HeaderTitleSlice.js"
import CategoriesSlice from "../slices/CategorySlice";
import NewsSlice from "../slices/NewsSlice";
import SelectedCategorySlice from "../slices/SelectedCategorySlice";
export const store = configureStore({
    reducer: {
        title : HeaderTitleSlice,
        category: CategoriesSlice,
        news: NewsSlice,
        SelectedCategory: SelectedCategorySlice
    },
})
