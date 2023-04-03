// react imports
import { useState, useEffect } from 'react'

// auth imports
import { useLogoutMutation } from '../auth/authApiSlice'
import useAuth from '../../hooks/useAuth'

// navigation imports
import { useNavigate } from 'react-router-dom';

// import styles
import '../../styles/features/Settings.scss'

// import icons
import { RiAdminFill } from 'react-icons/ri';
import { CgClose } from 'react-icons/cg'

// import smaller components
import NameTag from '../../components/small/NameTag'

// import modal
import Modal from 'react-modal';

const Settings = () => {

  const { role } = useAuth()

  const navigate = useNavigate()

  // handle logout
  const [logout, {
    isSuccess,
  }] = useLogoutMutation()

  // once cookie is deleted we can navigate to login screen
  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  // handle modal states
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleThemeChange  = () => {
    console.log('forward to change theme page')
  }

  const handleManageDashboards  = () => {
    navigate('/settings/manage-dashboards')
  }

  const onClickManagement = () => {
    setModalIsOpen(true)
  }

  const onModalClose = () => {
    setModalIsOpen(false)
  }

  const handleListUsers = () => {
    setModalIsOpen(false)
    navigate('/settings/users')
  }

  const handleCreateUser = () => {
    setModalIsOpen(false)
    navigate('/settings/create-user')
  }

  return (
    <div className="settings">

      <div className="settings__frame">

        <div className="settings__frame__header"> 
          <div className="settings__frame__header__user">
            <NameTag />
          </div>
        </div>

        <div className="settings__frame__body__form">

          <div className="settings__frame__body__form__header">
            <div className="settings__frame__body__form__header__line"></div>
            <h1 className="settings__frame__body__form__header__title">
              Settings
            </h1>
            <button 
              style={{ display: (role === 'Admin') ? "" : "none" }}
              className="settings__frame__body__form__header__admin"
              onClick={onClickManagement}
            >
              <RiAdminFill />
            </button>
          </div>

          <div className="settings__frame__body__form__items">

            <button className="settings__frame__body__form__items__button1"
              onClick={handleThemeChange}
            >
              Change Theme
            </button>

            <button className="settings__frame__body__form__items__button2"
              onClick={handleManageDashboards}
            >
              Delete a Dashboard
            </button>

            <button className="settings__frame__body__form__items__button3"
              onClick={logout}
            >
              Log Out
            </button>

          </div>
          
          </div>

      </div>

      <Modal
        className="settings__modal"
        overlayClassName="modal-overlay"
        appElement={document.getElementById('root')}
        isOpen={modalIsOpen}
      >
        <div className="settings__modal__header">

          <h1 className="settings__modal__header__title">User Management</h1>
          <button 
            className="settings__modal__header__close" 
            onClick={onModalClose}
          >
            <div 
              style={{ filter: 'drop-shadow(0.2vh 0.25vh 0.4vh rgba(0, 0, 0, 0.4))' }}
              
            >
              <CgClose className="settings__modal__header__close__icon" />
            </div>
          </button>
          
        </div>

        <div className='settings__modal__buttons'>

          <button 
            className="settings__modal__buttons__list" 
            onClick={handleListUsers}
          >
            List Users
          </button>
          <button 
            className="settings__modal__buttons__create"
            onClick={handleCreateUser}
          >
            Create User
          </button>

        </div>
      </Modal>

      {/* <Modal
        className="settings__modal"
        appElement={document.getElementById('root')}
        isOpen={modalIsOpen}
      >
        <button 
          className="settings__modal__close" 
          onClick={onModalClose}
        >
          <h1 className="settings__modal__close__x" >x</h1>
        </button>
        <h2 className="settings__modal__title">
          User Management Options
        </h2>

        <div className="settings__modal__buttons">
          <button 
            className="settings__modal__buttons__list" 
            onClick={handleListUsers}
          >
            List Users
          </button>
          <button 
            className="settings__modal__buttons__create"
            onClick={handleCreateUser}
          >
            Create User
          </button>
        </div>
        </Modal> */}

    </div>
  )
}

export default Settings