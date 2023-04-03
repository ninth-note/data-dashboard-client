// import styles
import '../../styles/features/ManageDashboards.scss'

// lesser imports
import NameTag from '../../components/small/NameTag';

// import auth
import useAuth from '../../hooks/useAuth';

// import for fetching dashboards
import { useGetDashboardsByUserIdQuery } from '../../app/api/dashboardsApiSlice';

// import Dashboard component
import Dashboard from './Dashboard';

const ManageDashboards = () => {

    const { id } = useAuth()
    const { 
        data,
        isSuccess,
    } = useGetDashboardsByUserIdQuery(id);

    return (
        <div className="manage-dashboards">

            <div className="manage-dashboards__outer">

                <div className="manage-dashboards__outer__inner">

                    <div className="manage-dashboards__outer__inner__header">
                        <div className="manage-dashboards__outer__inner__header__user">
                            <NameTag />
                        </div>
                    </div>

                    <div className="manage-dashboards__outer__inner__body">

                        <div className="manage-dashboards__outer__inner__body__header">
                            <h1 className="manage-dashboards__outer__inner__body__header__title">Dashboard Management</h1>
                        </div>

                        <div className="manage-dashboards__outer__inner__body__list">

                            {isSuccess ? (

                                <div className="manage-dashboards__outer__inner__body__list__header">

                                    <h1 className="manage-dashboards__outer__inner__body__list__header__dashboard">Dashboard</h1>

                                    <h1 className="manage-dashboards__outer__inner__body__list__header__plans">Plans</h1>

                                    <h1 className="manage-dashboards__outer__inner__body__list__header__actions">Action</h1>

                                </div>

                            ) : null}

                            <div className="manage-dashboards__outer__inner__body__list__items">

                                {!isSuccess ? (
                                    <h3 style={{
                                        marginTop: '250px'
                                    }}>No Dashboards Found</h3>
                                ) : isSuccess ? (

                                    data.map(dashboard => <Dashboard key={dashboard._id} dashboard={dashboard} />)

                                ) : null}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
};

export default ManageDashboards;