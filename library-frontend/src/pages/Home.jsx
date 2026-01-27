import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await api.get('/books');
            setBooks(response.data.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading books...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Books</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Book className="h-8 w-8 text-indigo-600" />
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${book.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {book.stock > 0 ? `${book.stock} in stock` : 'Out of Stock'}
                                </span>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
                            <p className="text-gray-600 mb-4">by {book.author}</p>

                            <Link
                                to={`/books/${book.id}`}
                                className="block w-full text-center bg-indigo-50 text-indigo-600 py-2 rounded-md hover:bg-indigo-100 transition-colors font-medium"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {books.length === 0 && (
                <div className="text-center text-gray-500 mt-12">
                    No books available at the moment.
                </div>
            )}
        </div>
    );
};

export default Home;
