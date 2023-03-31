// import styles
import '../../styles/features/ShowUsers.scss'

// lesser imports
import NameTag from '../../components/small/NameTag';

// imports for fetching users
import { useGetUsersQuery } from '../../app/api/usersApiSlice'

// import User component
import User from './User';

const ShowUsers = () => {

    const { data, error, isLoading, isSuccess } = useGetUsersQuery();

    return (
        <div className="show-users">

            <div className="show-users__outer">

                <div className="show-users__outer__inner">

                    <div className="show-users__outer__inner__header">
                        <div className="show-users__outer__inner__header__user">
                            <NameTag />
                        </div>
                    </div>

                    <div className="show-users__outer__inner__body">

                        <div className="show-users__outer__inner__body__header">
                            <h1 className="show-users__outer__inner__body__header__title">Users List</h1>
                        </div>

                        <div className="show-users__outer__inner__body__list">

                            <div className="show-users__outer__inner__body__list__header">

                                <h1 className="show-users__outer__inner__body__list__header__username">Username</h1>

                                <h1 className="show-users__outer__inner__body__list__header__role">Role</h1>

                                <h1 className="show-users__outer__inner__body__list__header__actions">Edit</h1>

                            </div>

                            <div className="show-users__outer__inner__body__list__items">

                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : error ? (
                                    <p>Error: </p>
                                ) : isSuccess ? (

                                    data.map(user => <User key={user._id} user={user} />)

                                ) : null}
                                
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
};

export default ShowUsers;