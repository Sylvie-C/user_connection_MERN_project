import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const signupAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: '/api/user/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: userData,
      }),
    }),
  }),
});

export const { useSignupMutation } = signupAPI;
