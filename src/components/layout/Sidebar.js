// import the component that allows the page to forward
import { NavLink } from 'react-router-dom';

// import icons (might move the log out icon into settings later)
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarLeftCollapse } from 'react-icons/tb';

// import styles
import '../../styles/components/Sidebar.scss'

// redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../app/sidebar'

const menuItem = [
    {
        display: 'My Dashboards',
        icon: <i className='bx bxs-dashboard'></i>,
        path: '/dashboards',
        section: ''
    },
    {
        display: 'New Dashboard',
        icon: <i className='bx bx-plus-circle'></i>,
        path: '/new',
        section: 'new'
    },
    {
        display: 'Profile',
        icon: <i className='bx bx-user-circle'></i>,
        path: '/profile',
        section: 'profile'
    },
    {
        display: 'Settings',
        icon: <i className='bx bxs-cog'></i>,
        path: '/settings',
        section: 'settings'
    },
]

const Sidebar = () => {

    const { isOpen } = useSelector((state) => state.sidebar);
    const dispatch = useDispatch();

    const sidebarStyle = {
        '--sidebar-display-pointers': isOpen ? 'block' : 'none'
    };

    return (
        <div className="container">
            <div style={{ ...sidebarStyle, width: isOpen ? "340px" : "50px" }} className="sidebar">
                <div className="sidebar__logo">
                    <button style={{ display: isOpen ? "none" : "block" }} className="expand">
                        <TbLayoutSidebarLeftExpand style={{ display: isOpen ? "none" : "block" }} onClick={() => dispatch(toggleSidebar())} className="expand"/>
                    </button>
                    <button style={{ display: isOpen ? "block" : "none" }} className="collapse">
                        <TbLayoutSidebarLeftCollapse style={{ display: isOpen ? "block" : "none" }} onClick={() => dispatch(toggleSidebar())}/>
                    </button>
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
                    
                </div>
                <div className="sidebar__menu">
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="sidebar__menu__item" activeclassname="active">
                            <div style={{ marginLeft: isOpen ? "10px" : "-10px" }} className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </NavLink>
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default Sidebar;