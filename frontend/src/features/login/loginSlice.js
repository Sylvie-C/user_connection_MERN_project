import { createSlice } from "@reduxjs/toolkit" ; 


const initialState = { isAuthenticated: null , username: "" };


// reducers
const loginSlice = createSlice ( {
	name: 'auth' , 
  initialState , 
	reducers: {
    setAuth: (state) => { state.isAuthenticated = true } ,
    setUsername: (state , action) => { state.username = action.payload.user_name }
  }, 
} );

// export reducers functions
export const { setAuth, setLogout , setUsername } = loginSlice.actions ; 

// export reducers
export default loginSlice.reducer ; 