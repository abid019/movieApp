import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name:"home",
    initialState:{
        url:{},
        genres:{}
    },
    reducers:{
        getApiConfiguration:(state,action)=>{
            state.url = action.payload;
        },
        getgenres:(state,action)=>{
            state.genres=action.payload;
        }
    }
})
export const {getApiConfiguration,getgenres} = homeSlice.actions;
export default homeSlice.reducer