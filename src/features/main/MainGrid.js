// react imports
import { useState, useEffect } from 'react';

// react-grid-layout imports
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// import styles
import '../../styles/features/MainGrid.scss'

const gridStyle = {
  width: '100%',
  height: '100%',
  maxHeight: '640px',
  maxWidth: '1100px',
};

function GridItems(items) {

  return items.map(item => {
    return (
      <div className='grid-items' key={item.id} data-grid={item.dataGrid}>
        {/* <div className='grid-items__header'>
          <label className='grid-items__header__label'>{item.name}</label>
        </div> */}
        
        <div className='grid-items__contents'>{item.graph}</div>
          
      </div>
    )
  })
}

const MainGrid = ({items, dashboard} ) => {

  const [refresh, setRefresh] = useState(false)

  // holy grail
  useEffect(() => {
    if (dashboard) {
      setRefresh(!refresh)
    }
  }, [dashboard])

  // pain
  const onLayoutChange = (layout) => {

    items.map(item => {
      const layoutItem = layout.find(layoutItem => layoutItem.i === item.id);

        const i = layoutItem.i
        
        layout[i - 1].w = item.dataGrid.w
        layout[i - 1].h = item.dataGrid.h
        layout[i - 1].x = item.dataGrid.x
        layout[i - 1].y = item.dataGrid.y

    });

  }
  
  return (
    <div style={gridStyle}>
      <GridLayout
        className="layout"
        key={refresh}
        cols={4}
        rowHeight={95.5}
        width={1100}
        compactType="vertical" // Ensure items are always compacted vertically
        maxRows={5}
        isResizable={false}
        isDraggable={false} // add this line to disable dragging
        onLayoutChange={onLayoutChange}
      >

        {GridItems(items)}
        {/* <button onClick={forceLayoutRefresh}>Force Layout Update</button> Add a button to trigger the layout update */}
      </GridLayout>
    </div>
  );
};

export default MainGrid