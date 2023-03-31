import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {

    // set current token & admin to false by default
    const token = useSelector(selectCurrentToken)
    let isAdmin = false

    // if a token exists then we decode it and destructure the id, username and password contained within. Else empty
    if (token) {
        const decoded = jwtDecode(token)
        const { id, username, role } = decoded.Profile

        // if it is an admin role set the role to true
        if (role === 'Admin') {
            isAdmin = true
        }

        return { id, username, role, isAdmin }
    }

    return { id: '', username: '', role: '', isAdmin }
}
export default useAuth