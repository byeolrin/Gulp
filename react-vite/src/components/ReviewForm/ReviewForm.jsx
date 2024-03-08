import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateReview } from "../../redux/review";
import { FaStar } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import { thunkGetOneBusiness } from "../../redux/business";
import './ReviewForm.css';

function ReviewForm({ businessId }) {
    const dispatch = useDispatch();

    const [review, setReview] = useState('')
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [formErrors, setFormErrors] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const { closeModal } = useModal()

    const currentBusiness = useSelector((state) => state.businesses.oneBusiness.business)


    useEffect(() => {
        const errors = {};
        if (!review) errors.review = 'Review text is required'
        if (!rating || rating < 1 || rating > 5) errors.rating = 'Please select a rating'

        setFormErrors(errors);
    }, [review, rating])

    // console.log('THIS IS THE BUSINESSID IN REVIEW MODAL', businessId)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!Object.values(formErrors).length) {
            const formData = new FormData();

            formData.append('businessId', businessId)
            formData.append('review', review)
            formData.append('rating', rating)
            formData.append('submit', true)

            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1])
            }

            await dispatch(thunkCreateReview(formData)).then(closeModal).then(() => {
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
                            value={review}
                            onChange={(e) => {
                                setReview(e.target.value)
                            }}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">
                        Post Review
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm;
