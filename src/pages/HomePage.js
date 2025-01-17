import {useQuery} from 'react-query';
import api from '../api/data';
import {useGetDailyMaxByMonth} from "../hooks/useGetDailyMaxByMonth";
import {Skeleton} from "@mui/material";
import {Box} from "@mui/system";
import MonthYearSelector from "../components/MonthYearSelector";
import {useChartConfig} from "../hooks/useGetChartConfig";
import {useEffect, useMemo, useState} from "react";
import DynamicChart from "../components/DynamicChart";
import { useUrlQuery } from '../hooks/useUrlQuery';

export default function HomePage() {
    const {
        data: dailyMaxData,
        isLoading: dailyMaxDataLoading,
        selectedMonth,
        setSelectedMonth,
    } = useGetDailyMaxByMonth();

    const [selectorValue, setSelectorValue] = useUrlQuery('monthYear', '');

    const {
        data: monthlyAverageAll,
        isLoading: monthlyAverageAllLoading
    } = useQuery('monthlyAverageAll', api.getMonthlyAverageAllHotels);

    const {config, setChartConfig, setData, CHART_TYPES} = useChartConfig()

    const onBarClick = (data) => {
        // Gets utilization data for the month of all hotels
        setSelectedMonth(data.month);
        setSelectorValue(data.month);
        setChartConfig(CHART_TYPES.DAILY_MAX, barClickEvents);
    }

    const onMonthYearChanged = (monthYear) => {
        setSelectedMonth(monthYear);
        setSelectorValue(monthYear);
        if (monthYear) {
            setChartConfig(CHART_TYPES.DAILY_MAX, barClickEvents);
        }
        else {
            setChartConfig(CHART_TYPES.AVERAGE_MONTHLY, barClickEvents);
        }
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

    useEffect(() => {
        setSelectedMonth(selectorValue);
    }, [selectorValue, setSelectedMonth]);

    return (
        <div className="container max-auto">
            <Box sx={{minWidth: 120}} className="py-10">
                <MonthYearSelector value={selectorValue} onMonthYearChange={onMonthYearChanged}/>
            </Box>
            {isLoadingData ? <Skeleton variant="rectangular" width={1300} height={730} animation="wave"/> :
                <DynamicChart config={config}/>
            }
        </div>
    )
}
