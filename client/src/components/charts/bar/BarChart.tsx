import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface BarChartProps {
    data: any,
    legends?: any,
    keys: string[]
    by: string
    matcher?(item:any): boolean 
}

const BarChart: React.FC<BarChartProps> = ({ data, keys, by, legends, matcher }) => {
    return (
    <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={by}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'warning',
                type: 'patternDots',
                background: '#ff0000',
                color: '#ff0000',
                size: 4,
                padding: 1,
                stagger: true
            },
        ]}
        fill={[
            {
                match: matcher ? matcher : () => false,
                id: 'warning'
            },
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={legends}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)}

export default BarChart;