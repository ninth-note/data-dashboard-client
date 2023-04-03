// react and navigation imports
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// import styles and icons
import '../../styles/features/Dashboard.scss'
import { RiDeleteBin5Fill  } from 'react-icons/ri'

// import { useSelector } from 'react-redux'
import { useDeleteDashboardMutation } from '../../app/api/dashboardsApiSlice'
import { useGetPlansByDashboardIdQuery } from '../../app/api/plansApiSlice'

const Dashboard = ({ dashboard }) => {

    const [deleteDashboard, {
        isSuccess: successfullyDeleted,
    }] = useDeleteDashboardMutation()

    const navigate = useNavigate()

    const id = dashboard._id

    const { 
        data,
        isLoading,
        isSuccess: successfullyFetchedPlans,
        error,
    } = useGetPlansByDashboardIdQuery(id);

    const title = dashboard.title
    const [numPlans, setNumPlans] = useState(0)

    useEffect(() => {

        if (data) {
            setNumPlans(data.length)
        }
    }, [data, successfullyFetchedPlans])

    // this makes sure that if it is the last dashboard to be deleted then we restart the screen to make sure all deleted dashboards are not visible
    useEffect(() => {

        if (successfullyDeleted) {
            window.location.reload(true)
        }

    }, [successfullyDeleted])

    if (dashboard) {

        const onDelete = async () => {

            if (successfullyFetchedPlans && numPlans === 0) {
                await deleteDashboard({id})
            }
            
        }

        return (
            <div className="dashboard-row">
                <div className='dashboard-row__title'>
                    <h1 className='dashboard-row__title__text'>
                        {title.substring(0, 12)}
                        {title.length > 12 && "..."}
                    </h1>
                </div>
                <div className='dashboard-row__plans'>
                    <h1 className='dashboard-row__plans__text'>{numPlans}</h1>
                </div>
                <div className='dashboard-row__action'>

                    <RiDeleteBin5Fill
                        style={{ filter: 'drop-shadow(0.2vh 0.25vh 0.4vh rgba(0, 0, 0, 0.4))' }}
                        className="dashboard-row__action__icon"
                        onClick={onDelete}
                    />

                </div>
            </div>
        )

    } else return null
}

export default Dashboard;