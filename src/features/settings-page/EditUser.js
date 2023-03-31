// react imports
import { useState, useEffect } from 'react';

// navigation
import { useLocation, useNavigate } from 'react-router-dom'

// import styles
import '../../styles/features/EditUser.scss'

// lesser imports
import NameTag from '../../components/small/NameTag';

// import constants
import { roles } from '../../config';

// import user API slice
import { useGetUsersQuery, useEditUserMutation, useDeleteUserMutation } from '../../app/api/usersApiSlice';

const EditUser = () => {

    const [editUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useEditUserMutation()

    const [deleteUser, {
        isSuccess: successfullyDeleted,
    }] = useDeleteUserMutation()

    const location = useLocation();
    const navigate = useNavigate()

    // using location hook search for the user's choice from '/new' and fetch it
    const id = JSON.parse(new URLSearchParams(location.search).get('userChoices'));

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.find(u => u._id === id)
        }),
    })

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
        if (user) {
            setUsername(user.username)
            setRole(user.role)
        }
    }, [user])

    useEffect(() => {
        if (isSuccess || successfullyDeleted) {
            navigate('/settings/users')
        }
    }, [isSuccess, successfullyDeleted, navigate])

    // development only
    useEffect(() => {
        console.log(isError)
        console.log(error)
    }, [isError])

    const onUsernameChange = (e) => setUsername(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)
    const onRoleChange = (e) => setRole(e.target.value)

    const onDelete = async () => {
        await deleteUser({ id })
    }

    const onEdit = async (e) => {

        // console.log(username)
        // console.log(password)
        // console.log(role)

        e.preventDefault()

        if (!isLoading) {

            await editUser({ id, username, password, role })

        }

    }

    return (
        <div className="edit-user">

            <div className="edit-user__outer">

                <div className="edit-user__outer__inner">

                    <div className="edit-user__outer__inner__header">
                        <div className="edit-user__outer__inner__header__user">
                            <NameTag />
                        </div>
                    </div>

                    <div className="edit-user__outer__inner__body">

                        <div className="edit-user__outer__inner__body__header">
                            <h1 className="edit-user__outer__inner__body__header__title">Edit User</h1>
                        </div>

                        <form className="edit-user__outer__inner__body__form" onSubmit={onEdit}>

                            <div className='edit-user__outer__inner__body__form__contents'>

                                <div className='edit-user__outer__inner__body__form__contents__username'>
                                    <label className='edit-user__outer__inner__body__form__contents__username__label'>Username:</label>
                                    <input 
                                        className='edit-user__outer__inner__body__form__contents__username__box'
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

                                <div className='edit-user__outer__inner__body__form__contents__password'>
                                    <label className='edit-user__outer__inner__body__form__contents__password__label'>Password:</label>
                                    <input 
                                        className='edit-user__outer__inner__body__form__contents__password__box'
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={onPasswordChange}
                                        placeholder="password"
                                        autoComplete="off"
                                        // required
                                    />
                                </div>

                                <div className='edit-user__outer__inner__body__form__contents__role'>
                                    <label className='edit-user__outer__inner__body__form__contents__role__label'>Specify Role:</label>
                                    <select
                                        className='edit-user__outer__inner__body__form__contents__role__box'
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

                            <button>Edit</button>

                        </form>

                        <button onClick={onDelete}>Delete</button>

                    </div>

                </div>

            </div>

        </div>
    )
};

export default EditUser;