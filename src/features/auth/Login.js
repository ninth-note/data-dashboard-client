// react imports
import { useRef, useState, useEffect } from 'react'

// styles
import '../../styles/features/Login.scss'

// navigation
import { useNavigate} from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {

    useEffect(() => {
        document.body.classList.add('login-background');
    
        return () => {
            document.body.classList.remove('login-background');
        }
    }, []);

    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dashboards')
        } catch (err) {
            if (err.status === 401) {
                setErrMsg(err.data.message);
            }
            if (err.status === 429) {
                setErrMsg(err.data.message);
            }
            errRef.current.focus();
            console.log(err)
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    if (isLoading) return <p>Loading...</p>

    return (
        // login-page
        <div className='login-page'>

            {/* frame */}
            <div className='login-page__frame'>

                {/* form */}
                <div className='login-page__frame__form'>
                    
                    {/* login */}
                    <div className='login-page__frame__form__login'>

                        {/* contents */}
                        <div className='login-page__frame__form__login__contents'>

                            {/* header */}
                            <div className='login-page__frame__form__login__contents__header'>
                                <h1 className='login-page__frame__form__login__contents__header__text'>Welcome</h1>
                            </div>
                            
                            {/* body */}
                            <form className='login-page__frame__form__login__contents__body' onSubmit={handleSubmit}>

                                <div className='login-page__frame__form__login__contents__body__inputs'>

                                    <label className='login-page__frame__form__login__contents__body__inputs__userlabel'>Username</label>
                                    <input 
                                        className='login-page__frame__form__login__contents__body__inputs__userinput'
                                        type="text"
                                        id="username"
                                        value={username}
                                        // placeholder="Username"
                                        onChange={handleUserInput}
                                        autoComplete="off"
                                        required
                                    />

                                    <label className='login-page__frame__form__login__contents__body__inputs__pwdlabel'>Password</label>
                                    <input
                                        className='login-page__frame__form__login__contents__body__inputs__pwdinput'
                                        type="password"
                                        id="password"
                                        value={password}
                                        // placeholder="Password"
                                        onChange={handlePwdInput}
                                        required
                                    />

                                    <label className='login-page__frame__form__login__contents__body__inputs__errmsg'>{errMsg}</label>

                                </div>

                                <button 
                                    className='login-page__frame__form__login__contents__body__button'
                                >
                                    <h1 className='login-page__frame__form__login__contents__body__button__text'>Login</h1>
                                </button>

                            </form>

                        </div>

                    </div>

                    {/* logo */}
                    <div className='login-page__frame__form__logo'>
                        <h1 className='login-page__frame__form__logo__text'>Logo</h1>
                    </div>

                </div>
                
            </div>

        </div>
  )
}

export default Login