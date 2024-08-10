
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const updateUserAPI = createApi({
  reducerPath: 'userApi', 
  baseQuery: fetchBaseQuery({ baseUrl: `${backendUrl}/api/user` }), 
  tagTypes: ["User"] , 
  endpoints: (builder) => ({
    updateUsername: builder.mutation({
      query: (userData) => ({
        url: '/update/username',
        method: 'PATCH',
        headers: { "Authorization" : `Bearer ${userData.token}` },
        body: userData,
      }),
      invalidates: ['User'],
    }),
    updatePassword: builder.mutation({
      query: (userData) => ({
        url: "/update/password" , 
        method: "PATCH", 
        headers: { "Authorization" : `Bearer ${userData.token}` }, 
        body: userData, 
      })
    })
  }),
});

export const { useUpdateUsernameMutation , useUpdatePasswordMutation } = updateUserAPI;
