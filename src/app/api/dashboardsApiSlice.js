import { apiSlice } from './apiSlice'

export const dashboardsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardsByUserId: builder.query({
            query: (userId) => `/dashboards/${userId}`,
            providesTags: ['Dashboard'],
        }),
        createDashboard: builder.mutation({
            query: (body) => ({
                url: '/dashboards',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Dashboard'],
        }),
        deleteDashboard: builder.mutation({
            query: ({ id }) => ({
                url: '/dashboards',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Dashboard'],
        }),
    }),
})

export const {
    useGetDashboardsByUserIdQuery,
    useCreateDashboardMutation,
    useDeleteDashboardMutation,
} = dashboardsApiSlice