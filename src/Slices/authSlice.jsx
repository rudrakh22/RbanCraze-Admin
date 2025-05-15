import {createSlice} from '@reduxjs/toolkit';

const initialState={
    loading:false,
    token:localStorage.getItem('admintoken') ? localStorage.getItem('admintoken') :null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLoading(state,action){
            state.loading=action.payload;
        },
        setToken(state,action){
            state.token=action.payload;
        }
    }
})

export const {setSignUpData,setLoading,setToken}=authSlice.actions;
export default authSlice.reducer;