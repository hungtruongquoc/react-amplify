import axios from 'axios';

// Create an axios instance with the base URL from .env
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Define your API functions
const api = {
    // Example: Get all utilization data
    getRoomUtilization: async () => {
        const response = await axiosInstance.get('/room-utilization');
        return response.data;
    },
    getHotels: async () => {
        const response = await axiosInstance.get('/hotels');
        return response.data;
    },
    getMonthlyAverageAllHotels: async () => {
        const response = await axiosInstance.get('/room-utilization/average-per-month/');
        return response.data;
    },
    getDailyMaxUtilizationForEachMonth: async(month) => {
        const response = await axiosInstance.get(`/room-utilization/max-daily-by-hotels/${month}`);
        return response.data;
    },
    getMonthYearItems: async() => {
        const response = await axiosInstance.get('/month-years');
        return response.data;
    }
};

export default api;
