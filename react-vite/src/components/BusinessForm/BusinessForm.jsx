import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function BusinessForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                    <input
                        className='create-business-input'
                        type='text'
                        placeholder='Business name'
                        value={businessName}
                        // onChange={updateBusinessName}
                        required />
                </div>
            </form>
        </div>
    )
}

export default BusinessForm;