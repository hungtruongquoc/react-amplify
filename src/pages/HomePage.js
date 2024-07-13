import {useQuery} from 'react-query';
import api from '../api/data';
import {Bar, BarChart, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {useGetDailyMaxByMonth} from "../hooks/useGetDailyMaxByMonth";
import {FormControl, InputLabel, MenuItem, Select, Skeleton} from "@mui/material";
import {Box} from "@mui/system";
import MonthYearSelector from "../components/MonthYearSelector";

export const BarLabel = () => <p>Monthly Average All Hotels</p>

export default function HomePage() {
    const {
        data: dailyMaxData,
        isLoading: dailyMaxDataLoading,
        error: dailyMaxDataError,
        selectedMonth,
        setSelectedMonth
    } = useGetDailyMaxByMonth();

    const {
        data: monthlyAverageAll,
        isLoading: monthlyAverageAllLoading,
        error: monthlyAverageAllError
    } = useQuery('monthlyAverageAll', api.getMonthlyAverageAllHotels);

    const onBarClick = (data) => {
        // Gets utilization data for the month of all hotels
        setSelectedMonth(data.month);
    }

    const onMonthYearChanged = (monthYear) => {
        setSelectedMonth(monthYear);
    }

    const isLoadingData = monthlyAverageAllLoading || dailyMaxDataLoading;

    return (
        <>
            <div className="container max-auto">
                <Box sx={{ minWidth: 120 }} className="py-10">
                    <MonthYearSelector onMonthYearChange={onMonthYearChanged}/>
                </Box>
                {isLoadingData ? (<Skeleton variant="rectangular" width={1300} height={730} animation="wave" />) : null}
                {!isLoadingData && !selectedMonth && <BarChart width={1200} height={730} data={monthlyAverageAll}>
                    <XAxis dataKey="month"/>
                    <YAxis tickCount={10}/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="avg_utilization" fill="#8884d8" onClick={onBarClick}/>
                </BarChart>}
                {!isLoadingData && selectedMonth && <BarChart width={1300} height={730} data={dailyMaxData} barGap={16}>
                    <XAxis dataKey="day" tickCount={30}/>
                    <YAxis tickCount={10}/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="Hotel One_max_utilization" fill="green" onClick={onBarClick}/>
                    <Bar dataKey="Hotel Two_max_utilization" fill="blue" onClick={onBarClick}/>
                    <Bar dataKey="Hotel Three_max_utilization" fill="black" onClick={onBarClick}/>
                </BarChart>}
            </div>
        </>
    )
}
