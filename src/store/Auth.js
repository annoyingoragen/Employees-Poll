import { createSlice } from '@reduxjs/toolkit';


const authSlice=createSlice({
    name:'auth',
    initialState:{isAuthenticated:false,loggedUser:null,avatarURL:null,id:null},
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            state.loggedUser=action.payload.name;
            state.avatarURL=action.payload.avatarURL;
            state.id=action.payload.id;           

        },
        logout(state)
        {
            state.isAuthenticated=false;
            state.loggedUser=null;
            state.avatarURL=null;
            state.id=null;   
        }

    }

});

export const authActions=authSlice.actions;
export default authSlice;