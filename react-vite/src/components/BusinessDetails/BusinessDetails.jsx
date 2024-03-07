import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetOneBusiness } from "../../redux/business";
import ReviewDetails from "../ReviewDetails/ReviewDetails";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewForm from "../ReviewForm/ReviewForm";

function BusinessDetails() {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const currentBusiness = useSelector((state) => state.businesses.oneBusiness.business);
    const user = useSelector((state) => state.session.user);
    
    console.log('THIS IS THE CURRENT BUSINESS', currentBusiness, user, businessId)
    
    useEffect(() => {
        dispatch(thunkGetOneBusiness(businessId));
    }, [dispatch, businessId])

    if (!currentBusiness) {
        return null
    }

    return (
        <div>
            <h2>{currentBusiness?.business_name}</h2>
            <p>{currentBusiness?.description}</p>
            <img src={currentBusiness?.business_image} />
            <OpenModalButton
            buttonText='Write a review'
            modalComponent={<ReviewForm businessId={businessId} />}
            />
            {/* <ReviewDetails /> */}
            {currentBusiness?.reviews.map((review) => 
            <p>
                {review.review}
            </p>
            ).reverse()}
        </div>
    )
    
}

export default BusinessDetails;