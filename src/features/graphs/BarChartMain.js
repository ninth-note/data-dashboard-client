import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

const basic = [
    { name: 'no plan set', value: 0 },
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

const BarChartMain = ({ height, width, inputData, color }) => {

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
        <BarChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={key} fill={colors[0]}>
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        </Bar>
        </BarChart>
    );
};

export default BarChartMain;