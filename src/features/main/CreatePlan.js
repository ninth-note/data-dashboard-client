// react & react-router-dom imports
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// import styles & icons & less significant components
import '../../styles/features/CreatePlan.scss'
import { FaChevronLeft, FaChevronRight  } from 'react-icons/fa';
import NameTag from '../../components/small/NameTag';

// forms
import FinanceForm from './FinanceForm';

// import the DashContext to fetch the required data from DashLayout
import DashContext from '../../components/layout/dash-layout/DashContext';

// import modal
import Modal from 'react-modal';

// redux stuff
import { useDispatch } from 'react-redux';
import { tryRefresh } from '../../app/refresh'

// import plan API slice
import { useCreatePlanMutation } from '../../app/api/plansApiSlice';

function checkBlocks(current, setBlocks) {
    
    let existingBlocks = [];
  
    // for each item in the current dashboard
    current.data.forEach(item => {

        const id = String(existingBlocks.length + 1);
        const root = item.root;
        const name = item.name;
    
        const summary = {
            id,
            root,
            name,
        };
    
        existingBlocks.push(summary);
      
    });

    setBlocks(existingBlocks)
}

const CreatePlan = () => {

    const { 
        dashboards, 
        current, 
        isSuccess, 
        index, 
        setIndex 
    } = useContext(DashContext);

    const [createPlan, {
        isLoading,
        isSuccess: planCreated,
    }] = useCreatePlanMutation()

    // manage refresh when plan is created
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // modal state, opens only when form is complet to confirm plan creation
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // holds the final data that will
    const [plan, setPlan] = useState({
        title: '',
    })

    // holds the unpacked items to be displayed
    const [blocks, setBlocks] = useState([])

    // when current dashboard changes, update
    useEffect(() => {
        if (current.length !== 0) {
            checkBlocks(current, setBlocks)
        }
    }, [current])

    // check if form was complete
    useEffect(() => {
        if (plan.length !== 0 && plan.title !== '') {
            setModalIsOpen(true);
        }
    }, [plan])

    useEffect(() => {
        if (planCreated) {
            dispatch(tryRefresh())
            navigate('/dashboards')
            setModalIsOpen(false);
        }
    }, [planCreated])

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

    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const handleConfirm = async (e) => {

        e.preventDefault()

        if (!isLoading) {

            // fetch the rest of the data required for creation
            const dashboard = plan.dashboard
            const title = plan.title
            const service = plan.service
            const focus = plan.focus
            const active = plan.active
            const graph = plan.graph
            const data = plan.data

            await createPlan({ dashboard, title, service, focus, active, graph, data })

        }
    }

    return (
        <div className="create-plan">

            <div className="create-plan__outer">

                <button className='create-plan__outer__left' onClick={onClickLeft}><FaChevronLeft /></button>

                <div className="create-plan__outer__inner">

                    <div className="create-plan__outer__inner__header"> 

                        <div className="create-plan__outer__inner__header__title">
                            <h1 className="create-plan__outer__inner__header__title__text">
                                {isSuccess? current.title : <p>...</p>}
                            </h1>
                        </div>

                        <div className="create-plan__outer__inner__header__user">
                            <NameTag />
                        </div>
                    </div>

                    <div className="create-plan__outer__inner__body">

                        <div className="create-plan__outer__inner__body__header">
                            <h1 className="create-plan__outer__inner__body__header__title">Create Plan</h1>
                        </div>

                        <div 
                            style={{ backgroundColor: (!isSuccess)? 'transparent' : ''}}
                            className="create-plan__outer__inner__body__form"
                        >

                            { !isSuccess? (
                                <h1 style={{
                                    marginTop: '247px'
                                }}>...</h1>
                            ) : (
                                (current.service === 'finance')? (
                                    <FinanceForm 
                                        current={current}
                                        setPlan={setPlan}
                                        blocks={blocks}
                                    />
                                ) : (
                                    <h1>Fitness</h1>
                                )
                            )}

                        </div>

                    </div>

                </div>

                <button className='create-plan__outer__right' onClick={onClickRight}><FaChevronRight /></button>

            </div>

            <Modal
                className="create-plan__modal"
                appElement={document.getElementById('root')}
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
            >
                <h2 className="create-plan__modal__title">
                    Do you wish to create <span style={{ color: 'rgb(154, 144, 193)' }}>
                        {plan.title.substring(0, 12)}
                        {plan.title.length > 12 && '...'} 
        
                        </span>?
                </h2>

                <div className="create-plan__modal__buttons">
                    <button 
                        className="create-plan__modal__buttons__close" 
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                    <button 
                        className="create-plan__modal__buttons__proceed"
                        onClick={handleConfirm}
                    >
                        Create
                    </button>
                </div>
                    
            </Modal>

        </div>
    )
};

export default CreatePlan;