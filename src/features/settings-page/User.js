import { FaUserEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

// import styles
import '../../styles/features/User.scss'

const User = ({ user }) => {
    // const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    const id = user._id
    const username = user.username
    const role = user.role

    if (user) {
        
        const handleEdit = () => navigate(`/settings/edit-user?userChoices=${encodeURIComponent(JSON.stringify(id))}`)

        return (
            <div className="user-row">
                <div className='user-row__username'>
                    <h1 className='user-row__username__text'>{username}</h1>
                </div>
                <div className='user-row__role'>
                    <h1 className='user-row__role__text'>{role}</h1>
                </div>
                <div className='user-row__button'>
                    <button
                        className="user-row__button__icon"
                        onClick={handleEdit}
                    >
                        <h1 className="user-row__button__icon__text">
                            <FaUserEdit />
                        </h1>
                    </button>
                </div>
            </div>
        )

    } else return null
}

export default User;

// const memoizedUser = memo(User)
// export default memoizedUser