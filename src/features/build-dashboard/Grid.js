// react-grid-layout imports
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// import styles
import '../../styles/features/Grid.scss'

const gridStyle = {
  width: '100%',
  height: '100%',
  maxHeight: '680px',
  maxWidth: '1100px',
};

function GridItems(items, onRemove, onChangeName) {

  return items.map(item => {
    return (
      <div className='grid-items' key={item.id} data-grid={{...item.dataGrid}}>
        <div className='grid-items__header'>
          <button className='grid-items__header__button' onClick={() => onRemove(item.id)}>
            <h4 className='grid-items__header__button__text'>x</h4>  
          </button>
          <label className='grid-items__header__label'>
            
          <input
            className='focus__list__item__box'
            type="text"
            name="name"
            value={item.name}
            onChange={(event) => onChangeName(item.id, event.target.value)}
            autoComplete="off"
            required
          />

          {/* <input
            className='focus__list__item__box'
            type="range"
            name="color"
            value={item.name}
            onChange={(event) => onChangeName(item.id, event.target.value)}
            autoComplete="off"
            required
          /> */}

          </label>
        </div>
        
        <div className='grid-items__contents'>{item.graph}</div>
          
      </div>
    )
  })
}

const Grid = ({items, onRemoveItem, setItems}) => {

  const onChangeName = (itemId, newName) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return {...item, name: newName};
      }
      return item;
    });
    setItems(updatedItems);

  };

  const onLayoutChange = (layout) => {
    // update the dataGrid property of each item with the new layout
    const updatedItems = items.map(item => {
      const layoutItem = layout.find(layoutItem => layoutItem.i === item.id);

      return {
        ...item,
        dataGrid: {
          ...item.dataGrid,
          x: layoutItem.x,
          y: layoutItem.y,
        },
      };
    });

    setItems(updatedItems);
  }

  return (
    <div style={gridStyle}>
      <GridLayout
        className="layout"
        cols={4}
        rowHeight={100}
        width={1100}
        compactType="vertical" // Ensure items are always compacted vertically
        maxRows={5}
        isResizable={false}
        onLayoutChange={onLayoutChange}
      >

        {GridItems(items, onRemoveItem, onChangeName)}

      </GridLayout>
    </div>
  );
};

export default Grid
