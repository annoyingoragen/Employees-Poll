import { createSlice } from '@reduxjs/toolkit';


const questionsSlice=createSlice({
    name:'questions',
    initialState:{questions:null,answered:null,unAnswered:null},
    reducers:{
        getquestions(state,action){
            state.questions=action.payload.questions;  
            state.answered=action.payload.answered;
            state.unAnswered=action.payload.unAnswered;  
            // console.log(state.answered)       

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

export const questionsActions=questionsSlice.actions;
export default questionsSlice;