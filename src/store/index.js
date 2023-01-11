import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Auth';
import questionsSlice from './Questions';
import usersSlice from './Users';
const store=configureStore({
    reducer:{
        question:questionsSlice.reducer,
        auth:authSlice.reducer,
        user:usersSlice.reducer
        
    }
});



export default store;