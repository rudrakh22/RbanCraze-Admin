import {createSlice} from "@reduxjs/toolkit";

const initialState={
    product:null,
    editProduct:false,
}

const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        setProduct(state,action){
            state.product=action.payload
        },
        setEditProduct(state,action){
            state.editProduct=action.payload
        },
        resetProductSection(state){
            state.product=null;
            state.editProduct=false;
        }
    }
})

export const {setProduct,setEditProduct,resetProductSection}=productSlice.actions;
export default productSlice.reducer;