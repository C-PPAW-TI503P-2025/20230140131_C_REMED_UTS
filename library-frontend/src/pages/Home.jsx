import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Book, Play, Image as ImageIcon, ArrowRight, CheckCircle, Search, Library, Shield, Smartphone, User, Bell, Filter } from 'lucide-react';

const LandingPage = ({ books, loading }) => (
    <div className="font-sans">
        {/* Hero Section */}
        <section className="bg-[#374151] text-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <p className="text-gray-300 text-sm mb-4 font-medium tracking-wide uppercase">Digital Library Platform</p>
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Smart Library<br />Management<br />System
                    </h1>
                    <p className="text-gray-300 mb-8 max-w-lg">
                        Efficiently manage book borrowing, track inventory, and streamline your reading experience with our modern digital platform.
                    </p>
                    <a href="#collection" className="bg-white text-gray-900 px-8 py-3 rounded font-bold hover:bg-gray-100 transition-colors uppercase text-sm tracking-wider inline-block">
                        Browse Books
                    </a>
                </div>
                <div className="bg-[#4B5563] h-80 w-full rounded-lg flex items-center justify-center border-2 border-dashed border-gray-500 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50"></div>
                    <Library className="h-24 w-24 text-gray-300 relative z-10" />
                </div>
            </div>
        </section>

        {/* Advantages Section (Books Grid) */}
        <section id="collection" className="bg-[#F3F4F6] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Collection</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                        Explore our diverse collection of books available for instant borrowing. Check availability in real-time and manage your reading list.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {books.slice(0, 4).map((book) => (
                            <div key={book.id} className="bg-white h-64 rounded-lg flex flex-col items-center justify-center relative group overflow-hidden transition-all hover:shadow-xl border border-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                                    <Book className="h-16 w-16 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="absolute top-2 right-2">
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${book.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {book.stock > 0 ? 'In Stock' : 'Out'}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="font-bold truncate text-sm">{book.title}</h3>
                                    <p className="text-xs text-gray-300 mb-2">{book.author}</p>
                                    <Link to={`/books/${book.id}`} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center">
                                        View Details <ArrowRight className="h-3 w-3 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {/* Fillers if less than 4 books */}
                        {[...Array(Math.max(0, 4 - books.length))].map((_, i) => (
                            <div key={`placeholder-${i}`} className="bg-gray-200 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                <Book className="h-12 w-12 text-gray-400 opacity-50" />
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <button className="border border-gray-400 text-gray-600 px-6 py-2 rounded text-sm font-medium hover:bg-white hover:shadow-md transition-all">
                        View Full Catalog
                    </button>
                </div>
            </div>
        </section>

        {/* Value Proposition Section */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Our Library?</h2>
                    <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                        We provide a seamless and modern way to manage your reading habits. Our platform ensures you spend less time searching and more time reading.
                    </p>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-800 mb-1 flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Real-time Tracking</h4>
                            <p className="text-xs text-gray-500">Check book availability instantly.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-1 flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Instant Borrowing</h4>
                            <p className="text-xs text-gray-500">Borrow books with a single click.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-1 flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Location Services</h4>
                            <p className="text-xs text-gray-500">Verify your location for security.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-1 flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Digital History</h4>
                            <p className="text-xs text-gray-500">Keep track of all your reads.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 h-80 w-full rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-pattern opacity-10"></div>
                    <Shield className="h-24 w-24 text-gray-400" />
                </div>
            </div>
        </section>

        {/* Features Section (Dark Footer-like) */}
        <section className="bg-[#374151] text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Key Features</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                        Designed for students, teachers, and book lovers. Our system provides everything you need to manage a modern library.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-[#4B5563] h-64 rounded-lg flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                        <div className="h-16 w-16 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 text-white ml-1" />
                        </div>
                        <p className="absolute bottom-4 text-sm font-medium">Watch Demo</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#4B5563] h-30 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-[#586372] transition-colors">
                            <Search className="h-6 w-6 mb-2 text-indigo-400" />
                            <span className="text-sm font-medium">Smart Search</span>
                        </div>
                        <div className="bg-[#4B5563] h-30 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-[#586372] transition-colors">
                            <Smartphone className="h-6 w-6 mb-2 text-green-400" />
                            <span className="text-sm font-medium">Mobile Ready</span>
                        </div>
                        <div className="bg-[#4B5563] h-30 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-[#586372] transition-colors">
                            <Shield className="h-6 w-6 mb-2 text-blue-400" />
                            <span className="text-sm font-medium">Secure Access</span>
                        </div>
                        <div className="bg-[#4B5563] h-30 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-[#586372] transition-colors">
                            <Library className="h-6 w-6 mb-2 text-purple-400" />
                            <span className="text-sm font-medium">Large Catalog</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {['User Dashboard', 'Admin Controls', 'Borrow History', 'Stock Management'].map((item, i) => (
                        <div key={i} className="bg-[#4B5563] h-16 rounded flex items-center justify-center hover:bg-[#586372] transition-colors cursor-default">
                            <span className="text-xs font-bold tracking-wide">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
);

const UserDashboard = ({ user, books, loading }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.username}!</h1>
                        <p className="text-gray-500 mt-1">Ready to find your next read?</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-3">
                        <Link to="/history" className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors">
                            <Library className="h-4 w-4 mr-2" />
                            My Borrowed Books
                        </Link>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-grow relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center justify-center px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium shadow-sm">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                </button>
            </div>

            {/* Books Grid */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Book className="h-5 w-5 mr-2 text-indigo-600" />
                    Available Books
                </h2>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBooks.map((book) => (
                            <div key={book.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full">
                                <div className="h-48 bg-gray-100 relative flex items-center justify-center">
                                    <Book className="h-16 w-16 text-gray-300" />
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${book.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {book.stock > 0 ? `${book.stock} Available` : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1" title={book.title}>{book.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{book.author}</p>

                                    <div className="mt-auto pt-4 border-t border-gray-50">
                                        <Link
                                            to={`/books/${book.id}`}
                                            className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No books found</h3>
                        <p className="text-gray-500">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Home = () => {
    const { user } = useAuth();
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

    if (user) {
        return <UserDashboard user={user} books={books} loading={loading} />;
    }

    return <LandingPage books={books} loading={loading} />;
};

export default Home;
