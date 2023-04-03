// react imports
import { useState, useEffect } from 'react';

// navigation
import { useLocation, useNavigate } from 'react-router-dom'

// import styles & icons
import '../../styles/features/EditUser.scss'
import { RiDeleteBin5Fill  } from 'react-icons/ri'

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

    // for dev purposes
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

                            <RiDeleteBin5Fill
                                style={{ filter: 'drop-shadow(0.2vh 0.25vh 0.4vh rgba(0, 0, 0, 0.4))' }}
                                className="edit-user__outer__inner__body__header__icon"
                                onClick={onDelete}
                            />
                        </div>

                        <form className="edit-user__outer__inner__body__form" onSubmit={onEdit}>


                                <div className='edit-user__outer__inner__body__form__username'>
                                    <label className='edit-user__outer__inner__body__form__username__label'>Username:</label>
                                    <input 
                                        className='edit-user__outer__inner__body__form__username__box'
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={onUsernameChange}
                                        autoComplete="off"
                                        required
                                    />
                                </div>

                                <div className='edit-user__outer__inner__body__form__password'>
                                    <label className='edit-user__outer__inner__body__form__password__label'>Password:</label>
                                    <input 
                                        className='edit-user__outer__inner__body__form__password__box'
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={onPasswordChange}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className='edit-user__outer__inner__body__form__role'>
                                    <label className='edit-user__outer__inner__body__form__role__label'>Specify Role:</label>
                                    <select
                                        className='edit-user__outer__inner__body__form__role__box'
                                        id="role"
                                        name="role"
                                        value={role}
                                        onChange={onRoleChange}
                                        required
                                    >
                                        <option value="">________________________</option>
                                        {options}
                                    </select>
                                </div>

                            <button className='edit-user__outer__inner__body__form__edit'>Edit</button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
};

export default EditUser;