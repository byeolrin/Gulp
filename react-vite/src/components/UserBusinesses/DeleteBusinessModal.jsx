import { useDispatch } from "react-redux";
import { thunkRemoveBusiness, thunkUserBusinesses } from "../../redux/business";
import { useModal } from "../../context/Modal";

function DeleteBusinessModal({ businessId, userId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkRemoveBusiness(businessId)).then(() => dispatch(thunkUserBusinesses(userId))).then(() => closeModal());
    }


    return (
        <>
            <button onClick={handleDelete}>
                YES
            </button>
            <button onClick={closeModal}>
                NO
            </button>
        </>
    )
}

export default DeleteBusinessModal;