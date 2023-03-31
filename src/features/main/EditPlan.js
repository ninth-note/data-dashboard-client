// react & navigation imports
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

// styles, icons and lesser components
import '../../styles/features/EditPlan.scss'
import { RiDeleteBin5Fill  } from 'react-icons/ri'
import NameTag from '../../components/small/NameTag'

// import editable forms
import FinanceSummary from './editable/FinanceSummary';
import FinanceWeeklyShopping from './editable/FinanceWeeklyShopping';

// import plan API slice
import { useUpdatePlanMutation, useDeletePlanMutation } from '../../app/api/plansApiSlice';

const EditPlan = () => {

    const [updatePlan, {
        isLoading,
        isSuccess,
        // isError,
        // error
    }] = useUpdatePlanMutation()

    const [deletePlan, {
        isSuccess: successfullyDeleted,
    }] = useDeletePlanMutation()

    const location = useLocation()
    const navigate = useNavigate()

    // using location hook search for the user's choice from '/new' and fetch it
    const plan = JSON.parse(new URLSearchParams(location.search).get('userChoices'));

    const [title, setTitle] = useState(plan.title)
    const [active, setActive] = useState(plan.active)
    const [data, setData] = useState(plan.data)

    useEffect(() => {
        if (isSuccess || successfullyDeleted) {
            navigate('/dashboards/plans')
        }
    }, [isSuccess, successfullyDeleted, navigate])

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    
    const handleStatusChange = (event) => {
    setActive(event.target.checked)
    }

    const onEdit = async (e) => {

        e.preventDefault()

        if (!isLoading) {

            // ready the data
            const id = plan._id
            const dashboard = plan.dashboard
            const service = plan.service
            const focus = plan.focus
            const graph = plan.graph

            await updatePlan({ id, dashboard, title, service, focus, active, graph, data })

        }
    }

    const onDelete = async () => {

        const id = plan._id

        await deletePlan({id})
    }

  return (
        <div className="edit-plan">

            <div className="edit-plan__outer">

                <div className="edit-plan__outer__inner">

                    <div className="edit-plan__outer__inner__header">
                        <div className="edit-plan__outer__inner__header__user">
                            <NameTag />
                        </div>
                    </div>

                    <div className="edit-plan__outer__inner__body">

                        <div className="edit-plan__outer__inner__body__header">
                            <h1 className="edit-plan__outer__inner__body__header__title">Edit Plan</h1>
                            <RiDeleteBin5Fill
                                style={{ filter: 'drop-shadow(0.2vh 0.25vh 0.4vh rgba(0, 0, 0, 0.4))' }}
                                className="edit-plan__outer__inner__body__header__icon"
                                onClick={onDelete}
                            />
                        </div>

                        <form className="edit-plan__outer__inner__body__form" onSubmit={onEdit}>

                            <button className='edit-plan__outer__inner__body__form__button'>Update</button>

                            <div className='edit-plan__outer__inner__body__form__title'>      
                                <label className='edit-plan__outer__inner__body__form__title__label'>Plan Name:</label>
                                <input
                                    className='edit-plan__outer__inner__body__form__title__box'
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='edit-plan__outer__inner__body__form__status'>
                                <label className='edit-plan__outer__inner__body__form__status__label'>Status (Active/Inactive):</label>
                                <input
                                    className='edit-plan__outer__inner__body__form__status__box'
                                    type="checkbox"
                                    id="active"
                                    name="active"
                                    checked={active}
                                    onChange={handleStatusChange}
                                />
                            </div>

                            <div className='edit-plan__outer__inner__body__form__contents'>

                                {
                                    data.id === 'fs1' ? <FinanceSummary data={data} setData={setData} /> :
                                    data.id === 'fws1' ? <FinanceWeeklyShopping data={data} setData={setData} /> :
                                    null
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPlan