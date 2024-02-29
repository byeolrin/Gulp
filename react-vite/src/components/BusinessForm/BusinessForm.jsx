import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import './BusinessForm.css';

function BusinessForm() {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    const [businessName, setBusinessName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [description, setDescription] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [priceRange, setPriceRange] = useState()
    const [businessURL, setBusinessURL] = useState('')
    const [businessImage, setBusinessImage] = useState('')


    return (
        <div className="business-form-container">
            <h1>THIS IS THE BUSINESS FORM PAGE</h1>
            <form>
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
                            value={zipCode}
                            onChange={(e) => {
                                setZipCode(e.target.value)
                            }}
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        Description
                        <input
                            className='create-business-input'
                            type='text  '
                            placeholder='Please tell me something about your business...'
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            required />
                    </label>
                </div>
            </form>
        </div>
    )
}

export default BusinessForm;