// react imports & navigation
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// import styles and icons
import '../../styles/features/Plan.scss'
import { AiOutlineEdit } from 'react-icons/ai'
import { CgMoreVertical } from 'react-icons/cg'
import { CgClose } from 'react-icons/cg'

// import modal
import Modal from 'react-modal';

const Plan = ({ plan }) => {
    // const plan = useSelector(state => selectPlanById(state, planId))

    const [showMore, setShowMore] = useState(false);

    const navigate = useNavigate()

    // const id = plan._id
    const title = plan.title
    const graph = plan.graph
    const active = plan.active

    const showMoreOpen = () => {
        setShowMore(true)
    }

    const showMoreClose = () => {
        setShowMore(false)
    }

    if (plan) {
        
        const handleEdit = () => navigate(`/dashboards/edit-plan?userChoices=${encodeURIComponent(JSON.stringify(plan))}`)

        return (
            <div className="plan-row">

                <div className='plan-row__more'>
                    <h1 className='plan-row__more__text'>
                        <CgMoreVertical onClick={showMoreOpen}/>
                    </h1>
                </div>

                <div className='plan-row__title'>

                    <h1 className='plan-row__title__text'>
                        
                        <div>
                            {title.substring(0, 12)}
                            {title.length > 12 && "..."}
                        </div>
                        
                    </h1>

                </div>

                <div className='plan-row__graph'>

                    <h1 className='plan-row__graph__text'>
                        
                        
                        <div>
                            {graph.substring(0, 12)}
                            {graph.length > 12 && '...'}
                        </div>
                        
                    </h1>

                </div>

                <div className='plan-row__status'>

                    <h1 
                        style={{ color: active ? 'rgb(80, 158, 2)' : 'rgb(219, 75, 14)' }}
                        className='plan-row__status__text'
                    >
                        {active? 'Active' : 'Inactive'}
                    </h1>

                </div>

                <div className='plan-row__button'>
                    <button
                        className="plan-row__button__icon"
                        onClick={handleEdit}
                    >
                        <h1 
                            className="plan-row__button__icon__text">
                            <AiOutlineEdit style={{ filter: 'drop-shadow(0.2vh 0.25vh 0.4vh rgba(0, 0, 0, 0.4))' }}/>
                        </h1>
                    </button>
                </div>

                <Modal
                    className="plan-row__modal"
                    overlayClassName="modal-overlay"
                    appElement={document.getElementById('root')}
                    isOpen={showMore}
                >

                    <div className="plan-row__modal">

                    <div className="plan-row__modal__header">

                        <h1 className="plan-row__modal__header__title">More Info</h1>
                        <button 
                        className="plan-row__modal__header__close" 
                        onClick={showMoreClose}
                        >
                        <div 
                            style={{ filter: 'drop-shadow(0.2vh 0.25vh 0.4vh rgba(0, 0, 0, 0.4))' }}
                            
                        >
                            <CgClose className="plan-row__modal__header__close__icon" />
                        </div>
                        </button>
                        
                    </div>

                    <div className="plan-row__modal__info">

                        <div className="plan-row__modal__info__plan">

                            <h1 className="plan-row__modal__info__plan__title">
                                Plan name:
                            </h1>

                            <h1 className="plan-row__modal__info__plan__value">
                                {title.substring(0, 21)}
                                {title.length > 21 && "..."}
                            </h1>

                        </div>

                        <div className="plan-row__modal__info__graph">

                            <h1 className="plan-row__modal__info__graph__title">
                                Graph used:
                            </h1>

                            <h1 className="plan-row__modal__info__graph__value">
                                <div>
                                    {graph.substring(0, 21)}
                                    {graph.length > 21 && '...'}
                                </div>
                            </h1>

                        </div>

                        <div className="plan-row__modal__info__status">

                            <h1 className="plan-row__modal__info__status__title">
                                Status:
                            </h1>

                            <div 
                                style={{ color: active ? 'rgba(118, 217, 19)' : 'rgb(219, 75, 14)' }}
                                className="plan-row__modal__info__status__value"
                            >
                                {active? 'Active' : 'Inactive'}
                            </div>

                        </div>

                    </div>

                    </div>
                </Modal>
            </div>
        )

    } else return null
}

export default Plan;