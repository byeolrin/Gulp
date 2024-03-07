import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateReview } from "../../redux/review";
import { FaStar } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import { thunkGetOneBusiness } from "../../redux/business";

function ReviewForm({ businessId }) {
    const dispatch = useDispatch();

    const [review, setReview] = useState('')
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [formErrors, setFormErrors] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const { closeModal } = useModal()

    useEffect(() => {
        const errors = {};
        if (!review) errors.review = 'Review text is required'
        if (!rating || rating < 1 || rating > 5) errors.rating = 'Please provide a valid rating'

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

            dispatch(thunkCreateReview(formData)).then(closeModal).then(() => {
                dispatch(thunkGetOneBusiness(businessId))
            })
        }
    }

    return (
        <div className="review-form-container">
            <h1>THIS IS REVIEW FORM MODAL</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        {submitted && formErrors.review && (
                            <div className="form-error">{formErrors.review}</div>
                        )}
                        Review
                        <input
                            className='create-review-input'
                            type='text'
                            placeholder="Please leave your review here..."
                            value={review}
                            onChange={(e) => {
                                setReview(e.target.value)
                            }}
                            required />
                    </label>
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
                                            ratingValue <= (hover || rating) ? "#ff9966" : "#e4e5e9"
                                        }
                                        size={35}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            )
                        })}
                    </div>
                    <button type="submit">
                        Post Review
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm;
