// react imports
import { useState, useEffect } from "react";

const FinanceWeeklyShopping = ({
  active, handleStatusChange,
  graph, handleGraphChange, graphList, graphs,
  setFocusData,
}) => {

  const [items, setItems] = useState([])

  // when the fields are all filled out
  useEffect(() => {
    if (items) {
      process()
    }
  }, [items])

  const process = () => {

    // pack data
    const data = {
      id: 'fws1',
      items,
    }

    setFocusData(data)

  }

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        name: '',
        value: '',
        date: new Date().getDay(),
      },
    ]);
  };

  // handle the items changing
  const handleItemChange = (event, index) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  };

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

      <div className='focus__list'>
        <label className='focus__list__label'>Shopping Items:</label>
        <button className='focus__list__button' onClick={handleAddItem}>Add Item</button>
        {items.map((item, index) => (
          <div key={index}>
            <div className='focus__list__item'>
              <input
                className='focus__list__item__box'
                type="text"
                name="name"
                value={item.name}
                onChange={(event) => handleItemChange(event, index)}
                placeholder="item name..."
                autoComplete="off"
                required
              />
              <input
                className='focus__list__item__box'
                type="number"
                name="value"
                value={item.value}
                onChange={(event) => handleItemChange(event, index)}
                placeholder="price..."
                autoComplete="off"
                required
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default FinanceWeeklyShopping