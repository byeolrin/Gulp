import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkEditBusiness, thunkGetOneBusiness } from "../../redux/business";
import { useNavigate, useParams } from "react-router-dom";

function EditBusiness({business}) {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const business = useSelector(state => state.businesses.oneBusiness.business)

    console.log('THIS IS THE EDIT BUSINESS FORM', business)

    const [businessName, setBusinessName] = useState(business?.business_name)
    const [phoneNumber, setPhoneNumber] = useState(business?.phone)
    const [address, setAddress] = useState(business?.address)
    const [city, setCity] = useState(business?.city)
    const [state, setState] = useState(business?.state)
    const [zipcode, setZipcode] = useState(business?.zipcode)
    const [description, setDescription] = useState(business?.description)
    const [latitude, setLatitude] = useState(business?.latitude)
    const [longitude, setLongitude] = useState(business?.longitude)
    const [priceRange, setPriceRange] = useState(business?.price_range)
    const [businessURL, setBusinessURL] = useState(business?.business_url)
    const [businessImage, setBusinessImage] = useState(business?.business_image)
    const [formErrors, setFormErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(thunkGetOneBusiness(businessId));
    }, [dispatch, businessId])

    useEffect(() => {
        const errors = {};
        if (!businessName || businessName.length < 3) errors.businessName = 'Business Name is required and needs to be more than 5 characters'
        if (!phoneNumber) errors.phoneNumber = 'Please provide a valid phone number'
        if (!address) errors.address = 'Address is required';
        if (!city) errors.city = 'City is required';
        if (!state) errors.state = 'State is required';
        if (!zipcode) errors.zipcode = 'ZIP Code is required';
        if (!description) errors.description = 'Description is required';
        if (!latitude) errors.latitude = 'Latitude is required';
        if (!longitude) errors.longitude = 'Longitude is required';
        if (!priceRange) errors.priceRange = 'Price Range is required';
        if (!businessURL) errors.businessURL = 'Business URL is required';
        if (!businessImage) errors.businessImage = 'Business Image is required';

        setFormErrors(errors);
    }, [businessName, phoneNumber, address, city, state, zipcode, description, latitude, longitude, priceRange, businessURL, businessImage])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        // console.log('INSIDE THE SUBMIT FUNCTION', formErrors)

        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
        const formattedPhoneNumber = cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

        if (!Object.values(formErrors).length) {
            const formData = new FormData();

            formData.append('business_name', businessName)
            formData.append('phone', formattedPhoneNumber)
            formData.append('address', address)
            formData.append('city', city)
            formData.append('state', state)
            formData.append('zipcode', zipcode)
            formData.append('description', description)
            formData.append('latitude', parseFloat(latitude).toFixed(4))
            formData.append('longitude', parseFloat(longitude).toFixed(4))
            formData.append('price_range', parseInt(priceRange))
            formData.append('business_url', businessURL)
            formData.append('business_image', businessImage)
            formData.append('submit', true)

            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1])
            }

            dispatch(thunkEditBusiness(formData)).then((result) => {
                navigate(`/business/${result.id}`)
            })
        }
    }

    return (
        <div className="business-form-container">
            <h1>THIS IS THE UPDATE BUSINESS FORM PAGE</h1>
            <form onSubmit={handleSubmit}
                encType="multipart/form-data">
                <div>
                    <label>
                        {submitted && formErrors.businessName && (
                            <div className="form-error">{formErrors.businessName}</div>
                        )}
                        Name
                        <input
                            className='create-business-input'
                            type='text'
                            placeholder='Business Name'
                            value={businessName}
                            onChange={(e) => {
                                setBusinessName(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>{submitted && formErrors.phoneNumber && (
                            <div className="form-error">{formErrors.phoneNumber}</div>
                        )}
                        Phone Number
                        <input
                            className='create-business-input'
                            type='text'
                            placeholder='xxx-xxx-xxxx'
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        Address
                        <input
                            className='create-business-input'
                            type='text'
                            placeholder='Street Address'
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        City
                        <input
                            className='create-business-input'
                            type='text'
                            placeholder='City'
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        State
                        <input
                            className='create-business-input'
                            type='text'
                            placeholder='State'
                            value={state}
                            onChange={(e) => {
                                setState(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>
                    {submitted && formErrors.zipcode && (
                            <div className="form-error">{formErrors.zipcode}</div>
                        )}
                        ZIP Code
                        <input
                            className='create-business-input'
                            type='number'
                            placeholder='ZIP Code'
                            value={zipcode}
                            onChange={(e) => {
                                setZipcode(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        Description
                        <input
                            className='create-business-input'
                            type='text'
                            placeholder='Please tell me something about your business...'
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        Latitude
                        <input
                            className='create-business-input'
                            type='text'
                            placeholder='Latitude'
                            value={latitude}
                            onChange={(e) => {
                                setLatitude(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        Longitude
                        <input
                            className='create-business-input'
                            type='text'
                            placeholder='Longitude'
                            value={longitude}
                            onChange={(e) => {
                                setLongitude(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        Price Range
                    </label>
                    <div>
                        <label>
                            $
                            <input
                                type="radio"
                                className="create-business-input"
                                value="1"
                                checked={priceRange === "1"}
                                onChange={(e) => setPriceRange(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            $$
                            <input
                                type="radio"
                                className="create-business-input"
                                value="2"
                                checked={priceRange === "2"}
                                onChange={(e) => setPriceRange(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            $$$
                            <input
                                type="radio"
                                className="create-business-input"
                                value="3"
                                checked={priceRange === "3"}
                                onChange={(e) => setPriceRange(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            $$$$
                            <input
                                type="radio"
                                className="create-business-input"
                                value="4"
                                checked={priceRange === "4"}
                                onChange={(e) => setPriceRange(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <label>
                        Website Link
                        <input
                            className='create-business-input'
                            type='text'
                            placeholder='URL'
                            value={businessURL}
                            onChange={(e) => {
                                setBusinessURL(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        Business Image
                        <input
                            className='create-business-input'
                            type='file'
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                                setBusinessImage(e.target.files[0])
                            }}
                            required />
                    </label>
                </div>
                <button type="submit">
                    Update Business
                </button>
            </form>
        </div>
    )
}

export default EditBusiness;