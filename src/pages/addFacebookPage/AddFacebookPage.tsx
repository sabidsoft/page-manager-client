import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Sidebar from '../../components/sidebar/Sidebar';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { useFacebookPageLoginMutation } from '../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint';

export default function AddFacebookPage() {
    useTitle('Add Facebook Page');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [facebookPageLogin, { data, error, isLoading }] = useFacebookPageLoginMutation();


    const responseCallback = (response: any) => {
        setErrorMessage('');

        if (response && response.accessToken) {
            facebookPageLogin({ userAccessToken: response.accessToken || '' });
        } else {
            setErrorMessage("Facebook page add request has been cancelled!");
        }
    };

    useEffect(() => {
        if (data) {
            navigate('/');
            toast.success('Facebook page added successfully!', { position: 'bottom-right', autoClose: 5000 });
        }

        if (error) {
            if ("status" in error) {
                const errMsgJSONString = 'error' in error ? error.error : JSON.stringify(error.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message);
            }
        }

    }, [data, error, navigate,]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar activeMenu='Add Facebook Page' />

            {/* Main Content */}
            <main className="w-[75%] p-6 overflow-y-auto">
                <h2 className='font-medium text-2xl text-center'>Add Facebook Page</h2>

                <div className='h-[95%] flex justify-center items-center flex-col'>
                    {
                        isLoading ?
                            <Loader /> :
                            <FacebookLogin
                                appId='410611048778188'
                                autoLoad={false}
                                fields="name,email,picture"
                                scope='email,public_profile,pages_show_list,pages_read_engagement,pages_read_user_content,pages_manage_posts,pages_manage_metadata,read_insights'
                                callback={responseCallback}
                                render={(renderProps: any) => (
                                    <button
                                        onClick={renderProps.onClick}
                                        className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="white">
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.437 9.878v-6.987h-2.54v-2.737h2.54V9.797c0-2.507 1.493-3.89 3.777-3.89 1.095 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.872h2.773l-.444 2.737h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                                        </svg>
                                        Add Facebook Page
                                    </button>
                                )}
                            />

                    }

                    {/* Error message */}
                    {errorMessage && <p className='text-red-500 text-center mt-4'>{errorMessage}</p>}
                </div>
            </main>
        </div>
    );
}
