import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequirePrivileges = ({ allowedRoles }) => {
    const location = useLocation()
    const { role } = useAuth()

    const content = (
        allowedRoles.includes(role)
            ? <Outlet />
            : <Navigate to="/settings" state={{ from: location }} replace />
    )

    return content
}
export default RequirePrivileges