import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice';
import categoryReducer from "../Slices/categorySlice";
import productReducer from "../Slices/productSlice"

const rootReducer=combineReducers({
    auth:authReducer,
    category:categoryReducer,
    product:productReducer,
})

export default rootReducer;