import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Clock, MapPin, User, Book } from 'lucide-react';

const AdminHistory = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await api.get('/borrow');
            console.log('AdminHistory logs:', response.data.data);
            setLogs(response.data.data || []);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setLogs([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading history...</div>;

    if (!Array.isArray(logs)) {
        console.error('Logs is not an array:', logs);
        return <div className="p-8 text-center text-red-500">Error loading data. Check console.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">All Borrowing History</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {logs.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <User className="h-4 w-4 text-gray-400 mr-2" />
                                                <div className="text-sm font-medium text-gray-900">{log.user?.username || 'Unknown'}</div>
                                                <div className="text-sm text-gray-500 ml-2">({log.user?.email})</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Book className="h-4 w-4 text-gray-400 mr-2" />
                                                <div className="text-sm text-gray-900">{log.book?.title || 'Unknown Book'}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {new Date(log.borrowDate).toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {Number(log.latitude).toFixed(4)}, {Number(log.longitude).toFixed(4)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        No borrowing history found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHistory;
