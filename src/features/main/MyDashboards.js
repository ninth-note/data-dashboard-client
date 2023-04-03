// React Imports
import { useState, useEffect, useContext } from 'react';

// navigation imports
import { useNavigate } from 'react-router-dom';

// import styles
import '../../styles/features/MyDashboards.scss'

import NameTag from '../../components/small/NameTag';

// import icons
import { GiCobweb } from 'react-icons/gi';
import { FaChevronLeft, FaChevronRight  } from 'react-icons/fa';

// Import Grid
import MainGrid from './MainGrid';

// import constants
import { mainBlocks } from '../../config';

// import the DashContext to fetch the required data from DashLayout
import DashContext from '../../components/layout/dash-layout/DashContext';

// import plans related to this dashboard
import { useGetPlansByDashboardIdQuery } from '../../app/api/plansApiSlice'

const basic = [ { name: 'default', value: 1 }, ];

function unpackItems(current, setItems, data) {
    
    let newItems = [];
  
    // for each item in the current dashboard
    current.data.forEach(item => {

        const id = String(newItems.length + 1);
        const root = item.root;
        const name = item.name;
        const color = item.color;
        let graph = null;

        let content = []

        if (data !== basic) {
            data.map(object => {
    
                if (object.graph === item.name && object.active) {
                    // console.log(object.active)
                    content = object.data
                }
    
            })
        }

        // test to see if data is actually passed
        // console.log(content)
    
        // match the blocks by root and assign
        mainBlocks(content, color).forEach((block) => {
            if (block.root === root) {
            graph = block.graph;
            }
        });
    
        const newItem = {
            id,
            root,
            name,
            dataGrid: item.dataGrid,
            graph,
        };
    
        newItems.push(newItem);
      
    });

    setItems(newItems)
}

const MyDashboards = () => {
    
    const { 
        dashboards, 
        current, 
        isSuccess, 
        index, 
        setIndex 
    } = useContext(DashContext);

    const { 
        data,
        isLoading, 
        isSuccess: successfullyFetchedPlans,
        error,
    } = useGetPlansByDashboardIdQuery(current?._id);

    // required for navigating
    const navigate = useNavigate();

    // holds the unpacked items to be displayed
    const [items, setItems] = useState([])
    const [dataset, setDataset] = useState([])

    // when current dashboard changes, update
    useEffect(() => {
        if (current.length !== 0 && dataset) {
            unpackItems(current, setItems, dataset)
        }
    }, [current, dataset, successfullyFetchedPlans])

     // when current dashboard changes, update
     useEffect(() => {
        if (current.length !== 0 && data) {
            setDataset(data)
            // console.log(data)
        }
    }, [current, data, successfullyFetchedPlans])

    // for development purposes
    // useEffect(() => {
    //     if (error) {
    //         console.log('An error occurred while fetching plans:', error)
    //     } else if (isLoading) {
    //         console.log('Loading plans...')
    //     } else if (successfullyFetchedPlans) {
    //         console.log('Success...')
    //         console.log(data)
    //     }
    // }, [data, error, isLoading]);

    // handle the carousel buttons
    const onClickLeft = () => {
        if (dashboards.length > 1) {
            if (index > 0) {
                setIndex(index - 1);
            } else if (index === 0) {
                setIndex(dashboards.length - 1);
            }
        }
    }

    const onClickRight = () => {
        if (dashboards.length > 1) {
            if (index < (dashboards.length - 1)) {
                setIndex(index + 1);
            } else if (index === (dashboards.length - 1)) {
                setIndex(0);
            }
        }
    }

    // when no dashboards exist forward user to create new dashboard
    const onCreate = () => {
        navigate('/new')
    }

    return (
        <div className="dashboards">

            <div className="dashboards__outer">

                <button className='dashboards__outer__left' onClick={onClickLeft}><FaChevronLeft /></button>

                <div className="dashboards__outer__inner">

                    <div className="dashboards__outer__inner__header"> 

                        <div className="dashboards__outer__inner__header__title">
                            <h1 className="dashboards__outer__inner__header__title__text">
                                {isSuccess? current.title : <p>...</p>}
                            </h1>
                        </div>

                        <div className="dashboards__outer__inner__header__user">
                            <NameTag />
                        </div>
                    </div>

                    <div className="dashboards__outer__inner__body">

                        {isSuccess? (
                            <MainGrid
                                dashboard={current._id}
                                items={items}
                            />
                        ) : (
                        
                            <div className="dashboards__outer__inner__body__empty">

                                <div
                                    className="dashboards__outer__inner__body__empty__icon"
                                >
                                    <GiCobweb />
                                </div>
                                
                                <div className="dashboards__outer__inner__body__empty__contents">

                                    <h1 className="dashboards__outer__inner__body__empty__contents__text">
                                        No Dashboards Found
                                    </h1>
                                    <button 
                                        className="dashboards__outer__inner__body__empty__contents__button"
                                        onClick={onCreate}
                                    >
                                        Create your first Dashboard
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>

                </div>

                <button className='dashboards__outer__right' onClick={onClickRight}><FaChevronRight /></button>

            </div>

        </div>
    )
};

export default MyDashboards;