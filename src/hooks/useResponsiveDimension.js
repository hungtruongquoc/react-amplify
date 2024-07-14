import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useResponsiveDimensions = (initialWidth = 800, initialHeight = 400) => {
    const [dimensions, setDimensions] = useState({ width: initialWidth, height: initialHeight });
    const theme = useTheme();

    // Define breakpoints using MUI's theme breakpoints
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));

    useEffect(() => {
        const updateDimensions = () => {
            let width;
            if (isXs) {
                width = 300; // Adjust accordingly
            } else if (isSm) {
                width = 600; // Adjust accordingly
            } else if (isMd) {
                width = 800; // Adjust accordingly
            } else if (isLg) {
                width = 1000; // Adjust accordingly
            } else if (isXl) {
                width = 1200; // Adjust accordingly
            } else {
                width = initialWidth;
            }

            const height = width * 0.5; // Adjust the aspect ratio as needed
            setDimensions({ width, height });
        };

        updateDimensions();
    }, [isXs, isSm, isMd, isLg, isXl, initialWidth]);

    return dimensions;
};

export default useResponsiveDimensions;
