import { BarChart, LineChart, Bar, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const DynamicChart = ({ config }) => {
    const ChartComponent = config.type === 'line' ? LineChart : BarChart;
    const elements = config.type === 'line' ? config.lines : config.bars;

    return (
        <ChartComponent width={config.width} height={config.height} data={config.data}>
            <XAxis dataKey={config.dataKey} tickCount={config?.xAxis?.tickCount} />
            <YAxis tickCount={config?.yAxis?.tickCount} />
            <Tooltip />
            <Legend />
            {elements && elements.map(item => {
                if (config.type === 'line') {
                    return <Line key={item.dataKey} dataKey={item?.dataKey} stroke={item.stroke} onClick={item.onClick} type="monotone" />;
                }
                return <Bar key={item.dataKey} dataKey={item?.dataKey} fill={item.fill} onClick={item.onClick} />;
            })}
        </ChartComponent>
    );
};

export default DynamicChart;
