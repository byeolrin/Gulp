import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { thunkUserBusinesses } from "../../redux/business";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteBusinessModal from "../DeleteBusinessModal/DeleteBusinessModal";
import './UserBusinesses.css';

function UserBusinesses() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const userBusinesses = useSelector(state => state.businesses.allBusinesses.businesses);

    // console.log('HELLO BUSINESS INFO', userBusinesses);

    if (!user) {
        navigate('/login')
    }

    useEffect(() => {
        dispatch(thunkUserBusinesses(user.id))
    }, [dispatch, user.id])

    const handleEdit = (businessId) => {
        navigate(`/business/${businessId}/edit`);
    }
    
    return (
        <>
            <div className="user-businesses-container">
                <h1>Your Businesses</h1>
                <div className="all-user-businesses-container">
                    {userBusinesses?.map((business) => (
                        <div
                            key={business.id}
                            className="business-container">
                            <NavLink
                                className='business-container-link'
                                to={`/business/${business.id}`}>
                                <div className="business-container-info">
                                    <img className='user-business-image' src={business.business_image} />
                                </div>
                                <div className="business-container-info">{business.business_name}</div>
                            </NavLink>
                            <div className="user-business-button" onClick={() => handleEdit(business.id)}>
                                <button>
                                    EDIT
                                </button>
                            </div>
                            <OpenModalButton
                                buttonText='DELETE'
                                modalComponent={<DeleteBusinessModal businessId={business.id} userId={user.id} />}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserBusinesses;