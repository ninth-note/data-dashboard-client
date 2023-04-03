// required react imports
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

// styles & icons
import '../../styles/features/BuildDashboard.scss'
import { MdColorLens } from 'react-icons/md';

// import the grid & components
import Grid from "./Grid";
import Components from "./Components";

// import modal
import Modal from 'react-modal';

// import auth
import useAuth from "../../hooks/useAuth";

// import dashboard API slice
import { useCreateDashboardMutation } from '../../app/api/dashboardsApiSlice';

// redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { tryRefresh } from '../../app/refresh'
import { nextColor } from '../../app/color'

const themes = [
    ['#C6D57E', '#D57E7E', '#A2CDCD', '#FFE1AF'],
    ['#B4E4FF', '#3E54AC', '#655DBB', '#BFACE2']
]

function packItems(items) {

    let packedItems = [];
  
    // for each item in currently built dashboard
    items.forEach(item => {
    
        const newItem = {
            root: item.root,
            name: item.name,
            dataGrid: item.dataGrid,
            color: item.color
        };
    
        packedItems.push(newItem);
    });
  
    return packedItems;
  }

const BuildDashboard = () => {

    const { id } = useAuth()

    // manage refresh when dashboard is created
    const dispatch = useDispatch();

    // initialise react router dom hooks
    const location = useLocation();
    const navigate = useNavigate();

    // using location hook search for the user's choice from '/new' and fetch it
    const props = JSON.parse(new URLSearchParams(location.search).get('userChoices'));

    const [createDashboard, {
        isLoading,
        isSuccess,
    }] = useCreateDashboardMutation()

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { currentThemeIndex } = useSelector((state) => state.color);
    const theme = themes[currentThemeIndex]
    const [values, setValues] = useState({
        user: '',
        title: props.dashboard,
        service: props.serviceName,
    });
    const [items, setItems] = useState([]);

    // when atleast 1 dashboard exists set current dashboard
    useEffect(() => {
        if (id) {
            setValues({ ...values, user: id });
        }
    }, [id])

    useEffect(() => {
        if (isSuccess) {
            dispatch(tryRefresh())
            navigate('/dashboards')
            setModalIsOpen(false);
        }
    }, [isSuccess])

    const onRemoveItem = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const onAddItem = (component) => {

        const size = 20

        if (items.length < size) {
            const allowed = Array.from({ length: size }, (_, index) => (index + 1).toString());
            const ids = []
            items.map((item, index) => { ids[index] = item.id })

            const giveId = allowed.find((current) => {
                if (!ids.includes(current)) { return true }
            })

            const id = giveId;
            const newItem = {
                id,
                root: component.id,
                name: component.data.name,
                dataGrid: component.data.dataGrid,
                color: component.data.color,
                graph: component.data.graph,
            };
        
            setItems([...items, newItem]);
        }

    };

    const onComplete = () => {

        if (items.length !== 0) {
            setModalIsOpen(true);
        }

    }
    
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    // makes sure that no duplicates or empty names occur
    const handleBadNames = async () => {

        const names = []
        const updatedItems = items.map((item, index) => {

            if (item.name === '' || item.name === item.root || names.includes(item.name)) {
                const newName = '(' + (index + 1) + ') ' + item.root
                return {...item, name: newName};
            }
            names[index] = item.name
            return item;

        });
        return updatedItems
    }
    
    const handleCreate = async (e) => {

        e.preventDefault()

        if (!isLoading) {

            // handle bad naming to prevent data setting issues in the future
            const structuredItems = await handleBadNames()

            // fetch the rest of the data required for creation
            const user = values.user
            const title = values.title
            const service = values.service
            const data = packItems(structuredItems)

            await createDashboard({ user, title, service, data })

        }
    }

    // const onClick

    return (
        <div className="build">

            <div className="build__header">

                <div className="build__header__title">
                    <h1 className="build__header__title__text">
                        {values.title}
                    </h1>
                </div>

                <button className="build__header__complete" onClick={onComplete}>
                    <h1 className="build__header__complete__text">
                        Complete
                    </h1>
                </button>

            </div>

            <div className="build__main">

                <div className="build__main__frame">

                    <div className="build__main__frame__grid"> 

                        <Grid items={items} onRemoveItem={onRemoveItem} setItems={setItems} />

                    </div>

                </div>

                <div className="build__main__components">

                    <div className="build__main__components__header">
                        Building Blocks
                    </div>

                    <div className="build__main__components__body">
                        
                        <Components service={values.service} onAddItem={onAddItem} />

                    </div>

                    <div className="build__main__components__footer">
                        <div className="build__main__components__footer__title">
                            <h5 className="build__main__components__footer__title__text">theme: </h5>
                        </div>

                        <div className="build__main__components__footer__theme">

                            <div className="build__main__components__footer__theme__palette">

                                <div 
                                    className="build__main__components__footer__theme__palette__color1"
                                    style={{ backgroundColor: theme[0] }}
                                ></div>

                                <div 
                                    className="build__main__components__footer__theme__palette__color2"
                                    style={{ backgroundColor: theme[1] }}
                                ></div>

                                <div 
                                    className="build__main__components__footer__theme__palette__color3"
                                    style={{ backgroundColor: theme[2] }}
                                ></div>

                                <div 
                                    className="build__main__components__footer__theme__palette__color4"
                                    style={{ backgroundColor: theme[3] }}
                                ></div>

                            </div>

                        </div>

                        <div className="build__main__components__footer__button">
                                <MdColorLens 
                                    className="build__main__components__footer__button__icon"
                                    onClick={() => dispatch(nextColor())}
                                />
                        </div>
                    </div>

                </div>

            </div>
            <Modal
                className="build__modal"
                appElement={document.getElementById('root')}
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
            >
                <h2 className="build__modal__title">
                    Do you wish to create <span style={{ color: 'rgb(154, 144, 193)' }}>
                        {values.title.substring(0, 15)}
                        {values.title.length > 15 && '...'}
                    </span> ?
                </h2>

                <div className="build__modal__buttons">
                    <button 
                        className="build__modal__buttons__close" 
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                    <button 
                        className="build__modal__buttons__proceed"
                        onClick={handleCreate}
                    >
                        Create
                    </button>
                </div>
                    
            </Modal>
        </div>
    )

}

export default BuildDashboard