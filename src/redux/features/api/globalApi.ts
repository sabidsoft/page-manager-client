import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { BASE_URL } from '../../../utils/baseUrl';

export const globalApi = createApi({
    reducerPath: 'pageManagementApi',
    tagTypes: ['Admins', 'admin', 'FacebookPages', 'FacebookPage', 'FacebookPagePosts', 'FacebookPagePost', 'FacebookPageAbout', 'FacebookPageInsights', 'FacebookPagePostInsights'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: async (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({})
})

