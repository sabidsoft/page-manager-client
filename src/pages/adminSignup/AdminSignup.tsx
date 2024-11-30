import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';
import useTitle from '../../hooks/useTitle';
import { useAdminSignupMutation } from '../../redux/features/api/endPoints/adminEndpoint/adminEndpoint';

export default function AdminSignup() {
    useTitle("Admin Signup");
    const navigate = useNavigate();
    const location = useLocation();

    const [adminSignup, { data: signupData, error: signupError, isLoading: signupIsLoading }] = useAdminSignupMutation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [adminCode, setAdminCode] = useState("");
    const [role, setRole] = useState("Super Admin"); // Default role
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        adminSignup({ name, email, adminCode, role, password });
    };

    useEffect(() => {
        if (signupData) {
            navigate('/', { replace: true });
        }

        if (signupError) {
            if ("status" in signupError) {
                const errMsgJSONString = 'error' in signupError ? signupError.error : JSON.stringify(signupError.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [signupData, signupError, navigate, location.state?.from?.pathname]);

    if (signupIsLoading) {
        return <Loader />;
    }

    return (
        <div className='h-screen flex justify-center items-center bg-white'>
            <div className='w-[700px] bg-gray-100 p-8 rounded-lg shadow-lg'>
                <h2 className='text-center text-2xl font-bold mb-6'>Admin Signup</h2>

                <form onSubmit={handleSubmit} className='mb-4'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>

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

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='role'>Role</label>
                        <select
                            id='role'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                        >
                            <option value="Super Admin">Super Admin</option>
                            <option value="Detachment Admin">Detachment Admin</option>
                            <option value="District Admin">District Admin</option>
                        </select>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='adminCode'>Admin Code</label>
                        <input
                            type='text'
                            id='adminCode'
                            placeholder='Enter admin code'
                            value={adminCode}
                            onChange={(e) => setAdminCode(e.target.value)}
                            required
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>

                    <div className='mb-4'>
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

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='confirmPassword'>Confirm Password</label>
                        <input
                            type='password'
                            id='confirmPassword'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white mt-5 py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none'
                    >
                        Sign Up
                    </button>
                </form>

                {errorMessage && <p className='text-red-500 text-center mt-4'>{errorMessage}</p>}
            </div>
        </div>
    );
}
