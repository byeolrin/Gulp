import { useDispatch } from "react-redux";
import { thunkRemoveBusiness, thunkUserBusinesses } from "../../redux/business";
import { useModal } from "../../context/Modal";
import './DeleteBusinessModal.css';

function DeleteBusinessModal({ businessId, userId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkRemoveBusiness(businessId)).then(() => dispatch(thunkUserBusinesses(userId))).then(() => closeModal());
    }


    return (
        <div className="delete-business-modal-container">
            <h2>Are you sure you want to delete this business?</h2>
            <div className="delete-business-buttons-container">
                <button className="delete-business-button-yes" onClick={handleDelete}>
                    YES
                </button>
                <button className="delete-business-button-no" onClick={closeModal}>
                    NO
                </button>
            </div>
        </div>
    )
}

export default DeleteBusinessModal;