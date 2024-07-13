import {useQuery} from 'react-query';
import api from '../api/data';
import {Bar, BarChart, Legend, Line, Tooltip, XAxis, YAxis} from "recharts";
import {useGetDailyMaxByMonth} from "../hooks/useGetDailyMaxByMonth";
import {Skeleton} from "@mui/material";
import {Box} from "@mui/system";
import MonthYearSelector from "../components/MonthYearSelector";
import {useChartConfig} from "../hooks/useGetChartConfig";
import {useEffect, useMemo} from "react";
import DynamicChart from "../components/DynamicChart";


export default function HomePage() {
    const {
        data: dailyMaxData,
        isLoading: dailyMaxDataLoading,
        selectedMonth,
        setSelectedMonth,
    } = useGetDailyMaxByMonth();

    const {
        data: monthlyAverageAll,
        isLoading: monthlyAverageAllLoading
    } = useQuery('monthlyAverageAll', api.getMonthlyAverageAllHotels);

    const {config, setChartConfig, setData, CHART_TYPES} = useChartConfig()

    const onBarClick = (data) => {
        // Gets utilization data for the month of all hotels
        setSelectedMonth(data.month);
        setChartConfig(CHART_TYPES.DAILY_MAX, barClickEvents);
    }

    const onMonthYearChanged = (monthYear) => {
        setSelectedMonth(monthYear);
        setChartConfig(CHART_TYPES.DAILY_MAX, barClickEvents);
    }

    const barClickEvents = useMemo(() => ({
        "avg_utilization": onBarClick
    }), []);

    useEffect(() => {
        // Initializes the config to show on page load (do not delete)
        setChartConfig(CHART_TYPES.AVERAGE_MONTHLY, barClickEvents)
    }, [])

    const isLoadingData = monthlyAverageAllLoading || dailyMaxDataLoading;

    useEffect(() => {
        if (selectedMonth && dailyMaxData) {
            setChartConfig(CHART_TYPES.DAILY_MAX, barClickEvents);
            setData(dailyMaxData);
        } else if (!selectedMonth && monthlyAverageAll) {
            setChartConfig(CHART_TYPES.AVERAGE_MONTHLY, barClickEvents);
            setData(monthlyAverageAll);
        }
    }, [selectedMonth, dailyMaxData, monthlyAverageAll]);

    return (
        <div className="container max-auto">
            <Box sx={{minWidth: 120}} className="py-10">
                <MonthYearSelector onMonthYearChange={onMonthYearChanged}/>
            </Box>
            {isLoadingData ? (<Skeleton variant="rectangular" width={1300} height={730} animation="wave"/>) :
                (

                    // <BarChart width={config.width} height={config.height} data={config.data}>
                    //     <XAxis dataKey={config.dataKey} tickCount={config?.xAxis?.tickCount}/>
                    //     <YAxis tickCount={config?.yAxis?.tickCount}/>
                    //     <Tooltip/>
                    //     <Legend/>
                    //     {config.bars && config.bars.map(item => (
                    //         <Bar key={item.dataKey} dataKey={item?.dataKey} fill={item.fill}
                    //              onClick={item.onClick}/>))}
                    //     {config.lines && config.lines.map(item => (
                    //         <Line key={item.dataKey} dataKey={item?.dataKey} stroke={item.stroke}
                    //              onClick={item.onClick} type="monotone"/>))}
                    // </BarChart>
                    <DynamicChart config={config}/>
                )
            }
        </div>
    )
}
