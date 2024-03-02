import { useDispatch, useSelector } from "react-redux";
import EditBusiness from "./EditBusiness";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { thunkGetOneBusiness } from "../../redux/business";

function TestingEditBusiness() {
    const { businessId } = useParams();
    const business = useSelector(state => state.businesses.oneBusiness.business)
    const dispatch = useDispatch();

    console.log('THIS IS THE TESTING EDIT BUSINESS FORM', business)

    useEffect(() => {
        dispatch(thunkGetOneBusiness(businessId));
    }, [dispatch, businessId])

    return (
        <EditBusiness business={business}/>
    )
}

export default TestingEditBusiness;