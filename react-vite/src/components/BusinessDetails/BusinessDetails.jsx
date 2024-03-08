import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetOneBusiness } from "../../redux/business";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewForm from "../ReviewForm/ReviewForm";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import './BusinessDetails.css';
import EditReview from "../EditReview/EditReview";

function BusinessDetails() {
    const { businessId } = useParams();
    const dispatch = useDispatch();

    const currentBusiness = useSelector((state) => state.businesses.oneBusiness.business);
    const user = useSelector((state) => state.session.user);

    console.log('THIS IS THE CURRENT BUSINESS', currentBusiness, user, businessId)

    useEffect(() => {
        dispatch(thunkGetOneBusiness(businessId));
    }, [dispatch, businessId])

    if (!currentBusiness) {
        return null
    }

    const averageRating = currentBusiness.reviews.reduce((total, review) => total + review.rating, 0) / currentBusiness.reviews.length;

    return (
        <div>
            <h2>{currentBusiness?.business_name}</h2>
            <p>{currentBusiness?.description}</p>
            <p>Average Rating: {averageRating.toFixed(1)}</p>
            <img src={currentBusiness?.business_image} />
            <OpenModalButton
                buttonText='Write a review'
                modalComponent={<ReviewForm businessId={businessId} />}
            />
            {currentBusiness?.reviews.map((review) =>
                <div className="review-details-container" key={review.id}>
                    <p>
                        {review.user.first_name} {review.user.last_name}
                    </p>
                    {user?.id === review.user_id && (   
                        <OpenModalButton
                        buttonText='Edit'
                        modalComponent={<EditReview businessId={businessId} reviewId={review.id} />}
                        />
                    )}
                    {user?.id === review.user_id && (   
                        <OpenModalButton
                        buttonText='Delete'
                        modalComponent={<DeleteReviewModal businessId={businessId} reviewId={review.id} />}
                        />
                    )}
                    <p>
                        {review.rating}
                    </p>
                    <p>
                        {review.review}
                    </p>
                </div>
            ).reverse()}
        </div>
    )

}

export default BusinessDetails;