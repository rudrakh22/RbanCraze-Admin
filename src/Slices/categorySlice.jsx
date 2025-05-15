import {createSlice} from "@reduxjs/toolkit";

const storedCategories = localStorage.getItem('categories');
const initialState = {
    categories:storedCategories?JSON.parse(storedCategories):[],
    completeCategory: null,
    editCategory: false,
};

const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        setCategories(state,action){
            state.categories=action.payload;
        },
        setEditCategory(state,action){
            state.editCategory=action.payload
        },
        setCompleteCategory(state,action){
            state.completeCategory=action.payload
        }
    }
})

export const {setCategories,setEditCategory,setCompleteCategory}=categorySlice.actions;
export default categorySlice.reducer;