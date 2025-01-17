import {useMemo, useState} from 'react';

export const CHART_TYPES = {
    AVERAGE_MONTHLY: 'average_monthly',
    DAILY_MAX: 'daily_max',
};

export const useChartConfig = () => {
    const [chartState, setChartState] = useState({
        type: CHART_TYPES.AVERAGE_MONTHLY,
        events: {}
    });
    const [data, setData] = useState([])

    const chartTypeMap = useMemo(() => ({
        [CHART_TYPES.AVERAGE_MONTHLY]: {
            type: 'bar',
            dataKey: 'month',
            width: 1200,
            height: 730,
            barGap: 16,
            yAxis: {tickCount: 5},
            bars: [
                {
                    dataKey: "avg_utilization",
                    fill: "#8884d8"
                }
            ]
        },
        [CHART_TYPES.DAILY_MAX]: {
            type: 'line',
            dataKey: 'day',
            width: 1300,
            height: 730,
            barGap: 16,
            xAxis: {tickCount: 30},
            yAxis: {tickCount: 5},
            lines: [
                {
                    dataKey: "Hotel One_max_utilization",
                    stroke: "green"
                },
                {
                    dataKey: "Hotel Two_max_utilization",
                    stroke: "blue"
                },
                {
                    dataKey: "Hotel Three_max_utilization",
                    stroke: "black"
                },
            ]
        }
    }), []);

    const config = useMemo(() => {
        const chartConfig = { ...chartTypeMap[chartState.type], data };

        chartConfig.bars = chartConfig.bars?.map(bar => ({
            ...bar,
            onClick: chartState.events && chartState.events[bar.dataKey]  ? chartState.events[bar.dataKey] : null
        }));
        chartConfig.lines = chartConfig.lines?.map(line => ({
            ...line,
            onClick: chartState.events && chartState.events[line.dataKey]  ? chartState.events[line.dataKey] : null
        }));
        return chartConfig;
    }, [chartState, data, chartTypeMap]);

    const setChartConfig = (type, events = {}) => {
        setChartState({ type, data, events });
    };

    return {config, setChartConfig, setData, CHART_TYPES};
};
