// react imports
import { Routes, Route } from 'react-router-dom'

// import bootstrap (toolkit, will need sass to use), icons and styles
import "bootstrap/dist/css/bootstrap.min.css";
import 'boxicons/css/boxicons.min.css';
import './App.scss';

// layout imports
import Layout from './components/layout/Layout'
import SidebarLayout from './components/layout/SidebarLayout'

import DashLayout from './components/layout/dash-layout/DashLayout'
import BuildLayout from './components/layout/build-layout/BuildLayout';
import BasicLayout from './components/layout/basic-layout/BasicLayout';

// login & 404
import Login from './features/auth/Login';
import NotFound from './features/auth/NotFound';

// authentication & authorization
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import RequirePrivileges from './features/auth/RequirePrivileges';
import { roles, control } from './config'

// dashboards
import MyDashboards from './features/main/MyDashboards'
import ShowPlans from './features/main/ShowPlans';
import CreatePlan from './features/main/CreatePlan';
import EditPlan from './features/main/EditPlan';

// new
import NewDashboard from './features/build-dashboard/NewDashboard';
import ChooseTemplate from './features/build-dashboard/ChooseTemplate';
import BuildDashboard from './features/build-dashboard/BuildDashboard';

// other
import Profile from './features/profile-page/Profile';
import Settings from './features/settings-page/Settings';
import ManageDashboards from './features/settings-page/ManageDashboards';

// admin
import ShowUsers from './features/settings-page/ShowUsers';
import CreateUser from './features/settings-page/CreateUser';
import EditUser from './features/settings-page/EditUser';


function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>

            {/* Public Routes */}
            <Route index element={<Login />} />
            {/* End Public Routes */}

            {/* Protected Routes */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRoles={[...Object.values(roles)]} />}>
                    {/* <Route element={<Prefetch />}> */}

                        <Route element={<SidebarLayout />}>

                            <Route path="dashboards" element={<DashLayout />}>
                                <Route index element={<MyDashboards />} />
                                <Route path="plans" element={<ShowPlans />} />
                                <Route path="create-plan" element={<CreatePlan />} />
                                <Route path="edit-plan" element={<EditPlan />} />
                            </Route>

                            <Route path="new" element={<BuildLayout />}>
                                <Route index element={<NewDashboard />} />
                                <Route path="templates" element={<ChooseTemplate />} />
                                <Route path="custom" element={<BuildDashboard />} />
                            </Route>

                            <Route path="profile" element={<BasicLayout />}>
                                <Route index element={<Profile />} />
                            </Route>

                            <Route path="settings" element={<BasicLayout />}>
                                <Route index element={<Settings />} />
                                <Route path="manage-dashboards" element={<ManageDashboards />} />
                                <Route element={<RequirePrivileges allowedRoles={[...Object.values(control)]} />}>   
                                    <Route path="users" element={<ShowUsers />}/>
                                    <Route path="create-user" element={<CreateUser />}/>
                                    <Route path="edit-user" element={<EditUser />}/>
                                </Route>
                            </Route>

                        </Route>
                    {/* </Route> */}
                </Route>
            </Route>
            {/* End Protected Routes */}

        </Route>

        {/* Handle Non Existant Routes */}
        <Route path='*' element={<NotFound />} />
        
    </Routes>
  );
}

export default App;