import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { thunkUserBusinesses } from "../../redux/business";
import DeleteBusinessModal from "./DeleteBusinessModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function UserBusinesses() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const userBusinesses = useSelector(state => state.businesses.allBusinesses.businesses);

    console.log('HELLO BUSINESS INFO', userBusinesses);

    if (!user) {
        navigate('/login')
    }

    useEffect(() => {
        dispatch(thunkUserBusinesses(user.id))
    }, [dispatch, user.id])

    return (
        <>
            <h1>Your Businesses</h1>
            <div className="user-businesses-container">
                {userBusinesses?.map((business) => (
                    <div
                        key={business.id}
                        className="business-container">
                        <NavLink
                            to={`/business/${business.id}`}>
                            <span>{business.business_name}</span>
                            <img src={business.business_image} />
                        </NavLink>
                        <OpenModalButton
                            buttonText='DELETE'
                            modalComponent={<DeleteBusinessModal businessId={business.id} userId={user.id} />}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserBusinesses;