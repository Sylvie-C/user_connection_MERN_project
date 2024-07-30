import { configureStore , combineReducers } from "@reduxjs/toolkit" ; 

import { signupAPI } from "./features/signup/signupAPI" ; 
import { loginAPI } from "./features/login/loginAPI" ; 
import loginReducers from "./features/login/loginSlice" ; 

let state = {} ; 

export const store = configureStore(
	{
		preloadedState: state , 
		reducer: combineReducers ({ 

			[signupAPI.reducerPath]: signupAPI.reducer, 
			[ loginAPI.reducerPath ]: loginAPI.reducer, 
      login: loginReducers, 

    }) ,
		middleware: (getDefaultMiddleware) => 
			getDefaultMiddleware()
				.concat(signupAPI.middleware)
				.concat(loginAPI.middleware),
	}
);

