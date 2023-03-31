import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 300 },
  { name: 'D', value: 200 },
];

function setColorScheme(color) {
  switch (color) {
    case 'earth':
      return ['#C6D57E', '#D57E7E', '#A2CDCD', '#FFE1AF'];
    case 'water':
      return ['#B4E4FF', '#3E54AC', '#655DBB', '#BFACE2'];
    default:
      return ['#8884d8'];
  }
}

const BarChartBlock = ({ height, width, color }) => {
  const colors = setColorScheme(color);

  return (
    <BarChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='value' fill={colors[0]}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default BarChartBlock;