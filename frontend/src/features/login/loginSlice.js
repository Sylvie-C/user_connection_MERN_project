import { createSlice } from "@reduxjs/toolkit" ; 


const initialState = { isAuthenticated: null , username: "" , email: "" , token: "" };

// reducers
const loginSlice = createSlice ( {
	name: 'auth' , 
  initialState , 
	reducers: {
    setAuth: (state) => { state.isAuthenticated = true } ,
    setUsername: (state , action) => { state.username = action.payload.storeUsername } , 
    setUserEmail: (state , action) => { state.email = action.payload.storeEmail } ,
    setToken: (state , action) => { state.token = action.payload.storeToken }
  }, 
} );

// export reducers functions
export const { setAuth, setUsername , setUserEmail , setToken } = loginSlice.actions ; 

// export reducers
export default loginSlice.reducer ; 