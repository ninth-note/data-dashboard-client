// react import
import { useContext } from 'react';

// import styles & icons & less significant components
import '../../styles/features/ShowPlans.scss'
import { FaChevronLeft, FaChevronRight  } from 'react-icons/fa';
import NameTag from '../../components/small/NameTag';

// import the DashContext to fetch the required data from DashLayout
import DashContext from '../../components/layout/dash-layout/DashContext';

// import plan API slice
import { useGetPlansByDashboardIdQuery } from '../../app/api/plansApiSlice';

// import Plan component
import Plan from './Plan';

const ShowPlans = () => {

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

    return (
        <div className="plans">

            <div className="plans__outer">

                <button className='plans__outer__left' onClick={onClickLeft}><FaChevronLeft /></button>

                <div className="plans__outer__inner">

                    <div className="plans__outer__inner__header"> 

                        <div className="plans__outer__inner__header__title">
                            <h1 className="plans__outer__inner__header__title__text">
                                {isSuccess? current.title : <p>...</p>}
                            </h1>
                        </div>

                        <div className="plans__outer__inner__header__user">
                            <NameTag />
                        </div>
                    </div>

                    <div className="plans__outer__inner__body">

                        <div className="plans__outer__inner__body__header">
                            <h1 className="plans__outer__inner__body__header__title">Show Plans</h1>
                        </div>

                        <div className="plans__outer__inner__body__list">

                            {(successfullyFetchedPlans && data.length > 0) ? (

                                <div className="plans__outer__inner__body__list__header">

                                    <h1 className="plans__outer__inner__body__list__header__plan">Plan</h1>

                                    <h1 className="plans__outer__inner__body__list__header__graph">Graph</h1>

                                    <h1 className="plans__outer__inner__body__list__header__status">Status</h1>

                                    <h1 className="plans__outer__inner__body__list__header__actions">Edit</h1>

                                </div>

                            ) : null}

                            <div className="plans__outer__inner__body__list__items">

                                {(dashboards.length === 0) ? (
                                    <h1 style={{
                                        marginTop: '250px'
                                    }}>...</h1>
                                ) : isLoading ? (
                                    <p>loading...</p>
                                ) : (data.length === 0) ? (
                                    <h3 style={{
                                        marginTop: '250px'
                                    }}>No Plans Found</h3>
                                ) : (successfullyFetchedPlans) ? (
                                    
                                    data.map(plan => <Plan key={plan._id} plan={plan} />)

                                ) : null}

                            </div>

                        </div>

                    </div>

                </div>

                <button className='plans__outer__right' onClick={onClickRight}><FaChevronRight /></button>

            </div>

        </div>
    )
};

export default ShowPlans;