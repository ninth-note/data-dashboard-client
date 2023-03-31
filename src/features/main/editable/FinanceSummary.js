// react imports
import { useState, useEffect } from "react";

const FinanceSummary = ({
  data, setData,
}) => {

  const [availableBudget, setAvailableBudget] = useState(0)
  const [collected, setCollected] = useState(data)

  // when the fields are all filled out
  useEffect(() => {
    if ((collected.budget !== '' || collected.budget !== 0) && collected.essentialExpenses !== '') {
      process()
    }

  }, [collected])

  // when the budget and essential expenses are provided figure out what is left
  useEffect(() => {
    if (collected.budget !== '' && collected.essentialExpenses !== '') { 

        if (collected.budget === 0 || (parseInt(collected.essentialExpenses) > parseInt(collected.budget))) {
            setAvailableBudget(0)
            setCollected(prevState => ({
                ...prevState,
                leisure: 0,
                transport: 0,
                savings: 0,
            }))
        }

        if (collected.budget > 0 && (parseInt(collected.essentialExpenses) < parseInt(collected.budget))) {
            let available = collected.budget - collected.essentialExpenses
            setAvailableBudget(available)
        }
        
      
    } else {
        setAvailableBudget(0)
        setCollected(prevState => ({
            ...prevState,
            leisure: 0,
            transport: 0,
            savings: 0,
        }))
    }

  }, [collected.budget, collected.essentialExpenses])

  // make sure to update the leisure, transport, savings ratio
  useEffect(() => {
    if (collected.leisure !== '' && collected.transport !== '' && availableBudget !== '') { 
      let saved = availableBudget - collected.leisure - collected.transport
      setCollected(prevState => ({
        ...prevState,
        savings: saved,
      }))
    }

  }, [collected.leisure, collected.transport, availableBudget])

  const process = () => {

    // set the updated data form newly collected data
    setData(collected)

  }

  const handleFieldChange = (event) => {
    setCollected({ ...collected, [event.target.name]: event.target.value })
  }

  return (
    <div className='focus'>

      <div className='focus__item'>
        <label className='focus__item__label'>Overall Budget:</label>
        <input 
          className='focus__item__box'
          type="number"
          id="budget"
          name="budget"
          value={collected.budget}
          min="1"
          onChange={handleFieldChange}
          placeholder="budget"
          autoComplete="off"
          required
        />
      </div>

      <div className='focus__item'>
        <label className='focus__item__label'>Essential Expenses:</label>
        <input 
          className='focus__item__box'
          type="number"
          id="essentialExpenses"
          name="essentialExpenses"
          value={collected.essentialExpenses}
          min="0"
          max={collected.budget - (collected.budget * 0.01)}
          onChange={handleFieldChange}
          placeholder="what are the essential expenses?"
          autoComplete="off"
          required
        />
      </div>

      <div className='focus__item'>
        <label className='focus__item__label'>
          Leisure: {(collected.leisure !== '' && availableBudget)? ((collected.leisure / availableBudget) * 100).toFixed()  : 0}%
          </label>
        <input 
          className='focus__item__box'
          type="range"
          id="leisure"
          name="leisure"
          value={collected.leisure}
          min="0"
          max={availableBudget? (availableBudget - collected.transport) : 0}
          step="1"
          onChange={handleFieldChange}
        />
      </div>

      <div className='focus__item'>
        <label className='focus__item__label'>
          Transport {(collected.transport !== '' && availableBudget)? ((collected.transport / availableBudget) * 100).toFixed()  : 0}%
        </label>
        <input 
          className='focus__item__box'
          type="range"
          id="transport"
          name="transport"
          value={collected.transport}
          min="0"
          max={availableBudget? (availableBudget - collected.leisure) : 0}
          step="1"
          onChange={handleFieldChange}
        />
      </div>

      <div className='focus__item'>
        <label className='focus__item__label'>
          Savings: {(collected.savings !== '' && availableBudget)? ((collected.savings / availableBudget) * 100).toFixed()  : 0}%
        </label>
        <input 
          className='focus__item__box'
          type="range"
          id="savings"
          name="savings"
          min="0"
          value={collected.savings}
          max={availableBudget? availableBudget : 0}
          disabled
        />
      </div>

    </div>
  );
}

export default FinanceSummary