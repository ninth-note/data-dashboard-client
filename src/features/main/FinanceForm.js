// react imports
import { useState, useEffect } from 'react';

// import styles
import '../../styles/features/FinanceForm.scss'

// import plan focuses
import FinanceSummary from './service/finance-focus/FinanceSummary';
import FinanceWeeklyShopping from './service/finance-focus/FinanceWeeklyShopping';

const focusTypes = [

  {
    id: '1',
    name: 'summary',
    label: 'Budget Summary',
    entitled: ['P12', 'P24', 'BS16'],
  },
  {
    id: '2',
    name: 'weekly-shopping',
    label: 'Weekly Shopping',
    entitled: ['P12', 'P24', 'B34', 'L34', 'A34', 'SS22'],
  },

]

const FinanceForm = ({ current, blocks, setPlan }) => {

  const [values, setValues] = useState({
    name: '',
    active: false,
  });
  const [focusData, setFocusData] = useState([])

  const [option, setOption] = useState('')
  const [available, setAvailable] = useState([])

  const [graph, setGraph] = useState('')
  const [graphList, setGraphList] = useState([])

  

  // when dashboard changes and different blocks are available
  useEffect(() => {
    if (blocks.length !== 0) {
      checkAvailable(focusTypes, blocks)
    }
  }, [blocks])

  // when option changes and different blocks are available
  useEffect(() => {
    if (option !== '') {
      checkUsable()
    }
  }, [option])

  // check if atleast 1 focus required graph exists
  const checkAvailable = () => {

    const found = []

    // Create an array of unique block root types
    const uniqueBlockRoots = [...new Set(blocks.map(block => block.root))];

    focusTypes.map(focusType => { 

      if (uniqueBlockRoots.length !== 0) {

        uniqueBlockRoots.map((blockRoot) => {

          if (focusType.entitled.includes(blockRoot) && !found.includes(focusType)) { 
            found.push(focusType);
          };

        })
      }
    })
    setAvailable(found)
  }

  // find the specific graph names available for current plan focus on the dashboard that can be used to display this plan 
  const checkUsable = () => {

    let currentEntitled = null
    const canUse = []
    
    focusTypes.map((current) => {

      if (current.name === option) {
        currentEntitled = current.entitled
      }

    })

    if (currentEntitled.length !== 0) {
      // console.log(currentEntitled)
      blocks.map((block) => {

        if ((currentEntitled.includes(block.root))) {

          canUse.push(block.name)

        }

      })
    }

    setGraphList(canUse)

  }

  // handle plan focus options
  const options = available.map((current) => {
    return (
      <option
          
          key={current.id}
          value={current.name}

      > 
          {current.label}
      </option >
    )
  })

  // handle what graph will be used to display the data
  const graphs = graphList.map((current) => {
    return (
      <option
          
          key={current}
          value={current}

      > 
          {current}
      </option >
    )
  })

  const handleNameChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  const handleStatusChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked })
  }

  const handleGraphChange = (event) => {
    setGraph(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      dashboard: current._id,
      title: values.name,
      service: current.service,
      focus: option,
      active: values.active,
      graph: graph,
      data: focusData,
    };
    
    setPlan(formData);
  };
  
  const renderFormFields = () => {
    switch (option) {
      
      case 'summary':
        return (
          <FinanceSummary 
            active={values.active}
            handleStatusChange={handleStatusChange}
            graph={graph}
            handleGraphChange={handleGraphChange}
            graphList={graphList}
            graphs={graphs}
            setFocusData={setFocusData}
          />
        )

      case 'weekly-shopping':
        return (
          <FinanceWeeklyShopping
            active={values.active}
            handleStatusChange={handleStatusChange}
            graph={graph}
            handleGraphChange={handleGraphChange}
            graphList={graphList}
            graphs={graphs}
            setFocusData={setFocusData}
          />
        )
      default:
        return null;
    };
  }

  return (
    <form className='finance-form' onSubmit={handleSubmit}>
      
      <div className='finance-form__plan'>
        <label className='finance-form__plan__label'>Plan Name:</label>
        <input
          className='finance-form__plan__box'
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleNameChange}
          placeholder="name your plan..."
          maxLength="30"
          autoComplete="off"
          required
        />
      </div>

      <div className='finance-form__selector'>
        <label className='finance-form__selector__label'>Select your plans focus:</label>
        <select
          className='finance-form__selector__box'
          id="option" 
          name="option" 
          value={option} 
          onChange={handleOptionChange}
          required
        >
          <option value="">________________________</option>
          {(available.length !== 0) && options}
        </select>
      </div>

      <div className='finance-form__contents'>
        {renderFormFields()}
      </div>

      <button className='finance-form__button' type="submit">Submit</button>
    </form>
  );
}

export default FinanceForm;