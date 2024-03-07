import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveReview } from "../../redux/review";
import { thunkGetOneBusiness } from "../../redux/business";

function DeleteReviewModal({ businessId, reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkRemoveReview(reviewId)).then(() => dispatch(thunkGetOneBusiness(businessId))).then(closeModal());
    }

    return (
        <>
        <h2>Are you sure you want to delete this review?</h2>
        <button onClick={handleDelete}>
                    YES
                </button>
                <button onClick={closeModal}>
                    NO
                </button>
        </>
    )
}

export default DeleteReviewModal;

