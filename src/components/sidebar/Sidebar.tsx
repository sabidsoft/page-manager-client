import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../redux/app/hooks';
import { adminLoggedOut } from '../../redux/features/auth/authSlice';
import { SidebarProps } from './types';

export default function Sidebar({ activeMenu }: SidebarProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Navigate to different pages
    const handleNavigation = (menu: string) => {
        const formattedMenu = menu.trim().replace(/ /g, '-').toLowerCase();
        navigate(`/${formattedMenu}`);
    };

    // Handle Logout
    const handleLogout = () => {
        dispatch(adminLoggedOut());
        localStorage.clear();
        navigate('/');
    };

    const detachments = [
        'All Pages',
        'Bandarban Detachment',
        'Barishal Detachment',
        'Bogra Detachment',
        'Chattogram Detachment',
        'Comilla Detachment',
        "Cox's Bazar Detachment",
        'Dhaka Detachment',
        'Dinajpur Detachment',
        'Faridpur Detachment',
        'Ghatail Detachment',
        'Jessore Detachment',
        'Kaptai Detachment',
        'Khagrachari Detachment',
        'Khulna Detachment',
        'Kushtia Detachment',
        'Mymensingh Detachment',
        'Narayanganj Detachment',
        'Noakhali Detachment',
        'Pabna Detachment',
        'Patuakhali Detachment',
        'Rajendrapur Detachment',
        'Rajshahi Detachment',
        'Rangamati Detachment',
        'Rangpur Detachment',
        'Savar Detachment',
        'Satkhira Detachment',
        'Sylhet Detachment'
    ];

    return (
        <nav className="h-full w-[25%] bg-white flex flex-col border-r">
            {/* Sidebar Header */}
            <div className="text-center py-5 border-b border-gray-200 mb-4">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Page Management System
                </Link>
            </div>

            {/* Sidebar Menu */}
            <div className="flex-grow overflow-y-auto px-5 hide-scrollbar">  {/* hide-scrollbar custom css in index.css */}
                <ul>
                    {detachments.map((menu) => (
                        <li
                            key={menu}
                            className={`cursor-pointer font-medium py-2 px-4 mb-4 rounded ${
                                activeMenu === menu
                                    ? 'bg-gray-300'
                                    : 'hover:bg-gray-200 transition-colors duration-300'
                            }`}
                            onClick={() => handleNavigation(menu)}
                        >
                            {menu}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout Button */}
            <div className="border-t border-gray-200 px-4 py-4 mt-4">
                <button
                    className="bg-gray-200 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 ease-in-out"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
