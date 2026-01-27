import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import useGeolocation from '../hooks/useGeolocation';
import toast from 'react-hot-toast';
import { Book, MapPin, ArrowLeft } from 'lucide-react';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { location, error: geoError, loading: geoLoading } = useGeolocation();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [borrowing, setBorrowing] = useState(false);

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const response = await api.get(`/books/${id}`);
            setBook(response.data.data);
        } catch (error) {
            console.error('Error fetching book:', error);
            toast.error('Failed to load book details');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [borrowData, setBorrowData] = useState(null);

    const onBorrowClick = () => {
        if (!user) {
            toast.error('Please login to borrow books');
            navigate('/login');
            return;
        }

        if (geoError) {
            toast.error('Location access is required to borrow books');
            return;
        }

        if (!location) {
            toast.error('Waiting for location...');
            return;
        }

        setShowConfirmModal(true);
    };

    const handleConfirmBorrow = async () => {
        setBorrowing(true);
        try {
            const response = await api.post('/borrow', {
                bookId: book.id,
                latitude: location.latitude,
                longitude: location.longitude
            });

            setBorrowData(response.data.data);
            setShowConfirmModal(false);
            setShowSuccessModal(true);
            fetchBook(); // Refresh stock
        } catch (error) {
            console.error('Borrow failed:', error);
            toast.error(error.response?.data?.message || 'Failed to borrow book');
            setShowConfirmModal(false);
        } finally {
            setBorrowing(false);
        }
    };

    console.log('BookDetail ID:', id);

    if (loading) return <div className="text-center py-12">Loading...</div>;

    if (!book) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800">Book not found</h2>
                <p className="text-gray-600 mt-2">The book with ID {id} could not be found.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-indigo-600 mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Books
            </button>

            <div className="bg-white rounded-lg shadow-md overflow-hidden p-8">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                        <p className="text-xl text-gray-600">by {book.author}</p>
                    </div>
                    <Book className="h-12 w-12 text-indigo-600" />
                </div>

                <div className="border-t border-b border-gray-100 py-6 my-6">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Availability</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${book.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {book.stock > 0 ? `${book.stock} copies available` : 'Out of Stock'}
                        </span>
                    </div>
                </div>

                {user && user.role === 'user' && (
                    <div className="space-y-4">
                        {geoLoading ? (
                            <div className="flex items-center justify-center text-gray-500 text-sm">
                                <MapPin className="h-4 w-4 mr-2 animate-pulse" />
                                Getting your location...
                            </div>
                        ) : (
                            <button
                                onClick={onBorrowClick}
                                disabled={book.stock === 0 || borrowing || !location}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {borrowing ? 'Processing...' : book.stock === 0 ? 'Out of Stock' : 'Borrow Now'}
                            </button>
                        )}

                        {geoError && (
                            <p className="text-red-500 text-sm text-center">
                                Please enable location services to borrow books.
                            </p>
                        )}
                    </div>
                )}

                {!user && (
                    <div className="text-center bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 mb-2">Want to borrow this book?</p>
                        <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                            Login to your account
                        </Link>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Borrow</h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to borrow <strong>{book.title}</strong>?
                        </p>
                        <div className="bg-gray-50 p-4 rounded-md mb-6">
                            <p className="text-sm text-gray-500 mb-1">Your Location:</p>
                            <div className="flex items-center text-gray-700">
                                <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                                <span>{location?.latitude.toFixed(6)}, {location?.longitude.toFixed(6)}</span>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                disabled={borrowing}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmBorrow}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                                disabled={borrowing}
                            >
                                {borrowing ? 'Processing...' : 'Confirm Borrow'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && borrowData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="text-center mb-6">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <Book className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Borrow Successful!</h3>
                            <p className="text-sm text-gray-500 mt-2">You have successfully borrowed this book.</p>
                        </div>

                        <div className="bg-gray-50 rounded-md p-4 space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Book Title</span>
                                <span className="text-sm font-medium text-gray-900">{book.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Date</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {new Date(borrowData.borrowDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Time</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {new Date(borrowData.borrowDate).toLocaleTimeString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Location</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {borrowData.latitude.toFixed(4)}, {borrowData.longitude.toFixed(4)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setShowSuccessModal(false);
                                navigate('/history');
                            }}
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                        >
                            View My History
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetail;
