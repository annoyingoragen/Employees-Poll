import { createSlice } from '@reduxjs/toolkit';


const usersSlice=createSlice({
    name:'users',
    initialState:{users:null},
    reducers:{
        getusers(state,action){
            state.users=action.payload.users;
            // console.log(state.users);  
               

        },
        // logout(state)
        // {
        //     state.isAuthenticated=false;
        //     state.loggedUser=null;
        //     state.avatarURL=null;
        //     state.id=null;   
        // }

    }

});

export const usersActions=usersSlice.actions;
export default usersSlice;