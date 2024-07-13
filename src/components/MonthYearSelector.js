// components/MonthYearSelector.js
import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {FormControl, InputLabel, MenuItem, Select, Skeleton} from '@mui/material';
import api from '../api/data';

const MonthYearSelector = ({onMonthYearChange}) => {
    const {data: monthYearItems, isLoading, error} = useQuery('month-year', api.getMonthYearItems);
    const [selectedMonthYear, setSelectedMonthYear] = useState('');

    useEffect(() => {
        if (selectedMonthYear && onMonthYearChange) {
            onMonthYearChange(selectedMonthYear);
        }
    }, [selectedMonthYear, onMonthYearChange]);

    const handleChange = (event) => {
        setSelectedMonthYear(event.target.value);
    };

    if (error) return <div>Error loading month-year items</div>;

    return (
        <FormControl fullWidth>
            <InputLabel id="month-year-select-label">
                {isLoading ? "Loading ..." : "Year - Month"}
            </InputLabel>
            <Select
                labelId="month-year-select-label"
                id="month-year-select"
                value={selectedMonthYear}
                label="Year-Month"
                onChange={handleChange}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em>Select year-month</em>;
                    }

                    return selected;
                }}
            >
                {!isLoading && Array.isArray(monthYearItems) && monthYearItems.map((item) => (
                    <MenuItem key={item.month_year} value={item.month_year} disabled={!item.has_data}>
                        {item.month_year}
                    </MenuItem>
                ))}
            </Select>
        < /FormControl>
    )
        ;
};

export default MonthYearSelector;
