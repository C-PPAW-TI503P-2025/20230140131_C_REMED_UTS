import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Clock, MapPin } from 'lucide-react';

const BorrowHistory = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await api.get('/borrow/my-logs');
            setLogs(response.data.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading history...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Borrowing History</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {logs.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {logs.map((log) => (
                            <li key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{log.book.title}</h3>
                                        <p className="text-gray-600">by {log.book.author}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        <div className="flex items-center justify-end mb-1">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {new Date(log.borrowDate).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center justify-end">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            {log.latitude}, {log.longitude}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        You haven't borrowed any books yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BorrowHistory;
