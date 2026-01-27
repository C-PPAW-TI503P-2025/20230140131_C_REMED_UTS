import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User, LayoutDashboard, History } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-indigo-600 font-bold text-xl">
                            <BookOpen className="h-8 w-8 mr-2" />
                            Library System
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-gray-700 flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    {user.username}
                                </span>

                                {user.role === 'admin' ? (
                                    <>
                                        <Link to="/admin" className="text-gray-600 hover:text-indigo-600 flex items-center">
                                            <LayoutDashboard className="h-5 w-5 mr-1" />
                                            Dashboard
                                        </Link>
                                        <Link to="/admin/history" className="text-gray-600 hover:text-indigo-600 flex items-center ml-4">
                                            <History className="h-5 w-5 mr-1" />
                                            History
                                        </Link>
                                    </>
                                ) : (
                                    <Link to="/history" className="text-gray-600 hover:text-indigo-600 flex items-center">
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
                                <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">Login</Link>
                                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
