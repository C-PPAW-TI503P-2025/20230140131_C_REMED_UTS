import { useState, useEffect } from 'react';

const useGeolocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        const handleSuccess = (position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            setLoading(false);
        };

        const handleError = (error) => {
            setError(error.message);
            setLoading(false);
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError, options);

        return () => navigator.geolocation.clearWatch(watcher);
    }, []);

    return { location, error, loading };
};

export default useGeolocation;
