import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetOneBusiness } from "../../redux/business";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewForm from "../ReviewForm/ReviewForm";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import './BusinessDetails.css';
import EditReview from "../EditReview/EditReview";

function BusinessDetails() {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleEditBusiness = (e) => {
        e.preventDefault();
        navigate(`/business/${businessId}/edit`)
    }

    return (
        <div>
            <h2>{currentBusiness?.business_name}</h2>
            <p>{currentBusiness?.description}</p>
            <p>Average Rating: {averageRating ? averageRating.toFixed(1) : 0}</p>
            {user?.id === currentBusiness?.owner_id ? (
                <button onClick={handleEditBusiness}>
                    Edit Business
                </button>
            ) : (
                <div className="business-edit-review-button">
                    {user?.id && !currentBusiness?.reviews.some(review => review.user_id === user.id) ? (
                        <OpenModalButton
                            buttonText='Write a review'
                            modalComponent={<ReviewForm businessId={businessId} />}
                        />
                    ) : null}
                    {currentBusiness?.reviews.map((review) =>
                        <div key={review.id}>
                            {user?.id === review.user_id && (
                                <OpenModalButton
                                    buttonText='Edit Review'
                                    modalComponent={<EditReview businessId={businessId} review={review} />}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}

            <img src={currentBusiness?.business_image} />
            {currentBusiness?.reviews.map((review) =>
                <div className="review-details-container" key={review.id}>
                    <p>
                        {review.user.first_name} {review.user.last_name}
                    </p>
                    <p>
                        {review.rating}
                    </p>
                    <p>
                        {review.review}
                    </p>
                    {user?.id === review.user_id && (
                        <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteReviewModal businessId={businessId} reviewId={review.id} />}
                        />
                    )}
                </div>
            ).reverse()}
        </div>
    )

}

export default BusinessDetails;