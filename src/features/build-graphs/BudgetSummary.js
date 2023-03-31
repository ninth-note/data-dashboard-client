// import styles
import '../../styles/building-blocks/BudgetSummary.scss'

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

const BudgetSummaryBlock = ({color}) => {

    const colors = setColorScheme(color)

    return (
        <div className='bs16'>

            <div 
                style={{ backgroundColor: colors[3] }}
                className='bs16__overall'
            >
                <h1 className='bs16__overall__text'>
                    Overall Budget 
                </h1>

                <div className='bs16__overall__value'>
                    <h1 
                        className='bs16__overall__value__text'
                    >
                        0$
                    </h1>
                </div>

            </div>

            <div 
                style={{ backgroundColor: colors[3] }}
                className='bs16__mid'
            >
                <h1 
                    className='bs16__mid__text'
                >
                    Leisure
                </h1>

                <div className='bs16__mid__value'>
                    <h1 className='bs16__mid__value__text'>0$</h1>
                </div>

            </div>

            <div 
                style={{ backgroundColor: colors[3] }}
                className='bs16__mid'
            >
                <h1 
                    className='bs16__mid__text'
                >
                    Transport
                </h1>

                <div className='bs16__mid__value'>
                    <h1 className='bs16__mid__value__text'>0$</h1>
                </div>

            </div>

            <div 
                style={{ backgroundColor: colors[3] }}
                className='bs16__savings'
            >
                <h1 
                    className='bs16__savings__text'
                >
                    Budgeting
                </h1>

                <div className='bs16__savings__value'>
                    <h1 
                        style={{ color: '#E87D42'}}
                        className='bs16__savings__value__label'
                    >
                        essential expenses
                    </h1>
                    <h1 className='bs16__savings__value__text'>0$</h1>
                </div>

                <div className='bs16__savings__value'>
                    <h1 
                        style={{ color: '#7F9B26'}}
                        className='bs16__savings__value__label'
                    >
                        possible savings
                    </h1>
                    <h1 className='bs16__savings__value__text'>0$</h1>
                </div>

            </div>

        </div> 
    )
}

export default BudgetSummaryBlock