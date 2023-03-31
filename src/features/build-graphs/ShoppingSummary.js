// import styles
import '../../styles/building-blocks/ShoppingSummary.scss'
  
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

function getDayOfWeek(day) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return daysOfWeek[day]
}


const ShoppingSummaryBlock = ({color}) => {

    const colors = setColorScheme(color)

    return (
        <div className='ss22'>
            <div 
                style={{ backgroundColor: colors[0] }}
                className='ss22__last'>
                <h1 className='ss22__last__text'>{getDayOfWeek(new Date().getDay())} spending: </h1>
                <div className='ss22__last__value'>
                    <h1 className='ss22__last__value__text'>0$</h1>
                </div>
            </div>
            <div 
                style={{ backgroundColor: colors[3] }}
                className='ss22__avg'
            >
                <h1 className='ss22__avg__text'>Spending on avg:  </h1>
                <div className='ss22__avg__value'>
                    <h1 className='ss22__avg__value__text'>0$</h1>
                </div>
            </div>
        </div>
    )
}

export default ShoppingSummaryBlock