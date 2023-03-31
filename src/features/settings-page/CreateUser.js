// react imports
import { useState, useEffect } from 'react';

// navigation
import { useNavigate} from 'react-router-dom'

// import styles
import '../../styles/features/CreateUser.scss'

// lesser imports
import NameTag from '../../components/small/NameTag';

// import constants
import { roles } from '../../config';

// import user API slice
import { useCreateUserMutation } from '../../app/api/usersApiSlice';

const CreateUser = () => {

    const [createUser, {
        isLoading,
        isSuccess,
    }] = useCreateUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const options = Object.values(roles).map(role => {
        return (
            <option
                key={role}
                value={role}

            > 
                {role}
            </option >
        )
    })

    useEffect(() => {
        if (isSuccess) {
            navigate('/settings/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChange = (e) => setUsername(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)
    const onRoleChange = (e) => setRole(e.target.value)

    const onCreate = async (e) => {

        e.preventDefault()

        if (!isLoading) {

            await createUser({ username, password, role })

        }

    }

    return (
        <div className="create-user">

            <div className="create-user__outer">

                <div className="create-user__outer__inner">

                    <div className="create-user__outer__inner__header">
                        <div className="create-user__outer__inner__header__user">
                            <NameTag />
                        </div>
                    </div>

                    <div className="create-user__outer__inner__body">

                        <div className="create-user__outer__inner__body__header">
                            <h1 className="create-user__outer__inner__body__header__title">Create User</h1>
                        </div>

                        <form className="create-user__outer__inner__body__form" onSubmit={onCreate}>

                            <div className='create-user__outer__inner__body__form__contents'>

                                <div className='create-user__outer__inner__body__form__contents__username'>
                                    <label className='create-user__outer__inner__body__form__contents__username__label'>Username:</label>
                                    <input 
                                        className='create-user__outer__inner__body__form__contents__username__box'
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={onUsernameChange}
                                        placeholder="username"
                                        autoComplete="off"
                                        required
                                    />
                                </div>

                                <div className='create-user__outer__inner__body__form__contents__password'>
                                    <label className='create-user__outer__inner__body__form__contents__password__label'>Password:</label>
                                    <input 
                                        className='create-user__outer__inner__body__form__contents__password__box'
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={onPasswordChange}
                                        placeholder="password"
                                        autoComplete="off"
                                        required
                                    />
                                </div>

                                <div className='create-user__outer__inner__body__form__contents__role'>
                                    <label className='create-user__outer__inner__body__form__contents__role__label'>Specify Role:</label>
                                    <select
                                        className='create-user__outer__inner__body__form__contents__role__box'
                                        id="role"
                                        name="role"
                                        value={role}
                                        // multiple={true}
                                        // size="2"
                                        onChange={onRoleChange}
                                        required
                                    >
                                        <option value="">________________________</option>
                                        {options}
                                    </select>
                                </div>

                                

                            </div>

                            <button>Create</button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
};

export default CreateUser;