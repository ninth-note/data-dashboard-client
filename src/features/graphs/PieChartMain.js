import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const basic = [
  { name: 'Empty', value: 1 },
];

function setColorScheme(color) {

    switch (color) {
      
        case 'earth':
  
            return ['#C6D57E', '#D57E7E', '#A2CDCD', '#FFE1AF']

        case 'water':

            return ['#B4E4FF', '#3E54AC', '#655DBB', '#BFACE2']

    };

}

function getDayOfWeek(date) {
    const index = date
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return { day: daysOfWeek[index], index: index }
}

function handleFS1(inputData) {

    return [
        { name: 'essential expenses', value: parseInt(inputData.essentialExpenses) },
        { name: 'leisure', value: parseInt(inputData.leisure) },
        { name: 'transport', value: parseInt(inputData.transport) },
        { name: 'savings', value: parseInt(inputData.savings) },
    ];

}

function handleFSW1(inputData) {

    const items = inputData.items

    let display = []

    // create a temporary object to group items by day
    let days = []

    items.map(item => {
        
        const { day, index } = getDayOfWeek(item.date) // get the day of week name
        if (!days[index]) {
            days[index] = { name: day, value: 0 } // initialize the day with zero value
        }
        days[index].value += parseFloat(item.value) // add the value to the day's total
    })

    // convert the temporary object to an array of items
    days.map((day) => {
        display.push(day)
    });

    return display

}

const PieChartMain = ({ height, width, inputData, color }) => {

    const id = inputData.id ? inputData.id : ''
    const colors = setColorScheme(color)

    let data = basic

    switch (id) {
      
        case 'fs1':
  
            data = handleFS1(inputData)
            break

        case 'fws1':

            data = handleFSW1(inputData)
            break

    };

    return (
        <PieChart width={width} height={height}>
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

export default PieChartMain;