import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

import { useSelector } from 'react-redux';

import '../../styles/components/SidebarLayout.scss'

const SidebarLayout = () => {

    const { isOpen } = useSelector((state) => state.sidebar);
    const effect = isOpen ? '__darken' : '__normal';
    
    return <div className='space'>
        <div className={`space${effect}`}>
            <Outlet />
        </div>
        <Sidebar />
    </div>;
};

export default SidebarLayout;