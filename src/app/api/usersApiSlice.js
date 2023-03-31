import { apiSlice } from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: '/users',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        editUser: builder.mutation({
            query: (body) => ({
                url: '/users',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useEditUserMutation,
    useDeleteUserMutation,
} = usersApiSlice