import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Query RTK login hook
export const loginAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${backendUrl}/api/user` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginAPI;
