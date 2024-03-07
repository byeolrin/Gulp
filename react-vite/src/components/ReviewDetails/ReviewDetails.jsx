import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ReviewDetails() {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const reviewObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewObj)    

    // console.log('HELLO THIS IS THE REVIEWOBJ:', reviews)
}

export default ReviewDetails;