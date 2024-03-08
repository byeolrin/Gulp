import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllReviews } from "../../redux/review";

function UserReviews() {
    const dispatch = useDispatch();
    
    // const user = useSelector(state => state.session.user);
    const allReviews = useSelector(state => state.reviews.allReviews)

    console.log('THIS IS THE USER REVIEWS', Object.values(allReviews))

    // const ReviewsArr = Object.values(allReviews)

    // console.log('THIS IS THE REVIEWS ARR', ReviewsArr)

    useEffect(() => {
        dispatch(thunkGetAllReviews())
    },[dispatch])
}

export default UserReviews;