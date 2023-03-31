import { apiSlice } from './apiSlice'

export const plansApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPlansByDashboardId: builder.query({
            query: (userId) => `/plans/${userId}`,
            providesTags: ['Plan'],
        }),
        createPlan: builder.mutation({
            query: (body) => ({
                url: '/plans',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Plan'],
        }),
        updatePlan: builder.mutation({
            query: (body) => ({
                url: '/plans',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Plan'],
        }),
        deletePlan: builder.mutation({
            query: ({ id }) => ({
                url: '/plans',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Plan'],
        }),
    }),
})

export const {
    useGetPlansByDashboardIdQuery,
    useCreatePlanMutation,
    useUpdatePlanMutation,
    useDeletePlanMutation,
} = plansApiSlice