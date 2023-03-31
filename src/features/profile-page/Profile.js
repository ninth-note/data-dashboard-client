// react imports
import { useState, useEffect } from 'react';

// navigation
import { useNavigate } from 'react-router-dom'

// import styles & icons
import '../../styles/features/Profile.scss'
import { CgClose } from 'react-icons/cg'

// import smaller components
import NameTag from '../../components/small/NameTag'

// import modal
import Modal from 'react-modal';

// import auth
import useAuth from '../../hooks/useAuth';

// import user API slice
import { useGetUsersQuery, useEditUserMutation } from '../../app/api/usersApiSlice';
import { useLogoutMutation } from '../auth/authApiSlice';

const Profile = () => {

  // handle edit
  const [editUser, {
    isLoading,
    isSuccess,
  }] = useEditUserMutation()

  // handle logout
  const [logout, {
    isSuccess: cookieRemoved,
  }] = useLogoutMutation()

  const { id, role } = useAuth()
  const navigate = useNavigate()
  
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
        user: data?.find(u => u._id === id)
    }),
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      setUsername(user.username)
    }
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      logout()
    }
  }, [isSuccess, logout])

  useEffect(() => {
    if (cookieRemoved) {
      navigate('/')
    }
  }, [cookieRemoved, navigate])

  // handle modal states
  const [changingUsername, setChangingUsername] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)

  // handle username change events
  const clickUsernameChange = () => {
    setChangingUsername(true)
  }

  const usernameChangeClose = () => {
    setChangingUsername(false)
  }

  const onUsernameSubmit = async (e) => {
    e.preventDefault()

      if (!isLoading) {

        await editUser({ id, username, password, role })

      }
    setChangingUsername(false)
  }

  // handle password change events
  const clickPasswordChange = () => {
    setChangingPassword(true)
  }

  const passwordChangeClose = () => {
    setChangingPassword(false)
  }

  const onPasswordSubmit = async (e) => {
    e.preventDefault()

      if (!isLoading) {

        await editUser({ id, username, password, role })

      }
    setChangingPassword(false)
  }

  return (
    <div className="profile">

      <div className="profile__frame">

        <div className="profile__frame__header"> 
          <div className="profile__frame__header__user">
            <NameTag />
          </div>
        </div>

        <div className="profile__frame__body__form">

          <div className="profile__frame__body__form__header">
            <div className="profile__frame__body__form__header__line"></div>
            <h1 className="profile__frame__body__form__header__title">
              Profile
            </h1>
          </div>

          <div className="profile__frame__body__form__items">

            <button className="profile__frame__body__form__items__button1"
              onClick={clickUsernameChange}
            >
              Change Username
            </button>

            <button className="profile__frame__body__form__items__button2"
              onClick={clickPasswordChange}
            >
              Change Password
            </button>

          </div>
          
        </div>

      </div>

      <Modal
        className="profile__modal"
        overlayClassName="modal-overlay"
        appElement={document.getElementById('root')}
        isOpen={changingUsername}
      >
        

        <div className="profile__modal">

          <div className="profile__modal__header">

            <h1 className="profile__modal__header__title">Change Username</h1>
            <button 
              className="profile__modal__header__close" 
              onClick={usernameChangeClose}
            >
              <div 
                style={{ filter: 'drop-shadow(0.2vh 0.25vh 0.4vh rgba(0, 0, 0, 0.4))' }}
                
              >
                <CgClose className="profile__modal__header__close__icon" />
              </div>
            </button>
            
          </div>

          <form className="profile__modal__form" onSubmit={onUsernameSubmit}>

            <label className='profile__modal__form__label'>Username:</label>
            <input 
              className='profile__modal__form__box'
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onUsernameChange}
              placeholder="username"
              autoComplete="off"
              required
            />

            <button className='profile__modal__form__button'>Change Username</button>

          </form>
        </div>
      </Modal>

      <Modal
        className="profile__modal"
        overlayClassName="modal-overlay"
        appElement={document.getElementById('root')}
        isOpen={changingPassword}
      >
        

        <div className="profile__modal">

          <div className="profile__modal__header">

            <h1 className="profile__modal__header__title">Change Password</h1>
            <button 
              className="profile__modal__header__close" 
              onClick={passwordChangeClose}
            >
              <div 
                style={{ filter: 'drop-shadow(0.2vh 0.25vh 0.4vh rgba(0, 0, 0, 0.4))' }}
                
              >
                <CgClose className="profile__modal__header__close__icon" />
              </div>
            </button>
            
          </div>

          <form className='profile__modal__form' onSubmit={onPasswordSubmit}>

            <label className='profile__modal__form__label'>Password:</label>
              
            <input 
              className='profile__modal__form__box'
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="password"
              autoComplete="off"
              required
            />

            <button className='profile__modal__form__button'>Change Password</button>

          </form>
        </div>
      </Modal>

    </div>
  )
}

export default Profile