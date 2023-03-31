import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://oranges-and-dashboards.onrender.com',
    // baseUrl: 'http://localhost:5000', during development
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWrapper = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)

    // If you want, handle other status codes, too
    if (result?.error?.status === 403) {

        // send refresh token to get new access token 
        const refreshToken = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshToken?.data) {

            // store the new token 
            api.dispatch(setCredentials({ ...refreshToken.data }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshToken?.error?.status === 403) {
                refreshToken.error.data.message = "login expired"
            }
            return refreshToken
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWrapper,
    tagTypes: ['User', 'Dashboard', 'Plan'],
    endpoints: builder => ({})
    
})