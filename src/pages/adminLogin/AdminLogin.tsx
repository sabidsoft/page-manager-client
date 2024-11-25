import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';
import useTitle from '../../hooks/useTitle';
import { useAdminLoginMutation } from '../../redux/features/api/endPoints/adminEndpoint/adminEndpoint';

export default function AdminLogin() {
    useTitle("Admin Login");
    const navigate = useNavigate();
    const location = useLocation();

    const [adminLogin, { data: adminLoginData, error: adminLoginError, isLoading: adminLoginIsLoading }] = useAdminLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        adminLogin({ email, password })
    };

    useEffect(() => {

        if (adminLoginData) {
            navigate('/', { replace: true });
        }

        if (adminLoginError) {
            if ("status" in adminLoginError) {
                const errMsgJSONString = 'error' in adminLoginError ? adminLoginError.error : JSON.stringify(adminLoginError.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [adminLoginData, adminLoginError, navigate, location.state?.from?.pathname]);

    if (adminLoginIsLoading) {
        return <Loader />;
    }

    return (
        <div className='h-screen flex justify-center items-center bg-white'>
            <div className='w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-lg'>
                <h2 className='text-center text-2xl font-bold mb-6'>Admin Login</h2>

                <form onSubmit={handleSubmit} className='mb-4'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none'
                    >
                        Login
                    </button>
                </form>

                {errorMessage && <p className='text-red-500 text-center mt-4'>{errorMessage}</p>}

                {/* Don't have an account? Sign up link */}
                {/* <div className='mt-4 text-center'>
                    <p className='text-sm text-gray-600'>
                        Don't have an account?
                        <Link to="/admin-signup" className='text-blue-600 hover:underline ml-1'>
                            Sign up here
                        </Link>
                    </p>
                </div> */}
            </div>
        </div>
    );
}
