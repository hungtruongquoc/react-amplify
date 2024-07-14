import {BarChart, LineChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from "recharts";
import useResponsiveDimensions from "../hooks/useResponsiveDimension";

const DynamicChart = ({config}) => {
    const ChartComponent = config.type === 'line' ? LineChart : BarChart;
    const elements = config.type === 'line' ? config.lines : config.bars;
    const dimensions = useResponsiveDimensions();

    return (
        <div className="w-full overflow-auto flex justify-center items-center">
            <ChartComponent width={dimensions.width} height={dimensions.height} data={config.data}>
                <XAxis dataKey={config.dataKey} tickCount={config?.xAxis?.tickCount}/>
                <YAxis tickCount={config?.yAxis?.tickCount} tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`}/>
                <Tooltip/>
                <Legend/>
                {elements && elements.map(item => {
                    if (config.type === 'line') {
                        return <Line key={item.dataKey} dataKey={item?.dataKey} stroke={item.stroke}
                                     onClick={item.onClick} type="monotone"/>;
                    }
                    return <Bar key={item.dataKey} dataKey={item?.dataKey} fill={item.fill} onClick={item.onClick}/>;
                })}
            </ChartComponent>
        </div>
    );
};

export default DynamicChart;
