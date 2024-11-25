import { adminLoggedIn, setLoading } from "../../../auth/authSlice";
import { globalApi } from "../../globalApi";
import { adminLogin, AdminSignup } from "./types";

export const adminEndpoint = globalApi.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation<any, adminLogin>({
            query: (data) => ({
                url: '/api/admins/admin-login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Admins'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        admin: response.data.data.admin
                    }));

                    // updating redux store
                    dispatch(adminLoggedIn({
                        token: response.data.data.token,
                        admin: response.data.data.admin
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),

        adminSignup: builder.mutation<any, AdminSignup>({
            query: (data) => ({
                url: '/api/admins/admin-signup',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Admins'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        admin: response.data.data.admin
                    }));

                    // updating redux store
                    dispatch(adminLoggedIn({
                        token: response.data.data.token,
                        admin: response.data.data.admin
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),
    })
})

export const {
    useAdminLoginMutation,
    useAdminSignupMutation
} = adminEndpoint;
