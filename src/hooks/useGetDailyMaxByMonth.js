// hooks/useDailyMaxUtilization.js
import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../api/data';

export const useGetDailyMaxByMonth = () => {
    const [selectedMonth, setSelectedMonth] = useState(null);

    const { data, isLoading, error, ...rest } = useQuery(
        ['dailyMaxData', selectedMonth],
        () => api.getDailyMaxUtilizationForEachMonth(selectedMonth),
        {
            enabled: !!selectedMonth, // Only execute the query if selectedMonth is not null
        }
    );

    return { data, isLoading, error, selectedMonth, setSelectedMonth, ...rest };
};
