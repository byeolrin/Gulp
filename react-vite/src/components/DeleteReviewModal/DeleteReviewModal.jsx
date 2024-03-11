import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveReview } from "../../redux/review";
import { thunkGetOneBusiness } from "../../redux/business";
import './DeleteReviewModal.css';


function DeleteReviewModal({ businessId, reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkRemoveReview(reviewId)).then(() => dispatch(thunkGetOneBusiness(businessId))).then(closeModal());
    }

    return (
        <div className="delete-review-container">
            <h2>Are you sure you want to delete this review?</h2>
            <div className="delete-review-buttons-container">
                <button className='delete-review-button-yes' onClick={handleDelete}>
                    YES
                </button>
                <button className='delete-review-button-no' onClick={closeModal}>
                    NO
                </button>
            </div>
        </div>
    )
}

export default DeleteReviewModal;

