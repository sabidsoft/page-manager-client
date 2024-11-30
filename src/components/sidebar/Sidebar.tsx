import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/app/hooks';
import { adminLoggedOut } from '../../redux/features/auth/authSlice';
import { SidebarProps } from './types';
import { FiSearch } from 'react-icons/fi';
import { detachments } from './data';

export default function Sidebar({ activeMenu }: SidebarProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // State for search input
    const [searchTerm, setSearchTerm] = useState('');

    // Ref for the scrollable container
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Save scroll position manually before navigation
    const saveScrollPosition = () => {
        if (scrollContainerRef.current) {
            const scrollPosition = scrollContainerRef.current.scrollTop;
            sessionStorage.setItem('sidebarScrollPosition', String(scrollPosition));
        }
    };

    // Restore scroll position on component mount
    const restoreScrollPosition = () => {
        if (scrollContainerRef.current) {
            const savedPosition = sessionStorage.getItem('sidebarScrollPosition');
            if (savedPosition) {
                scrollContainerRef.current.scrollTop = parseInt(savedPosition, 10);
            }
        }
    };

    // Restore scroll position once when component mounts
    useEffect(() => {
        restoreScrollPosition();
    }, []);

    // Handle navigation
    const handleNavigation = (menu: string, subMenu?: string) => {
        saveScrollPosition(); // Save the current scroll position
        const baseMenu = menu.trim().replace(/ /g, '-').toLowerCase();
        const formattedMenu = subMenu
            ? `${baseMenu}/${subMenu.trim().replace(/ /g, '-').toLowerCase()}`
            : baseMenu;
        navigate(`/${formattedMenu}`);
    };

    // Handle Logout
    const handleLogout = () => {
        dispatch(adminLoggedOut());
        localStorage.clear();
        navigate('/');
    };

    // Filter detachments based on the search term
    const filteredDetachments = detachments.filter(({ name, subcategories }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subcategories.some((sub) => sub.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <nav className="h-full w-[23%] bg-white flex flex-col border-r">
            {/* Sidebar Header */}
            <div className="text-center py-5 border-b border-gray-200 mb-4">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Page Management System
                </Link>
            </div>

            {/* Search Box */}
            <div className="px-4 py-2 mb-4 relative">
                <input
                    type="text"
                    placeholder="Search here by detachment..."
                    className="w-full p-2 pl-10 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute top-1/2 left-7 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>

            {/* Sidebar Menu */}
            <div
                ref={scrollContainerRef}
                className="flex-grow overflow-y-auto px-5 hide-scrollbar"
            >
                <ul>
                    <li>
                        <Link
                            to="/all-pages"
                            className={`cursor-pointer block w-full text-lg font-bold py-1.5 px-4 mb-1 rounded ${
                                activeMenu === 'All Pages' ? 'bg-gray-300' : 'hover:bg-gray-200'
                            }`}
                        >
                            All Pages
                        </Link>
                    </li>
                    {filteredDetachments.map(({ name, subcategories }) => (
                        <li key={name} className="mb-4">
                            <div
                                className={`cursor-default text-lg font-bold py-1.5 px-4 rounded ${
                                    activeMenu === name ? 'bg-gray-300' : 'hover:bg-gray-200'
                                }`}
                            >
                                {name}
                            </div>
                            {/* Subcategories */}
                            {subcategories.length > 0 && (
                                <ul className="pl-6 mt-2">
                                    {subcategories.map((subMenu) => (
                                        <li
                                            key={subMenu}
                                            className={`cursor-pointer text-sm py-1 px-3 mb-1 rounded ${
                                                activeMenu === subMenu
                                                    ? 'bg-gray-300 text-black'
                                                    : 'hover:bg-gray-200 text-[#555]'
                                            }`}
                                            onClick={() => handleNavigation(name, subMenu)}
                                        >
                                            {subMenu}
                                        </li>
                                    ))}
                                </ul>
                            )}
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
