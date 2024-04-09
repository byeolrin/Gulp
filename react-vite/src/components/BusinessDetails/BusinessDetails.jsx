import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetOneBusiness } from "../../redux/business";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewForm from "../ReviewForm/ReviewForm";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import './BusinessDetails.css';
import EditReview from "../EditReview/EditReview";
import StarRating from "../StarRating/StarRating";

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

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    };

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
        return totalRating / reviews.length;
    };

    return (
        <div className="business-details-container">
            <div className="business-details-content">
                <h1>{currentBusiness?.business_name}</h1>
                <div className="business-details-rating">
                    {<StarRating averageRating={averageRating ? averageRating.toFixed(1) : 0} />}
                    <div className="business-details-label-rating-text">
                        <div>
                            {calculateAverageRating(currentBusiness.reviews).toFixed(1)}
                        </div>
                        <div>
                            ({currentBusiness.reviews.length} {currentBusiness.reviews.length === 1 ? 'Review' : 'Reviews'})
                        </div>
                    </div>
                </div>
                <img className='business-details-image' src={currentBusiness?.business_image} />
            </div>
            <div className="business-details-info">
                <div className="left-side-business-details-info">
                    {user?.id === currentBusiness?.owner_id ? (
                        <button className='business-details-form-button' onClick={handleEditBusiness}>
                            Edit Business
                        </button>
                    ) : (
                        <div className="business-edit-review-button">
                            {user?.id && !currentBusiness?.reviews.some(review => review.user_id === user.id) ? (
                                <OpenModalButton
                                    buttonText='Write a review'
                                    className='business-details-form-button'
                                    modalComponent={<ReviewForm businessId={businessId} />}
                                />
                            ) : null}
                            {currentBusiness?.reviews.map((review) =>
                                <div key={review.id}>
                                    {user?.id === review.user_id && (
                                        <OpenModalButton
                                            buttonText='Edit Review'
                                            className='business-details-form-button'
                                            modalComponent={<EditReview businessId={businessId} review={review} />}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="business-details-about-me">
                        <h3>About the business</h3>
                        <p>{currentBusiness?.description}</p>
                    </div>
                </div>
                <div className="right-side-business-details-info">
                    <div className="url-info-container">
                        <a href={currentBusiness?.business_url}>
                            {currentBusiness?.business_url}
                        </a>
                        <i className="fa-solid fa-up-right-from-square"></i>
                    </div>
                    <hr className="business-details-horizontal-line"></hr>
                    <div className="phone-info-container">
                        <div>
                            {formatPhoneNumber(currentBusiness?.phone)}
                        </div>
                        <i className="fa-solid fa-phone"></i>
                    </div>
                    <hr className="business-details-horizontal-line"></hr>
                    <div className="location-info-container">
                        <div>{currentBusiness?.address} {currentBusiness?.city}, {currentBusiness?.state} {currentBusiness?.zipcode}</div>
                        <i className="fa-solid fa-diamond-turn-right"></i>
                    </div>
                </div>
            </div>
            <div className="business-all-reviews">
                {currentBusiness?.reviews.map((review) =>
                    <div className="review-details-container" key={review.id}>
                        <p>
                            {review.user.first_name} {review.user.last_name}
                        </p>
                        <div>
                            {<StarRating averageRating={review.rating} />}
                        </div>
                        <p>
                            {review.review}
                        </p>
                        {user?.id === review.user_id && (
                            <OpenModalButton
                                className='delete-business-review-button'
                                buttonText='Delete'
                                modalComponent={<DeleteReviewModal businessId={businessId} reviewId={review.id} />}
                            />
                        )}
                    </div>
                ).reverse()}
            </div>
        </div>
    )

}

export default BusinessDetails;