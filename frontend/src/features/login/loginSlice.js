import { createSlice } from "@reduxjs/toolkit" ; 

const initialState = { isAuthenticated: null, };

// reducers
const loginSlice = createSlice ({
	name: 'auth' , 
  initialState , 
	reducers: { 
    setAuth: (state) => { state.isAuthenticated = true } ,
    logout: (state) => { state.isAuthenticated = false } , 
  }
});

// export reducers functions
export const { setAuth, logout } = loginSlice.actions ; 

// export reducers
export default loginSlice.reducer ; 