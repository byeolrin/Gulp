import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllBusinesses } from "../../redux/business";
import { NavLink } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaDollarSign } from "react-icons/fa";
import './AllBusiness.css';
import StarRating from "../StarRating/StarRating";

function AllBusinesses() {
    const dispatch = useDispatch();

    const AllBusinesses = useSelector((state) => state.businesses.allBusinesses.businesses);

    // console.log('THIS IS YOUR OBJECT OF ALL BUSINESSES', AllBusinesses)

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
        return totalRating / reviews.length;
    };

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    };

    const renderPriceRange = (priceRange) => {
        const dollarSignArray = [];
        for (let i = 0; i < priceRange; i++) {
            dollarSignArray.push(<FaDollarSign key={i} className="dollar-icon" />);
        }
        return dollarSignArray;
    };

    useEffect(() => {
        dispatch(thunkGetAllBusinesses())
    }, [dispatch])

    return (
        <div className="all-businesses-container">
            {AllBusinesses?.map((business) =>
                <div className="individual-business-card" key={business.id}>
                    <NavLink className='business-card-info' to={`/business/${business.id}`}>
                        <div className="left-side-of-business-card">
                            <img className='business-card-image' src={business.business_image} />
                        </div>
                        <div className="right-side-of-business-card">
                            <div className="business-card-label">{business.business_name}</div>
                            <div className="business-card-label">{formatPhoneNumber(business.phone)}</div>
                            <div className="business-card-label">{<StarRating averageRating={(calculateAverageRating(business.reviews))} />}</div>
                            <div className="business-card-label">{renderPriceRange(business.price_range)}</div>
                        </div>
                    </NavLink>
                </div>)}
        </div>
    )
}

export default AllBusinesses;