// import the component that allows the page to forward
import { NavLink, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react'; // react imports

// import styles
import '../../../styles/components/layout/DashFooter.scss'

// redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { toggleFooter } from '../../../app/footer'

const footerItems = [
    {
        display: 'Dashboards',
        icon: <i className='bx bxs-dashboard'></i>,
        path: '/dashboards',
        section: '/dashboards'
    },
    {
        display: 'Show Plans',
        icon: <i className='bx bx-detail'></i>,
        path: '/dashboards/plans',
        section: '/dashboards/plans'
    },
    {
        display: 'Create Plan',
        icon: <i className='bx bx-list-plus' ></i>,
        path: '/dashboards/create-plan',
        section: '/dashboards/create-plan'
    },
]

const DashFooter = () => {

    const { showFooter } = useSelector((state) => state.footer);
    const dispatch = useDispatch();

    // find the current location so that the footer colors would work correctly
    const location = useLocation();
    const pathname = location.pathname;

    // add these two state variables
    const [currentPage, setCurrentPage] = useState(pathname);
    const [activeItem, setActiveItem] = useState(pathname);

    useEffect(() => {
        setCurrentPage(pathname)
    }, [pathname])

    const handleMouseEnter = (item) => {
            setActiveItem(item);
    }

    const handleMouseLeave = () => {
        setActiveItem(pathname);
    };

    return (
        <div style={{ height: showFooter ? "60px" : "20px"}} className='footer'>
            <div style={{ width: showFooter ? "" : "300px"}} className='footer__contents'>
                <div className='footer__contents__toggle'>

                    <button style={{ display: showFooter ? "none" : "block" }} className='footer__contents__toggle__button'>
                        <i className='bx bxs-show footer-visibility' onClick={() => dispatch(toggleFooter()) }></i>
                    </button>
                    
                    <button style={{ display: showFooter ? "block" : "none", fontSize: '40px', left: '-40px' }} className='footer__contents__toggle__button'>
                        <i className='bx bxs-hide footer-visibility' onClick={() => dispatch(toggleFooter()) }></i>
                    </button>

                </div>
                <div style={{ display: showFooter ? "" : "none" }} className='footer__contents__items'>
                    {
                        footerItems.map((item, index) => (
                            <NavLink to={item.path} key={index} style={{ display: showFooter ? '' : "none" }}
                                className="footer__contents__items__item" 
                                activeclassname="active"
                                onMouseEnter={() => handleMouseEnter(item.section)}
                                onMouseLeave={() => handleMouseLeave()}
                                // onClick={() => onClick()}
                            >
                                <div style={{ display: showFooter ? "block" : "none", color: (item.section === currentPage) ? 'white' : ''}} className="footer__contents__items__item__icon" >
                                    {item.icon}
                                </div>
                                <div style={{ display: (showFooter && (item.section === activeItem)) ? "block" : "none" }} className="footer__contents__items__item__text">
                                    {item.display}
                                </div>
                            </NavLink>
                        ))
                    }
                </div>
                <div className='footer__contents__current'>
                    
                </div>
            </div>
        </div>
    );
};
  
  export default DashFooter;