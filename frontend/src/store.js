import { configureStore , combineReducers } from "@reduxjs/toolkit" ; 

import loginReducers from "./features/login/loginSlice" ; 

import { signupAPI } from "./features/signup/signupAPI" ; 
import { loginAPI } from "./features/login/loginAPI" ; 


let state = {} ; 

// store
export const store = configureStore(
	{
		preloadedState: state , 
		reducer: combineReducers ({ 

			// Redux reducers
			login: loginReducers, 

			// Query RTK (database)
			[ signupAPI.reducerPath ]: signupAPI.reducer, 
			[ loginAPI.reducerPath ]: loginAPI.reducer, 
    }) ,
		middleware: (getDefaultMiddleware) => 
			getDefaultMiddleware()
				.concat(signupAPI.middleware)
				.concat(loginAPI.middleware),

	}
);

