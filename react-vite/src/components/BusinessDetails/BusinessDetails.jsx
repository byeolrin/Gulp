import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetOneBusiness } from "../../redux/business";

function BusinessDetails() {
    const { businessId } = useParams();
    const dispatch = useDispatch();

    const currentBusiness = useSelector((state) => state.businesses.oneBusiness.business);
    
    // console.log('THIS IS THE CURRENT BUSINESS', currentBusiness)
    
    useEffect(() => {
        dispatch(thunkGetOneBusiness(businessId));
    }, [dispatch, businessId])

    return (
        <div>
            <h2>{currentBusiness?.business_name}</h2>
            <p>{currentBusiness?.description}</p>
        </div>
    )
    
}

export default BusinessDetails;