import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Toaster position="top-right" />
        </div>
    );
};

export default Layout;
