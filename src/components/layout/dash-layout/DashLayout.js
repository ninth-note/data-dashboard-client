import { Outlet } from 'react-router-dom'
import DashFooter from './DashFooter'

// react imports (mainly for a refresh)
import { useState, useEffect } from 'react';

// react imports (mainly for a refresh)
import { useSelector } from 'react-redux';

// import auth
import useAuth from '../../../hooks/useAuth';

// imports for fetching dashboards
import { useGetDashboardsByUserIdQuery } from '../../../app/api/dashboardsApiSlice';

// import context to pass the children the props
import DashContext from './DashContext';

const DashLayout = () => {

    const { id } = useAuth()
    const { 
        data,
        // isLoading, 
        isSuccess,
        // error,
    } = useGetDashboardsByUserIdQuery(id);

    // for development purposes
    // useEffect(() => {
    //     if (error) {
    //         console.log('An error occurred while fetching dashboards:', error);
    //     } else if (isLoading) {
    //         console.log('Loading dashboards...');
    //     }
    // }, [data, error, isLoading]);

    const [dashboards, setDashboards] = useState([])
    const [current, setCurrent] = useState([])
    const [index, setIndex] = useState(0)

    const { needRefresh } = useSelector((state) => state.refresh);

    // when users dashboards are succesfully fetched
    useEffect(() => {
        if (isSuccess) {
            setDashboards(data)
            // console.log(data)
        }
    }, [isSuccess])

    // when atleast 1 dashboard exists set current dashboard
    useEffect(() => {
        if (dashboards.length > 0) {
            setCurrent(dashboards[0])
        }
        
    }, [dashboards])

    // handling navigation buttons
    useEffect(() => {
        if (dashboards.length > 0) {
            setCurrent(dashboards[index]);
        }
    }, [index]);

    const handleRefresh = () => {
        window.location.reload(true)
    }

    useEffect(() => {
        if (needRefresh) {
            handleRefresh()
        }
    }, [needRefresh])
    

    return (
        <DashContext.Provider
            value={{ dashboards, current, isSuccess, index, setIndex }}
        >
            <Outlet />
            <DashFooter />
        </DashContext.Provider>
    )
}
export default DashLayout