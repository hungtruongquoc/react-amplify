import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useUrlQuery = (paramKey, defaultValue = '') => {
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const initialParam = query.get(paramKey) || defaultValue;

    const [paramValue, setParamValue] = useState(initialParam);

    const updateUrl = (value) => {
        const newQuery = new URLSearchParams(location.search);
        if (value) {
            newQuery.set(paramKey, value);
        } else {
            newQuery.delete(paramKey);
        }
        navigate(`${location.pathname}?${newQuery.toString()}`, { replace: true });
    };

    useEffect(() => {
        setParamValue(initialParam);
    }, [location.search, initialParam]);

    const setParam = (value) => {
        setParamValue(value);
        updateUrl(value);
    };

    return [paramValue, setParam];
};
