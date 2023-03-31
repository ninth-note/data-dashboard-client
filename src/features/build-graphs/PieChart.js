import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 300 },
  { name: 'D', value: 200 },
];

function setColorScheme(color) {

  switch (color) {
    
      case 'earth':

          return ['#C6D57E', '#D57E7E', '#A2CDCD', '#FFE1AF']

      case 'water':

          return ['#B4E4FF', '#3E54AC', '#655DBB', '#BFACE2']

  };

}

const PieChartBlock = ({ height, width, color }) => {

  const colors = setColorScheme(color)

  return (
    <PieChart width={width} height={height}> {/* style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px' }} */}
        <Pie
          data={data} 
          cx='49%'  //{100}
          cy='52%' 
          innerRadius={height * 0.111} // 20
          outerRadius={height * 0.333} //{60} 
          fill="#8884d8" 
          label
          dataKey="value" // <-- replace valueKey with dataKey
        >
          {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        <Tooltip />
        {/* <Legend /> */}
    </PieChart>
  );
};

export default PieChartBlock;