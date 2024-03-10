import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditReview, thunkUserBusinessReview } from "../../redux/review";
import { FaStar } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import { thunkGetOneBusiness } from "../../redux/business";
import './EditReview.css';

function EditReview({ businessId, review }) {
    const dispatch = useDispatch();

    const [userReview, setUserReview] = useState(review?.review)
    const [rating, setRating] = useState(review?.rating)
    const [hover, setHover] = useState(null)
    const [formErrors, setFormErrors] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const { closeModal } = useModal()

    const user = useSelector((state) => state.session.user);
    const currentBusiness = useSelector((state) => state.businesses.oneBusiness.business)

    // console.log('hello this is the userReview', currentBusiness.business_name)

    useEffect(() => {
        dispatch(thunkUserBusinessReview(businessId, user.id))
    }, [dispatch, businessId, user.id])

    useEffect(() => {
        const errors = {};
        if (!userReview || userReview.length < 10) errors.review = 'Review text is required to be 10 characters long'
        if (!rating || rating < 1 || rating > 5) errors.rating = 'Please provide a valid rating'

        setFormErrors(errors);
    }, [userReview, rating])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!Object.values(formErrors).length) {
            const formData = new FormData();

            formData.append('businessId', businessId)
            formData.append('review', userReview)
            formData.append('rating', rating)
            formData.append('submit', true)

            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + ', ' + pair[1])
            // }

            await dispatch(thunkEditReview(formData, review.id)).then(closeModal).then(() => {
                dispatch(thunkGetOneBusiness(businessId))
            })
        }
    }

    return (
        <div className="review-form-container">
            <h1>{currentBusiness?.business_name}</h1>
            <form onSubmit={handleSubmit}>
                <div className="review-info-container">
                    {submitted && formErrors.rating && (
                        <div className="form-error">{formErrors.rating}</div>
                    )}
                    <div className="star-rating-form">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <label key={i}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                    />
                                    <FaStar
                                        className="star"
                                        color={
                                            ratingValue <= (hover || rating) ? "#ff643d" : "#e4e5e9"
                                        }
                                        size={35}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            )
                        })}
                    </div>
                    <label>
                        {submitted && formErrors.review && (
                            <div className="form-error">{formErrors.review}</div>
                        )}
                        <textarea
                            className='review-text'
                            type='text'
                            placeholder="Please leave your review here..."
                            value={userReview}
                            onChange={(e) => {
                                setUserReview(e.target.value)
                            }}
                        />
                    </label>
                </div>
                <div>
                    <button className='update-review-button' type="submit">
                        Update Review
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditReview;
