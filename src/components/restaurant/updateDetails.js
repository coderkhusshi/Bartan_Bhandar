import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarRestaurant from "./navbar";

import './updateDetails.css'

function UpdateDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [resId, setResId] = useState();
    const [resName, setResName] = useState();
    const [resDesc, setResDesc] = useState();
    const [resContact, setResContact] = useState();
    const [resEmail, setResEmail] = useState();
    const [resLocation, setResLocation] = useState();
    const [resAddress, setResAddress] = useState();
    const [resCity, setResCity] = useState();
    const [resPincode, setResPincode] = useState();
    const [resUsername, setResUsername] = useState();
    const [resPassword, setResPassword] = useState();

    const [errors, setErrors] = useState({});

    const [restaurantImage, setRestaurantImage] = useState(null);

    const [preview, setPreview] = useState(null);

    const [imageId, setImageId] = useState(0);

    useEffect(() => {
        (async () => {
            await axios.get(`http://localhost:8088/restaurant/id/${id}`)
                .then(resp => {

                    setResId(resp.data.id);
                    setResName(resp.data.name);
                    setResDesc(resp.data.description);
                    setResContact(resp.data.contact);
                    setResEmail(resp.data.email);
                    setResLocation(resp.data.location);
                    setResAddress(resp.data.address);
                    setResCity(resp.data.city);
                    setResPincode(resp.data.pincode);
                    setResUsername(resp.data.username);
                    setResPassword(resp.data.password);
                });

            await axios.get(`http://localhost:8088/image/restaurant/imageid/${id}`)
                .then(resp => {
                    setImageId(resp.data);
                })

            const img = await fetch(`http://localhost:8088/image/restaurant/res/${id}`, {
                //mode: "no-cors", // 'cors' by default
            });
            const blob = await img.blob();
            const url = URL.createObjectURL(blob);
            setRestaurantImage(url);
        })();
    }, [id]);


    const handleSubmit = () => {
        let err = [];

        const validString = new RegExp("^[a-zA-Z\\s]+$");
        const validPhoneNo = new RegExp("^[1-9][0-9]{9}$");
        const validPincode = new RegExp("^[1-9][0-9]{5}$");
        const validEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[\\.][a-zA-Z]{3}$");


        if (!resName || !validString.test(resName)) { err["nameError"] = "Enter a valid Name." }
        if (!resLocation || !validString.test(resLocation)) { err["locationError"] = "Enter a valid Name." }
        if (!resContact || !validPhoneNo.test(resContact)) { err["contactError"] = "Enter a valid Phone No." }
        if (!resCity || !validString.test(resCity)) { err["cityError"] = "Enter a valid City Name." }
        if (!resPincode || !validPincode.test(resPincode)) { err["pincodeError"] = "Enter a valid Pincode." }
        if (!resEmail || !validEmail.test(resEmail)) { err["emailError"] = "Enter a valid Email." }



        if (!resUsername) { err['usernameError'] = "Enter a valid Username." }
        if (!resDesc) { err['descriptionError'] = "Enter a some Description." }
        if (!resPassword) { err['passwordError'] = "Enter a valid Password." }
        if (!resAddress) { err['addressError'] = "Enter a valid Address." }
        if (!restaurantImage || restaurantImage instanceof File) { err['restaurantImageError'] = "Add an image." }


        setErrors(err);

        const noError = Object.keys(err).length === 0;

        if (noError) {
            const updatedRestaurant = {
                id: resId,
                name: resName,
                description: resDesc,
                location: resLocation,
                email: resEmail,
                contact: resContact,
                username: resUsername,
                password: resPassword,
                address: resAddress,
                city: resCity,
                pincode: resPincode
            }

            //console.log(updatedRestaurant);

            axios.put("http://localhost:8088/restaurant/update", updatedRestaurant)
                .then(resp => {
                    alert("Updated Successully");
                    navigate("/restaurant/homepage");
                })
                .catch(error => {
                    alert(error.response.data);
                })
        }

    }

    const handleRestaurantImage = (e) => {

        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);

        setRestaurantImage(file);
    }


    const updateImage = () => {
        const updatedImageData = new FormData();
        updatedImageData.append("restaurantImage", restaurantImage);
        console.log(restaurantImage);

        axios.put(`http://localhost:8088/image/restaurant/update/${imageId}/${resId}`, updatedImageData).then(resp => {
            alert("Updated Image");
            window.location.reload();
        })
            .catch(error => {
                console.log(error.response.data.message);
            });
    }

    const [showPass, setShowPass] = useState(false);
    const showHidePassword = () => {
        setShowPass(!showPass);
    }



    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarRestaurant />
            </div>


            <div className="row" style={{ margin: "0px" }}>
                <div className="col-sm-5">
                    <div className="image resImg">
                        {
                            preview ?
                                (
                                    <img src={preview} alt="preview" className="restaurantImage"/>
                                ) :
                                (
                                    <img src={restaurantImage} alt="restaurant" className="restaurantImage" />
                                )
                        }
                    </div>
                    <div className="field mb-3">
                        <div className="" style={{display:"inline-flex", placeItems:"baseline"}}>
                            <div className="m-2">
                                <label for="file" class="file-style">
                                    <p><i class="upload icon"></i> Upload Photo</p>
                                </label>
                                <input type="file" class="file" id="file" name="restaurantImage" placeholder="Add Image"
                                    defaultValue={restaurantImage} onChange={handleRestaurantImage} />
                            </div>
                            {
                                errors.restuarantImageError &&
                                <div className="ui red mini message">{errors.restaurantImageError}</div>
                            }

                            <div className="field  m-2">
                                <button className="ui yellow button" onClick={updateImage} style={{ borderRadius: "50px" }}>Update</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-sm-7">
                    <div className="container register text-left ui form p-5 m-5" style={{ width: "45vw" }}>
                        <div className="heading text-center pb-5">
                            <h1>Update Details</h1>
                        </div>
                        <div className="field">
                            <div className="two fields">
                                <div className="field">
                                    <label>Name</label>
                                    <input type="text" name="name" placeholder="Enter Name"
                                        value={resName} onChange={(event) => setResName(event.target.value)} />
                                    {
                                        errors.nameError &&
                                        <div className="ui red mini message">{errors.nameError}</div>
                                    }
                                </div>
                                <div className="field">
                                    <label>Location</label>
                                    <input type="text" name="location" placeholder="Enter Location"
                                        value={resLocation} onChange={(event) => setResLocation(event.target.value)} />
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
                                value={resDesc} onChange={(event) => setResDesc(event.target.value)} />
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
                                        value={resEmail} onChange={(event) => setResEmail(event.target.value)} />
                                    {
                                        errors.emailError &&
                                        <div className="ui red mini message">{errors.emailError}</div>
                                    }
                                </div>
                                <div className="field">
                                    <label>Phone No.</label>
                                    <input type="tel" name="phoneNo" placeholder="Phone No."
                                        value={resContact} onChange={(event) => setResContact(event.target.value)} />
                                    {
                                        errors.contactError &&
                                        <div className="ui red mini message">{errors.contactError}</div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label>Address </label>
                            <textarea type="text" rows={2} name="addressLine1" placeholder="Address"
                                value={resAddress} onChange={(event) => setResAddress(event.target.value)} />
                            {
                                errors.addressError &&
                                <div className="ui red mini message">{errors.addressError}</div>
                            }
                        </div>

                        <div className="field">
                            <div className="two fields">
                                <div className="field">
                                    <label>City</label>
                                    <input type="text" name="city" placeholder="City"
                                        value={resCity} onChange={(event) => setResCity(event.target.value)} />
                                    {
                                        errors.cityError &&
                                        <div className="ui red mini message">{errors.cityError}</div>
                                    }
                                </div>
                                <div className="field">
                                    <label>Pincode</label>
                                    <input type="text" name="pincode" placeholder="Pincode."
                                        value={resPincode} onChange={(event) => setResPincode(event.target.value)} />
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
                                        value={resUsername} onChange={(event) => setResUsername(event.target.value)} />
                                    {
                                        errors.usernameError &&
                                        <div className="ui red mini message">{errors.usernameError}</div>
                                    }
                                </div>
                                <div className="field">
                                    <label>Password</label>
                                    <div className="d-flex">
                                        <input type={showPass ? "text" : "password"} name="password" placeholder="Password"
                                            value={resPassword} onChange={(event) => setResPassword(event.target.value)}></input>
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

                        {/* <div className="field">
                    <label>Upload Image</label>
                    <input type="file" name="restaurantImage" placeholder="Add Image"
                        defaultValue={restaurantImage} onChange={handleRestaurantImage} />
                    {
                        errors.restuarantImageError &&
                        <div className="ui red mini message">{errors.restaurantImageError}</div>
                    }
                </div> */}

                        <br></br>

                        <div className="field">
                            <button className="fluid ui yellow button" onClick={handleSubmit}>Update</button>
                        </div>
                        <div className="fluid">
                            <Link to={`/restaurant/homepage`} className="fluid ui button">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UpdateDetails;