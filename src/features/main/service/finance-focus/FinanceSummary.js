// react imports
import { useState, useEffect } from "react";

const FinanceSummary = ({
  active, handleStatusChange,
  graph, handleGraphChange, graphList, graphs,
  setFocusData,
}) => {

  const [availableBudget, setAvailableBudget] = useState(0)
  const [collected, setCollected] = useState({
    
    budget: '',
    essentialExpenses: '',
    leisure: '',
    transport: '',
    savings: '',

  })

  // when the fields are all filled out
  useEffect(() => {
    if (collected.budget !== '' && collected.essentialExpenses !== '' && collected.savings !== '') {
      process()
    }

  }, [collected])

  // when the budget and essential expenses are provided figure out what is left
  useEffect(() => {
    if (collected.budget !== '' && collected.essentialExpenses !== '') { 

      let available = collected.budget - collected.essentialExpenses
      setAvailableBudget(available)
      setCollected(prevState => ({
        ...prevState,
        leisure: 0,
        transport: 0,
        savings: available,
      }))
    }

  }, [collected.budget, collected.essentialExpenses])

  // make sure to update the leisure, transport, savings ratio
  useEffect(() => {
    if (collected.leisure !== '' && collected.transport !== '') { 
      let saved = availableBudget - collected.leisure - collected.transport
      setCollected(prevState => ({
        ...prevState,
        savings: saved,
      }))
    }

  }, [collected.leisure, collected.transport])

  const process = () => {

    // pack data
    const data = {
      id: 'fs1',
      budget: collected.budget,
      essentialExpenses: collected.essentialExpenses,
      leisure: collected.leisure,
      transport: collected.transport,
      savings: collected.savings,
    }

    // set the finance form data
    setFocusData(data)

  }

  const handleFieldChange = (event) => {
    setCollected({ ...collected, [event.target.name]: event.target.value })
  }

  return (
    <div className='focus'>

      <div className='focus__item'>
        <label className='focus__item__label'>Status (Active/Inactive):</label>
        <input 
          className='focus__item__box'
          type="checkbox"
          id="active"
          name="active"
          checked={active}
          onChange={handleStatusChange}
        />
      </div>

      <div className='focus__item'>
        <label className='focus__item__label'>Display with:</label>
        <select
          className='focus__item__box'
          id="graph" 
          name="graph" 
          value={graph} 
          onChange={handleGraphChange}
          required
        >
          <option value="">________________________</option>
          {(graphList.length !== 0) && graphs}
        </select>
      </div>

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
          min="1"
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
          value={collected.savings}
          max={availableBudget? availableBudget : 0}
          disabled
        />
      </div>

    </div>
  );
}

export default FinanceSummary