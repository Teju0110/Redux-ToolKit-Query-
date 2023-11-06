import {createApi,fetchBaseQuery }from '@reduxjs/toolkit/query/react'
import { UserDetails} from '../../Interface/UserDetails'


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000',
                prepareHeaders:(headers)=>{
                    headers.set("Access-Control-Allow-Headers","*");
                }
        }),
        tagTypes:['Users'],
    endpoints: (builder) => ({
      getUsers: builder.query<UserDetails[], void>({
        query: () => '/users',
        providesTags:['Users']
      }),

      getUser: builder.query<UserDetails[], string>({
        query: (id) => `/users/${id}`,
        providesTags:['Users']
      }),

      addUser:builder.mutation<void, UserDetails>({
        query:(user)=>({
          url:"/users",
          method:"POST",
          body:user,
        }),
        invalidatesTags:['Users']
      }),

      updateUser:builder.mutation<void, UserDetails>({
        query:({id, ...rest})=>({
          url:`/users/${id}`,
          method:"PUT",
          body:rest,
        }),
        invalidatesTags:['Users']
      }),
      
      
      deleteUser:builder.mutation<void, number>({
        query:(id)=>({
          url:`/users/${id}`,
          method:"DELETE",
         
        }),
        invalidatesTags:['Users']
      })
    }),
    
  });

export const {useGetUsersQuery,useGetUserQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation}=userApi;