import {createSlice} from '@reduxjs/toolkit'

const initialState={
    user:null,
    isAuthenticated:false
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
         userLoggedId:(state,action)=>{
            state.user=action.payload;
            state.isAuthenticated=true
         },
         userLoggedOut:(state)=>{
            state.user=null;
            state.isAuthenticated=false
         }
    },
});
export const {userLoggedId,userLoggedOut}=authSlice.actions;
export default authSlice.reducer;