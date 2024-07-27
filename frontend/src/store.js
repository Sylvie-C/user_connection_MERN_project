import { configureStore , combineReducers } from "@reduxjs/toolkit" ; 
import loginReducers from "./features/login/loginSlice" ; 

let state = {} ; 

// store
export const store = configureStore(
	{
		preloadedState: state , 
		reducer: combineReducers ({ 
      login: loginReducers, 
    }) ,
	}
);