import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"

const PersistLogin = () => {

    const token = useSelector(selectCurrentToken)
    const ran = useRef(false)
    const [tokenVerified, setTokenVerified] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {

        if (ran.current === true || process.env.NODE_ENV !== 'development') {

            const verifyRefreshToken = async () => {

                // verifying the refresh token, log the error if there is one
                try {
                    await refresh()
                    setTokenVerified(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token) verifyRefreshToken()
        }

        return () => ran.current = true
    }, [])


    let content

    if (isLoading) { //persist: yes, token: no
        content = <p>Loading...</p>
    } else if (isError) { //persist: yes, token: no
        content = (
            <p style={{fontSize: '32px', marginTop: '10px', marginLeft: '20px', }}>
                {`${error.data?.message} - `}
                <Link to="/">Please login again</Link>
            </p>
        )
    } else if ((token && isUninitialized) || (isSuccess && tokenVerified)) { //persist: yes, token: yes
        content = <Outlet />
    }

    return content
}
export default PersistLogin