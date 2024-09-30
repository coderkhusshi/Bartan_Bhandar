import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

import './register.css';

function RegisterRestaurant() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');

    const [restaurantImage, setRestaurantImage] = useState();

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleRestaurantImage = (e) => {
        console.log(e.target.files);
        setRestaurantImage(e.target.files[0]);
    }

    const handleSubmit = () => {
        let err = [];

        const validString = new RegExp("^[a-zA-Z\\s]+$");
        const validPhoneNo = new RegExp("^[1-9][0-9]{9}$");
        const validPincode = new RegExp("^[1-9][0-9]{5}$");
        const validEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[\\.][a-zA-Z]{3}$");


        if (!name || !validString.test(name)) { err["nameError"] = "Enter a valid Name." }
        if (!location || !validString.test(location)) { err["locationError"] = "Enter a valid Name." }
        if (!contact || !validPhoneNo.test(contact)) { err["contactError"] = "Enter a valid Phone No." }
        if (!city || !validString.test(city)) { err["cityError"] = "Enter a valid City Name." }
        if (!pincode || !validPincode.test(pincode)) { err["pincodeError"] = "Enter a valid Pincode." }
        if (!email || !validEmail.test(email)) { err["emailError"] = "Enter a valid Email." }



        if (!username) { err['usernameError'] = "Enter a valid Username." }
        if (!description) { err['descriptionError'] = "Enter a some Description." }
        if (!password) { err['passwordError'] = "Enter a valid Password." }
        if (!addressLine1) { err['address1Error'] = "Enter a valid Adress." }
        if (!addressLine2) { err['address2Error'] = "Enter a valid Address." }
        if (!restaurantImage) { err['restaurantImageError'] = "Add an image." }


        setErrors(err);

        const noError = Object.keys(err).length === 0;

        if (noError) {
            const restaurant = {
                name: name,
                description: description,
                location: location,
                email: email,
                contact: contact,
                username: username,
                password: password,
                address: addressLine1 + " " + addressLine2 + " " + city,
                city: city,
                pincode: pincode
            }

            console.log(restaurant);

            const imageData = new FormData();
            imageData.append('restaurantImage', restaurantImage);

            axios.post("http://localhost:8088/restaurant/add", restaurant)
                .then(resp => {
                    axios.post("http://localhost:8088/image/restaurant/upload/" + resp.data.id, imageData).then(res => {
                        alert("Registered Successully");
                        navigate("/login");
                    });
                })
                .catch(error => {
                    alert(error.response.data);
                })
        }

    }

    const [showPass, setShowPass] = useState(false);
    const showHidePassword = () => {
        setShowPass(!showPass);
    }


    return (
        <div className="container-fluid page" style={{ padding: "1rem", margin: "0px" }}>

            <Navbar />

            <div className="container register text-left ui form p-5 m-5" style={{ width: "45vw" }}>
                <div className="heading text-center pb-5">
                    <h1>Register</h1>
                </div>
                <div className="field">
                    <div className="two fields">
                        <div className="field">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="Enter Name"
                                value={name} onChange={(event) => setName(event.target.value)} />
                            {
                                errors.nameError &&
                                <div className="ui red mini message">{errors.nameError}</div>
                            }
                        </div>
                        <div className="field">
                            <label>Location</label>
                            <input type="text" name="location" placeholder="Enter Location"
                                value={location} onChange={(event) => setLocation(event.target.value)} />
                            {
                                errors.locationError &&
                                <div className="ui red mini message">{errors.locationError}</div>
                            }
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label>Description</label>
                    <input type="text" name="description" placeholder="Description about your Restaurant ..."
                        value={description} onChange={(event) => setDescription(event.target.value)} />
                    {
                        errors.descriptionError &&
                        <div className="ui red mini message">{errors.descriptionError}</div>
                    }
                </div>

                <div className="field">
                    <div className="two fields">
                        <div className="field">
                            <label>Email</label>
                            <input type="text" name="email" placeholder="Email"
                                value={email} onChange={(event) => setEmail(event.target.value)} />
                            {
                                errors.emailError &&
                                <div className="ui red mini message">{errors.emailError}</div>
                            }
                        </div>
                        <div className="field">
                            <label>Phone No.</label>
                            <input type="tel" name="phoneNo" placeholder="Phone No."
                                value={contact} onChange={(event) => setContact(event.target.value)} />
                            {
                                errors.contactError &&
                                <div className="ui red mini message">{errors.contactError}</div>
                            }
                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="two fields">
                        <div className="field">
                            <label>Address Line 1</label>
                            <input type="text" name="addressLine1" placeholder="Address Line 1"
                                value={addressLine1} onChange={(event) => setAddressLine1(event.target.value)} />
                            {
                                errors.address1Error &&
                                <div className="ui red mini message">{errors.address1Error}</div>
                            }
                        </div>
                        <div className="field">
                            <label>Address Line 2</label>
                            <input type="text" name="addressLine2" placeholder="Address Line 2"
                                value={addressLine2} onChange={(event) => setAddressLine2(event.target.value)} />
                            {
                                errors.address2Error &&
                                <div className="ui red mini message">{errors.address2Error}</div>
                            }
                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="two fields">
                        <div className="field">
                            <label>City</label>
                            <input type="text" name="city" placeholder="City"
                                value={city} onChange={(event) => setCity(event.target.value)} />
                            {
                                errors.cityError &&
                                <div className="ui red mini message">{errors.cityError}</div>
                            }
                        </div>
                        <div className="field">
                            <label>Pincode</label>
                            <input type="text" name="pincode" placeholder="Pincode."
                                value={pincode} onChange={(event) => setPincode(event.target.value)} />
                            {
                                errors.pincodeError &&
                                <div className="ui red mini message">{errors.pincodeError}</div>
                            }
                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="two fields">
                        <div className="field">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username"
                                value={username} onChange={(event) => setUsername(event.target.value)} />
                            {
                                errors.usernameError &&
                                <div className="ui red mini message">{errors.usernameError}</div>
                            }
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <div className="d-flex">
                                <input type={showPass ? "text" : "password"} name="password" placeholder="Password"
                                    value={password} onChange={(event) => setPassword(event.target.value)}></input>
                                <div className="ui icon buttons">
                                    <button className="ui button" onClick={showHidePassword}>
                                        <i className={showPass ? "eye icon" : "eye slash icon"}></i>
                                    </button>
                                </div>
                            </div>
                            {
                                errors.passwordError &&
                                <div className="ui red mini message">{errors.passwordError}</div>
                            }
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label>Upload Image</label>
                    <input type="file" name="restaurantImage" placeholder="Add Image"  
                        defaultValue={restaurantImage} onChange={handleRestaurantImage} />
                    {
                        errors.restuarantImageError &&
                        <div className="ui red mini message">{errors.restaurantImageError}</div>
                    }
                </div>

                <div className="field pb-3">
                    <button className="fluid ui yellow button" onClick={handleSubmit}>Register</button>
                </div>
                <div className="field text-center">
                    <p>Already have an account ? <Link to={"/login"}>Login</Link></p>
                </div>
            </div>


        </div>
    )
}

export default RegisterRestaurant;