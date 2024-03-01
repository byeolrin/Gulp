import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './BusinessForm.css';
import { thunkCreateBusiness } from "../../redux/business";

function BusinessForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [businessName, setBusinessName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [description, setDescription] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [priceRange, setPriceRange] = useState()
    const [businessURL, setBusinessURL] = useState('')
    const [businessImage, setBusinessImage] = useState('')
    const [formErrors, setFormErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);

    useEffect(() => {
        const errors = {};
        if (!businessName) errors.businessName = 'Business Name is required'
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
        setShowErrors(true);

        console.log('INSIDE THE SUBMIT FUNCTION', formErrors)

        if (!Object.values(formErrors).length) {
            const formData = new FormData();

            console.log('inside appending form')

            formData.append('business_name', businessName)
            formData.append('phone', phoneNumber)
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

            console.log('THIS IS FORMDATA AFTER APPENDING', formData)

            dispatch(thunkCreateBusiness(formData)).then((result) => {
                navigate(`/business/${result.id}`)
            })
        }
    }


    return (
        <div className="business-form-container">
            <h1>THIS IS THE BUSINESS FORM PAGE</h1>
            <form onSubmit={handleSubmit}
                encType="multipart/form-data">
                <div>
                    <label>
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
                    {showErrors && errors.businessName && (
                        <div className="song-form-error">{errors.businessName}</div>
                    )}
                </div>
                <div>
                    <label>
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
                    Create a New Business
                </button>
            </form>
        </div>
    )
}

export default BusinessForm;