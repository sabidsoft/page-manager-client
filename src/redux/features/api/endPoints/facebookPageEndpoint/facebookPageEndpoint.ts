import { globalApi } from "../../globalApi";
import { FacebookPageLogin } from "./types";

export const facebookPageEndpoint = globalApi.injectEndpoints({
    endpoints: (builder) => ({
        facebookPageLogin: builder.mutation<any, FacebookPageLogin>({
            query: (data) => ({
                url: '/api/facebook-pages/facebook-page-login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['FacebookPages'],
        }),

        getFacebookPages: builder.query<any, any>({
            query: () => ({
                url: `/api/facebook-pages`,
                method: "GET"
            }),
            keepUnusedDataFor: 60, // default 60 seconds
            providesTags: ['FacebookPages']
        }),

        getFacebookPage: builder.query<any, string>({
            query: (pageId) => ({
                url: `/api/facebook-pages/${pageId}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 60,
            providesTags: (result, error, arg) => [{ type: 'FacebookPage', id: arg }]
        }),

        getFacebookPagePosts: builder.query<any, string>({
            query: (pageId) => ({
                url: `/api/facebook-pages/${pageId}/posts`,
                method: 'GET'
            }),
            keepUnusedDataFor: 60,
            providesTags: (result, error, arg) => [{ type: 'FacebookPagePosts', id: arg }]
        }),

        getFacebookPageAbout: builder.query<any, string>({
            query: (pageId) => ({
                url: `/api/facebook-pages/${pageId}/about`,
                method: 'GET'
            }),
            keepUnusedDataFor: 60,
            providesTags: (result, error, arg) => [{ type: 'FacebookPageAbout', id: arg }]
        }),

        getFacebookPageInsights: builder.query<any, string>({
            query: (pageId) => ({
                url: `/api/facebook-pages/${pageId}/insights`,
                method: 'GET'
            }),
            keepUnusedDataFor: 60,
            providesTags: (result, error, arg) => [{ type: 'FacebookPageInsights', id: arg }]
        }),

        getFacebookPagePostInsights: builder.query<any, { pageId: string; postId: string }>({
            query: ({ pageId, postId }) => ({
                url: `/api/facebook-pages/${pageId}/posts/${postId}/insights`,
                method: 'GET'
            }),
            keepUnusedDataFor: 60,
            providesTags: (result, error, { pageId, postId }) => [{ type: 'FacebookPagePostInsights', id: `${pageId}-${postId}` },],
        }),

        postToFacebookPage: builder.mutation<any, any>({
            query: (data) => ({
                url: `/api/facebook-pages/create-page-post`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['FacebookPagePosts'],
        }),

        postToFacebookPages: builder.mutation<any, any>({
            query: (data) => ({
                url: '/api/facebook-pages/create-pages-post',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['FacebookPagePosts'],
        }),
    })
})

export const {
    useFacebookPageLoginMutation,
    useGetFacebookPagesQuery,
    useGetFacebookPageQuery,
    useGetFacebookPagePostsQuery,
    useGetFacebookPageAboutQuery,
    useGetFacebookPageInsightsQuery,
    useGetFacebookPagePostInsightsQuery,
    usePostToFacebookPageMutation,
    usePostToFacebookPagesMutation,
} = facebookPageEndpoint;
