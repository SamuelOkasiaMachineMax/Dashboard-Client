import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const VoltageGraph = ({ rows, startDate, endDate }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (rows && rows.length > 0) {
            // Assuming data is already in the [[date, value], ...] format
            // Find the minimum and maximum dates in the dataset
            const dates = rows.map(item => new Date(item.read_at).getTime());
            console.log(dates)
            // const minDate = Math.min(...dates);
            // const maxDate = Math.max(...dates);
            const minDate = startDate;
            const maxDate = endDate;
            console.log(minDate)
            console.log(maxDate)

            var chartInstance = echarts.init(chartRef.current);

            var option = {
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'cross',
                    },
                },
                xAxis: {
                    type: 'time',
                    boundaryGap: false,
                    min: minDate, // Set the min value for the x-axis
                    max: maxDate, // Set the max value for the x-axis
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100,
                    },
                    {
                        start: 0,
                        end: 100,
                    },
                ],
                series: [
                    {
                        type: 'scatter', // Changed from 'line' to 'scatter'
                        showSymbol: true,
                        symbolSize: 6, // Adjust the size of the scatter points
                        data: rows, // Adapted for the correct data structure
                    },
                ],
            };

            chartInstance.setOption(option);

            return () => chartInstance.dispose();
        }
    }, [rows]); // Re-run this effect when `data` changes
// Dependency on data to re-render chart when data changes

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default VoltageGraph;
