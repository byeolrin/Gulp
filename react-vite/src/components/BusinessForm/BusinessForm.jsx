import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateBusiness } from "../../redux/business";
import './BusinessForm.css';

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
    const [fileName, setFileName] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        const errors = {};
        if (!businessName || businessName.length < 3) errors.businessName = 'Business Name is required and needs to be more than 5 characters'
        if (!phoneNumber || String(phoneNumber).length !== 10) errors.phoneNumber = 'Please provide a valid phone number that contains 10 digit in xxx-xxx-xxxx format'
        if (!address) errors.address = 'Address is required';
        if (!city) errors.city = 'City is required';
        if (!state) errors.state = 'State is required';
        if (!zipcode || String(zipcode).length !== 5) errors.zipcode = 'Please provide a valid Zipcode that contains 5 digit';
        if (!description) errors.description = 'Description is required';
        if (!latitude || isNaN(latitude) || latitude < -90 || latitude > 90) errors.latitude = 'Latitude must be a valid number between -90 and 90';
        if (!longitude || isNaN(longitude) || longitude < -180 || longitude > 180) errors.longitude = 'Longitude must be a valid number between -180 and 180';
        if (!priceRange) errors.priceRange = 'Price Range is required';
        if (!businessURL || !/^(ftp|http|https):\/\/[^ "]+$/.test(businessURL)) errors.url = 'Please provide a valid URL'
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

            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + ', ' + pair[1])
            // }

            await dispatch(thunkCreateBusiness(formData)).then((result) => {
                navigate(`/business/${result.id}`)
            })
        }
    }

    if (!user) {
        navigate('/businesses')
    }

    return (
        <div className="business-form-container">
            <h1>Welcome to Gulp! Let&apos;s get started with your business information</h1>
            <form onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="business-form">
                <div className="all-business-form-inputs">
                    <div className='business-form-input-label'>
                        <div className="business-name-phone-container">
                            {submitted && formErrors.businessName && (
                                <div className="form-error">{formErrors.businessName}</div>
                            )}
                            <input
                                className='business-form-name-input'
                                type='text'
                                placeholder='Business Name'
                                value={businessName}
                                onChange={(e) => {
                                    setBusinessName(e.target.value)
                                }}
                                required />
                            {submitted && formErrors.phoneNumber && (
                                <div className="form-error">{formErrors.phoneNumber}</div>
                            )}
                            <input
                                className='business-form-phone-input'
                                type='number'
                                placeholder='Phone'
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                }}
                                required />
                        </div>
                        <div className="business-address-container">
                            {submitted && formErrors.address && (
                                <div className="form-error">{formErrors.address}</div>
                            )}
                            <input
                                className='business-form-address-input'
                                type='text'
                                placeholder='Street Address'
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                }}
                                required />
                        </div>
                        <div className="business-city-state-zip-container">
                            {submitted && formErrors.city && (
                                <div className="form-error">{formErrors.city}</div>
                            )}
                            <input
                                className='business-form-city-input'
                                type='text'
                                placeholder='City'
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value)
                                }}
                                required />
                            {submitted && formErrors.state && (
                                <div className="form-error">{formErrors.state}</div>
                            )}
                            <input
                                className='business-form-state-input'
                                type='text'
                                placeholder='State'
                                value={state}
                                onChange={(e) => {
                                    setState(e.target.value)
                                }}
                                required />
                            {submitted && formErrors.zipcode && (
                                <div className="form-error">{formErrors.zipcode}</div>
                            )}
                            <input
                                className='business-form-zip-input'
                                type='number'
                                placeholder='ZIP Code'
                                value={zipcode}
                                onChange={(e) => {
                                    setZipcode(e.target.value)
                                }}
                                required />
                        </div>
                        <div className="business-description-container">
                            {submitted && formErrors.description && (
                                <div className="form-error">{formErrors.description}</div>
                            )}
                            <textarea
                                className='business-description-input'
                                type='text'
                                placeholder='Please tell me something about your business...'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                required />
                        </div>
                        <div className="business-lat-lng-container">
                            {submitted && formErrors.latitude && (
                                <div className="form-error">{formErrors.latitude}</div>
                            )}
                            <input
                                className='business-form-lat-input'
                                type='number'
                                placeholder='Latitude'
                                value={latitude}
                                onChange={(e) => {
                                    setLatitude(e.target.value)
                                }}
                                required />
                            {submitted && formErrors.longitude && (
                                <div className="form-error">{formErrors.longitude}</div>
                            )}
                            <input
                                className='business-form-lng-input'
                                type='number'
                                placeholder='Longitude'
                                value={longitude}
                                onChange={(e) => {
                                    setLongitude(e.target.value)
                                }}
                                required />
                        </div>
                        <div className="business-price-range-container">
                            {submitted && formErrors.priceRange && (
                                <div className="form-error">{formErrors.priceRange}</div>
                            )}
                            <div className="business-form-label">
                                Price Range
                            </div>
                            <label className="price-range-radio">
                                <input
                                    type="radio"
                                    value="1"
                                    checked={priceRange === "1"}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    required
                                />
                                $
                            </label>
                            <label className="price-range-radio">
                                <input
                                    type="radio"
                                    className="create-business-input"
                                    value="2"
                                    checked={priceRange === "2"}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    required
                                />
                                $$
                            </label>
                            <label className="price-range-radio">
                                <input
                                    type="radio"
                                    className="create-business-input"
                                    value="3"
                                    checked={priceRange === "3"}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    required
                                />
                                $$$
                            </label>
                            <label className="price-range-radio">
                                <input
                                    type="radio"
                                    className="create-business-input"
                                    value="4"
                                    checked={priceRange === "4"}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    required
                                />
                                $$$$
                            </label>
                        </div>
                        <div className="business-url-container">
                            {submitted && formErrors.url && (
                                <div className="form-error">{formErrors.url}</div>
                            )}
                            <div className="business-url-label">
                                Website Link
                            </div>
                            <input
                                className='business-form-url-input'
                                type='url'
                                placeholder='URL'
                                value={businessURL}
                                onChange={(e) => {
                                    setBusinessURL(e.target.value)
                                }}
                                required />
                        </div>
                        <div className="business-image-container">
                            {submitted && formErrors.businessImage && (
                                <div className="form-error">{formErrors.businessImage}</div>
                            )}
                            <div className="business-image-label">
                                Business Image
                            </div>
                            <label htmlFor='business-image-upload' className="business-image-button">
                                <input
                                    id='business-image-upload'
                                    type='file'
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setBusinessImage(e.target.files[0])
                                        setFileName(e.target.files[0].name)
                                    }}
                                    required />
                                Choose Your Image
                            </label>
                            {fileName && <div className="file-name">{fileName}</div>}
                        </div>
                    </div>
                </div>
                <button className='submit-form-button' type="submit">
                    Create a New Business
                </button>
            </form>
        </div>
    )
}

export default BusinessForm;