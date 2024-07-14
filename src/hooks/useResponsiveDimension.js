import {useState, useEffect} from 'react';

const useResponsiveDimensions = (initialWidth = 800, initialHeight = 400) => {
    const [dimensions, setDimensions] = useState({width: initialWidth, height: initialHeight});

    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth - 40; // Adjust 40px padding
            const height = width * 0.5; // Adjust the aspect ratio as needed
            setDimensions({width, height});
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    return dimensions;
};

export default useResponsiveDimensions;
