// styles
import '../../styles/components/small/NameTag.scss'

// get username
import useAuth from "../../hooks/useAuth"

// import icons
import { AiFillRightCircle, AiFillLeftCircle } from 'react-icons/ai';

// redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { toggleNameTag } from '../../app/nametag'

const NameTag = () => {

    const { showUser } = useSelector((state) => state.nametag);
    const dispatch = useDispatch();

    // fetch the username
    const { username } = useAuth()

    return (
        <div className='name-tag'>

            <div style={{ backgroundColor: showUser ? "transparent" : "" }} className='name-tag__name-field'>
                <h1 style={{ display: showUser ? "none" : "block" }} className='name-tag__name-field__name'>{username}</h1>
            </div>

            <div className='name-tag__icon-field'>
                <button className='name-tag__icon-field__icon'>
                    <AiFillRightCircle style={{ display: showUser ? "none" : "block" }} onClick={() => dispatch(toggleNameTag()) } />
                    <AiFillLeftCircle style={{ display: showUser ? "block" : "none" }} onClick={() => dispatch(toggleNameTag()) } />
                </button>
            </div>

        </div>
    )
}

export default NameTag