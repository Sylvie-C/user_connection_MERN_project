import { configureStore, combineReducers } from '@reduxjs/toolkit';

import loginReducers from './features/login/loginSlice';

import { signupAPI } from './features/signup/signupAPI';
import { loginAPI } from './features/login/loginAPI';
import { updateUserAPI } from './features/updateUser/updateUserAPI';

let state = {};

export const store = configureStore({
  preloadedState: state,
  reducer: combineReducers({
    login: loginReducers,
    [signupAPI.reducerPath]: signupAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [updateUserAPI.reducerPath]: updateUserAPI.reducer, // Assurez-vous que c'est "userApi"
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(signupAPI.middleware)
      .concat(loginAPI.middleware)
      .concat(updateUserAPI.middleware),
});
