// import styles
import '../../styles/building-blocks/ShoppingSummary.scss'
  
const basic = { today: 0, avg: 0 }

function setColorScheme(color) {
    switch (color) {
        case 'earth':
        return ['#C6D57E', '#D57E7E', '#A2CDCD', '#FFE1AF'];
        case 'water':
        return ['#B4E4FF', '#3E54AC', '#655DBB', '#BFACE2'];
        default:
        return ['#C6D57E', '#D57E7E', '#A2CDCD', '#FFE1AF'];
    }
}

function extractData(inputData) {

    const items = inputData.items

    // create an array to group item totals by day
    let days = [0, 0, 0, 0, 0, 0, 0]

    items.map(item => {
        days[item.date] += parseFloat(item.value) // add the value to the day's total
    })

    // find the avg spending
    const activeDays = days.filter(day => day > 0)
    const sum = activeDays.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / activeDays.length

    return { today: days[new Date().getDay()].toFixed(2), avg: avg.toFixed(2) }

}

const ShoppingSummaryMain = ({ inputData, color}) => {

    const data = (inputData.id === 'fws1')? extractData(inputData) : basic
    const colors = setColorScheme(color)

    return (
        <div className='ss22'>
            <div 
                style={{ backgroundColor: colors[0] }}
                className='ss22__last'>
                <h1 className='ss22__last__text'>Spent today: </h1>
                <div className='ss22__last__value'>
                    <h1 className='ss22__last__value__text'>{data.today} €</h1>
                </div>
            </div>
            <div 
                style={{ backgroundColor: colors[3] }}
                className='ss22__avg'
            >
                <h1 className='ss22__avg__text'>Spending on avg:  </h1>
                <div className='ss22__avg__value'>
                    <h1 className='ss22__avg__value__text'>{data.avg} €</h1>
                </div>
            </div>
        </div>
    )
}

export default ShoppingSummaryMain