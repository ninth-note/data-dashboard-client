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

const basic = [
    { name: 'no plan set', value: 0 },
];

// const basic = [
//     { name: 'A', value: 400 },
//     { name: 'B', value: 300 },
//     { name: 'C', value: 300 },
//     { name: 'D', value: 200 },
//     { name: 'E', value: 100 },
// ];

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

function getDayOfWeek(date) {
    const index = date
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return { day: daysOfWeek[index], index: index }
}

function handleFSW1(inputData) {

    const items = inputData.items
  
    let display = []
  
    // create a temporary object to group items by day
    let days = []
  
    items.map(item => {
      
      const { day, index } = getDayOfWeek(item.date) // get the day of week name
      if (!days[index]) {
          days[index] = { name: day, spent: 0 } // initialize the day with zero value
      }
      days[index].spent += parseFloat(item.value) // add the value to the day's total
    })
  
    // convert the temporary object to an array of items
    days.map((day) => {
      display.push(day)
    });
  
    return display
  
}

const AreaChartMain = ({ height, width, inputData, color }) => {
  
    const id = inputData.id ? inputData.id : ''
    const colors = setColorScheme(color);

    let data = basic
    let key = 'value'

    switch (id) {
      
        case 'fws1':

            data = handleFSW1(inputData)
            key = 'spent'
            break

    };

    return (
        <AreaChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type='monotone' dataKey={key} stroke={colors[0]} fill={colors[0]} />
        </AreaChart>
    );
};

export default AreaChartMain;