import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User, LayoutDashboard, History } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-[#374151] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <button className="p-2 mr-2 hover:bg-gray-700 rounded-md">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Link to="/" className="flex items-center font-bold text-xl">
                            <BookOpen className="h-6 w-6 mr-2" />
                            Library System
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="flex items-center text-gray-300">
                                    <User className="h-4 w-4 mr-1" />
                                    {user.username}
                                </span>

                                {user.role === 'admin' ? (
                                    <>
                                        <Link to="/admin" className="text-gray-300 hover:text-white flex items-center">
                                            <LayoutDashboard className="h-5 w-5 mr-1" />
                                            Dashboard
                                        </Link>
                                        <Link to="/admin/history" className="text-gray-300 hover:text-white flex items-center ml-4">
                                            <History className="h-5 w-5 mr-1" />
                                            History
                                        </Link>
                                    </>
                                ) : (
                                    <Link to="/history" className="text-gray-300 hover:text-white flex items-center">
                                        <History className="h-5 w-5 mr-1" />
                                        History
                                    </Link>
                                )}

                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors"
                                >
                                    <LogOut className="h-4 w-4 mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="space-x-2">
                                <Link to="/login" className="text-gray-300 hover:text-white font-medium">Login</Link>
                                <Link to="/register" className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-bold transition-colors">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
