// react imports
import { useState, useEffect } from "react"

// import styles and constants
import '../../styles/features/Components.scss'
import { buildingBlocks } from "../../config"

// redux stuff
import { useSelector } from 'react-redux';

const getServiceIndex = (service) => {

    switch (service) {
      
        case 'finance':
  
            return 0
  
        case 'fitness':

            return 1
  
    };
  
}

const themes = ['earth', 'water'];

const Components = ({service, onAddItem}) => {

    const { currentThemeIndex } = useSelector((state) => state.color);
    const color = themes[currentThemeIndex]

    // console.log(test)
    // const color = 'earth'
    const [components, setComponents] = useState(buildingBlocks(color)[getServiceIndex(service)])

    // when current color changes
    useEffect(() => {
        if (color) {
            setComponents(buildingBlocks(color)[getServiceIndex(service)])
        }
    }, [color])

    return (
        <div className="blocks">
            {components.map(component => (
                <button className="blocks__component" key={component.id} onClick={() => onAddItem(component)}>
                    <div className="blocks__component__label">{component.label}</div>
                    <div className="blocks__component__img" style={{ backgroundImage: `url(${component.img})` }}></div>
                </button>
            ))}
        </div>
    )
}

export default Components