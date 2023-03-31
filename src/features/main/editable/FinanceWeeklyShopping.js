// import React from 'react'

// const FinanceWeeklyShopping = () => {
//   return (
//     <div>FinanceWeeklyShopping</div>
//   )
// }

// export default FinanceWeeklyShopping

// react imports
import { useState, useEffect } from "react";

const FinanceWeeklyShopping = ({
  data, setData,
}) => {

  const [items, setItems] = useState(data.items)

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

    setData(data)

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