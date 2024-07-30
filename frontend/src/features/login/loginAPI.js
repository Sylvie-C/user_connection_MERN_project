import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const loginAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${backendUrl}/api` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginAPI;
