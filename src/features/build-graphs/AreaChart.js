import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 300 },
  { name: 'D', value: 200 },
  { name: 'E', value: 100 },
];

function setColorScheme(color) {
  switch (color) {
    case 'earth':
      return ['#D57E7E'];
    case 'water':
      return ['#3E54AC'];
    default:
      return ['#8884d8'];
  }
}

const AreaChartBlock = ({ height, width, color }) => {
  const colors = setColorScheme(color);

  return (
    <AreaChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type='monotone' dataKey='value' stroke={colors[0]} fill={colors[0]} />
    </AreaChart>
  );
};

export default AreaChartBlock;