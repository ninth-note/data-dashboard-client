// required react imports
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// styles
import '../../styles/features/ChooseTemplate.scss'

// import smaller components
import NameTag from "../../components/small/NameTag";

// import auth
import useAuth from "../../hooks/useAuth";

// import dashboard API slice
import { useCreateDashboardMutation } from '../../app/api/dashboardsApiSlice';

// redux stuff
import { useDispatch } from 'react-redux';
import { tryRefresh } from '../../app/refresh'

const ChooseTemplate = () => {

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
    const [values] = useState({
        dashboard: props.dashboard,
        serviceName: props.service.name,
        serviceLabel: props.service.label,
    });

    useEffect(() => {
        if (isSuccess) {
            dispatch(tryRefresh())
            navigate('/dashboards')
            setModalIsOpen(false);
        }
    }, [isSuccess])

    const choices = [
        {
            id: 2,
            name: "first",
            label: "Template 1",
            img: props.service.templates.first.img,
            data: props.service.templates.first.data
        },
        {
            id: 3,
            name: "second",
            label: "Template 2",
            img: props.service.templates.second.img,
            data: props.service.templates.second.data
        },
    ]

    // handle the buttons being active
    const [activeButton, setActiveButton] = useState(null);

    const handleCustomClick = (e) => {
        setActiveButton(e.target.id); // set the clicked button as active
    }

    const handleContinue = () => {

        if (activeButton === 'custom') {
            navigate(`/new/custom?userChoices=${encodeURIComponent(JSON.stringify(values))}`);
        } 

        if (activeButton) {
            setModalIsOpen(true);
        }
        
    }
    
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }
    
    const handleProceed = async (e) => {

        e.preventDefault()

        if (!isLoading) {

            let choice = 0

            if (activeButton === 'Template 1') {
                choice = 0
            }
            if (activeButton === 'Template 2') {
                choice = 1
            }

            // fetch the rest of the data required for creation
            const user = id
            const title = values.dashboard
            const service = values.serviceName
            const data = choices[choice].data
            await createDashboard({ user, title, service, data })

        }

    }

    const current = (
        <div className="templates">

            <div className="templates__frame">

                <div className="templates__frame__header"> 

                    <div className="templates__frame__header__title">
                        <h1 className="templates__frame__header__title__text">
                            {values.dashboard}
                        </h1>
                    </div>

                    <div className="templates__frame__header__user">
                        <NameTag />
                    </div>
                </div>

                <div className="templates__frame__form">

                    <div className="templates__frame__form__header">
                        <div className="templates__frame__form__header__line"></div>
                        <h1 className="templates__frame__form__header__title">
                            Choose Dashboard Template
                        </h1>
                    </div>

                    <div className="templates__frame__form__items">

                        <div className="templates__frame__form__items__existing">

                            <h1 className="templates__frame__form__items__existing__title">Existing Templates</h1>

                            <button 
                                id="Template 1"
                                className="templates__frame__form__items__existing__button1"
                                style={{ 
                                    borderColor: activeButton === 'Template 1' ? 'rgb(124, 101, 217, 1)' : 'rgb(255, 255, 255)',
                                    color: activeButton === 'Template 1' ? 'rgb(124, 101, 217, 0.7)' : 'rgba(67, 67, 67, 0.9)',
                                    background: activeButton === 'Template 1' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.5)',
                                }}
                                onClick={handleCustomClick}
                            >
                                <img
                                    className="templates__frame__form__items__existing__button1__img"
                                    src={choices[0].img}
                                ></img>
                            </button>
                            <button 
                                id="Template 2"
                                className="templates__frame__form__items__existing__button2"
                                style={{ 
                                    borderColor: activeButton === 'Template 2' ? 'rgb(124, 101, 217, 1)' : 'rgb(255, 255, 255)',
                                    color: activeButton === 'Template 2' ? 'rgb(124, 101, 217, 0.7)' : 'rgba(67, 67, 67, 0.9)',
                                    background: activeButton === 'Template 2' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.5)',
                                }}
                                onClick={handleCustomClick}
                            >
                                <img
                                    className="templates__frame__form__items__existing__button2__img"
                                    src={choices[1].img}
                                ></img>
                            </button>
                        </div>

                        <div className="templates__frame__form__items__vertical">
                            <div className="templates__frame__form__items__vertical__line"></div>
                        </div>

                        <div className="templates__frame__form__items__custom">

                            <h1 className="templates__frame__form__items__custom__title">Custom</h1>

                            <button
                                id="custom"
                                className="templates__frame__form__items__custom__button"
                                style={{ 
                                    borderColor: activeButton === 'custom' ? 'rgb(124, 101, 217, 1)' : 'rgb(255, 255, 255)',
                                    color: activeButton === 'custom' ? 'rgb(124, 101, 217, 0.7)' : 'rgba(67, 67, 67, 0.9)',
                                    background: activeButton === 'custom' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.5)',
                                }}
                                onClick={handleCustomClick}
                            >
                                Build Template
                            </button>

                            <p className="templates__frame__form__items__custom__info">Create a custom template, if the existing do not meet your requirements</p>

                        </div>

                    </div>

                    <div className="templates__frame__form__footer">
                        <h1 className="templates__frame__form__footer__title">
                            Service:
                        </h1>
                        <h1 className="templates__frame__form__footer__service">
                            {values.serviceLabel}
                        </h1>
                    </div>
                
                </div>

                <button className="templates__frame__button"
                    onClick={handleContinue}
                >
                    continue
                </button>
                <Modal
                    className="templates__frame__modal"
                    appElement={document.getElementById('root')}
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Proceed modal"
                >
                    <h2 className="templates__frame__modal__title">
                        Do you wish to use <span style={{ color: 'rgb(154, 144, 193)' }}>{activeButton}</span> for your new dashboard?
                    </h2>

                    <div className="templates__frame__modal__buttons">
                        <button 
                            className="templates__frame__modal__buttons__close" 
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                        <button 
                            className="templates__frame__modal__buttons__proceed"
                            onClick={handleProceed}
                        >
                            Create
                        </button>
                    </div>
                    
                </Modal>

            </div>

        </div>
    )

    return current
}

export default ChooseTemplate