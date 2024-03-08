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

    const handleBusinessForm = (e) => {
        e.preventDefault();
        navigate('/business/new')
    }

    return (
        <>
            <div className="user-businesses-container">
                <h1>Your Businesses</h1>
                <div className="business-form-navigate-button" onClick={handleBusinessForm}>
                    <span>
                        <i class="fa-solid fa-plus"></i>
                    </span>
                    <span>
                        New Business
                    </span>
                </div>
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
                            <div className="user-business-buttons">
                                <button className='user-business-individual-buttons' onClick={() => handleEdit(business.id)}>
                                    EDIT
                                </button>
                                <OpenModalButton
                                    className='user-business-individual-buttons' 
                                    buttonText='DELETE'
                                    modalComponent={<DeleteBusinessModal businessId={business.id} userId={user.id} />}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserBusinesses;