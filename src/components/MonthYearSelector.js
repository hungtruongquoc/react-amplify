// components/MonthYearSelector.js
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { FormControl, InputLabel, MenuItem, Select, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Cancel';
import api from '../api/data';

const StyledInputAdornment = styled(InputAdornment)(({ theme }) => ({
    marginRight: theme.spacing(2), // Adjust this value to move the icon more or less to the left
}));

const MonthYearSelector = ({value, onMonthYearChange }) => {
    const { data: monthYearItems, isLoading, error } = useQuery('month-year', api.getMonthYearItems);
    const [selectedMonthYear, setSelectedMonthYear] = useState('');

    useEffect(() => {
        setSelectedMonthYear(value);
    }, [value]);

    const handleChange = (event) => {
        setSelectedMonthYear(event.target.value);
        onMonthYearChange(event.target.value);
    };

    if (error) return <div>Error loading month-year items</div>;

    return (
        <FormControl fullWidth>
            <InputLabel id="month-year-select-label">
                {isLoading ? "Loading ..." : (selectedMonthYear ? "Month/Year" : "Select month and year")}
            </InputLabel>
            <Select
                disabled={isLoading}
                labelId="month-year-select-label"
                id="month-year-select"
                value={selectedMonthYear}
                label="Year-Month"
                onChange={handleChange}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em>Select month and year</em>;
                    }
                    return selected.split('-').reverse().join('/');
                }}
                endAdornment={
                    <StyledInputAdornment position="end">
                        {selectedMonthYear && (
                            <IconButton
                                aria-label="clear selection"
                                onClick={() => {
                                    setSelectedMonthYear('');
                                    onMonthYearChange('');
                                }}
                                edge="end"
                            >
                                <ClearIcon />
                            </IconButton>
                        )}
                    </StyledInputAdornment>
                }
            >
                {!isLoading && Array.isArray(monthYearItems) && monthYearItems.map((item) => (
                    <MenuItem key={item.month_year} value={item.month_year} disabled={!item.has_data}>
                        {item.month_year.split('-').reverse().join('/')}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MonthYearSelector;
