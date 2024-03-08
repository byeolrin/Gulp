import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllBusinesses } from "../../redux/business";
import { NavLink } from "react-router-dom";

function AllBusinesses() {
    const dispatch = useDispatch();

    const AllBusinesses = useSelector((state) => state.businesses.allBusinesses.businesses);

    console.log('THIS IS YOUR OBJECT OF ALL BUSINESSES', AllBusinesses)

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
        return totalRating / reviews.length;
    };

    useEffect(() => {
        dispatch(thunkGetAllBusinesses())
    }, [dispatch])

    return (
        <div className="all-businesses-container">
            {AllBusinesses?.map((business) =>
                <div className="individual-business-card" key={business.id}>
                    <NavLink to={`/business/${business.id}`}>
                        <p>{business.business_name}</p>
                        <p>{business.phone}</p>
                        <p>Average Rating: {calculateAverageRating(business.reviews)}</p>
                        <img src={business.business_image} />
                    </NavLink>
                </div>)}
        </div>
    )
}

export default AllBusinesses;