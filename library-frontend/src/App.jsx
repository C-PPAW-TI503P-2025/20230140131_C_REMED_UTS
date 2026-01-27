import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetail from './pages/BookDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminHistory from './pages/AdminHistory';
import BorrowHistory from './pages/BorrowHistory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="books/:id" element={<BookDetail />} />

        {/* Protected Routes - User Only */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="history" element={<BorrowHistory />} />
        </Route>

        {/* Protected Routes - Admin Only */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/history" element={<AdminHistory />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
