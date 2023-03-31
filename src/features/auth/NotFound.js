// navigation
import { useNavigate} from 'react-router-dom'

// styles
import '../../styles/features/NotFound.scss'

const NotFound = () => {

    const navigate = useNavigate()

    const onClick = (e) => {

        navigate('/')

    }

    return (
        <div className='notfound-page'>
            <div className='notfound-page__frame'>
                <div className='notfound-page__frame__contents'>
                    <h1 className='notfound-page__frame__contents__status'>404</h1>
                    <h1 className='notfound-page__frame__contents__text'>Sorry, page not found...</h1>
                    <button
                        className='notfound-page__frame__contents__button'
                        onClick={onClick}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
      );
}

export default NotFound