import React, { useState } from "react";
import Navbar from "./navbar";

import './login.css';
import { Link, useNavigate } from "react-router-dom";

import axios from 'axios';

function Login() {

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    //user
    //const [user, setUser] = useState({});

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = () => {
        let err = [];

        if (!username) { err["usernameError"] = "Please Enter Your Username." }
        if (!password) { err["passwordError"] = "Please Enter Your Password." }

        setErrors(err);

        const noError = Object.keys(err).length === 0;

        if (noError) {
            axios.get("http://localhost:8088/customer/login/" + username + "/" + password)
                .then((resp) => {
                    //setUser(resp.data);
                    alert("success");
                    localStorage.setItem('user', JSON.stringify(resp.data));
                    navigate("/homepage");
                })
                .catch(error => {
                    setErrMsg(error.response.data);
                });
        }
    }


    //Restaurant
    //const [restaurant, setRestaurant] = useState({});

    const [usernameRes, setUsernameRes] = useState('');
    const [passwordRes, setPasswordRes] = useState('');

    const [errMsgRes, setErrMsgRes] = useState('');

    const handleSubmitRes = () => {
        let err = [];

        if (!usernameRes) { err["usernameResError"] = "Please Enter Your Username." }
        if (!passwordRes) { err["passwordResError"] = "Please Enter Your Password." }

        setErrors(err);

        const noError = Object.keys(err).length === 0;

        if (noError) {
            axios.get("http://localhost:8088/restaurant/login/" + usernameRes + "/" + passwordRes)
                .then((resp) => {
                    //setRestaurant(resp.data);
                    alert("success");
                    localStorage.setItem('restaurant', JSON.stringify(resp.data));
                    navigate("/restaurant/homepage");
                })
                .catch(error => {
                    setErrMsgRes(error.response.data);
                });
        }
    }

    // Admin
    // const [admin, setAdmin] = useState({});

    // const [usernameAd, setUsernameAd] = useState('');
    // const [passwordAd, setPasswordAd] = useState('');

    // const [errMsgAd, setErrMsgAd] = useState('');

    // const handleSubmitAd = () => {
    //     let err = [];

    //     if (!usernameAd) { err["usernameResError"] = "Please Enter Your Username." }
    //     if (!passwordAd) { err["passwordResError"] = "Please Enter Your Password." }

    //     setErrors(err);

    //     const noError = Object.keys(err).length === 0;

    //     if (noError) {
    //         axios.get("http://localhost:8088/admin/login/" + usernameAd + "/" + passwordAd)
    //             .then((resp) => {
    //                 setAdmin(resp.data);
    //                 alert("success");
    //                 localStorage.setItem('admin', JSON.stringify(resp.data));
    //                 //navigate("/");
    //             })
    //             .catch(error => {
    //                 setErrMsgAd(error.response.data);
    //             });
    //     }
    // }


    // Delivery Boy
    //const [deliveryBoy, setDelivery] = useState({});

    const [usernameDB, setUsernameDB] = useState('');
    const [passwordDB, setPasswordDB] = useState('');

    const [errMsgDB, setErrMsgDB] = useState('');

    const handleSubmitDB = () => {
        let err = [];

        if (!usernameDB) { err["usernameDBError"] = "Please Enter Your Username." }
        if (!passwordDB) { err["passwordDBError"] = "Please Enter Your Password." }

        setErrors(err);

        const noError = Object.keys(err).length === 0;

        if (noError) {
            axios.get("http://localhost:8088/deliveryboy/login/" + usernameDB + "/" + passwordDB)
                .then((resp) => {
                    //setDelivery(resp.data);
                    alert("success");
                    localStorage.setItem('deliveryboy', JSON.stringify(resp.data));
                    navigate("/delivery/homepage");
                })
                .catch(error => {
                    setErrMsgDB(error.response.data);
                });
        }
    }


    //toggle
    const [userLogin, setUserLogin] = useState(true);
    const [restaurantLogin, setRestaurantLogin] = useState(false);
   // const [adminLogin, setAdminLogin] = useState(false);
    const [deliveryBoyLogin, setDeliveryBoyLogin] = useState(false);

    const loginUser = () => {
        setUserLogin(true);
        setRestaurantLogin(false);
       // setAdminLogin(false);
        setDeliveryBoyLogin(false);
    }
    const loginRestaurant = () => {
        setUserLogin(false);
        setRestaurantLogin(true);
      //  setAdminLogin(false);
        setDeliveryBoyLogin(false);
    }
    // const loginAdmin = () => {
    //     setUserLogin(false);
    //     setRestaurantLogin(false);
    //     setAdminLogin(true);
    //     setDeliveryBoyLogin(false);
    // }
    const loginDeliveryBoy = () => {
        setUserLogin(false);
        setRestaurantLogin(false);
       // setAdminLogin(false);
        setDeliveryBoyLogin(true);
    }

    return (
        <div className="container-fluid page" style={{ padding: "1rem", margin: "0px", paddingBottom:"1.8rem" }}>

            <Navbar />

            <div className="container login p-4 mt-3" style={{ width: "25vw" }}>
                <div className="four ui buttons" >
                    <button style={{
                        cursor: "pointer", margin: "0", transition: "all ease-in-out .2s",
                        // borderBottom: userLogin ? "1px solid #fcb103" : ""    
                    }}
                        className={userLogin ? "mini ui button blue" : "mini ui button"}
                        onClick={loginUser}>User</button>
                    <button style={{
                        cursor: "pointer", margin: "0", transition: "all ease-in-out .2s",
                        // borderBottom: restaurantLogin ? "1px solid #fcb103" : ""   
                    }}
                        className={restaurantLogin ? "mini ui button blue" : "mini ui button"}
                        onClick={loginRestaurant}>Shop</button>
                    {/* <button style={{
                        cursor: "pointer", margin: "0", transition: "all ease-in-out .2s",
                        // borderBottom: adminLogin ? "1px solid #fcb103" : ""   
                    }}
                        className={adminLogin ? "mini ui button blue" : "mini ui button"}
                        onClick={loginAdmin}>Admin</button> */}
                    <button style={{
                        cursor: "pointer", margin: "0", transition: "all ease-in-out .2s",
                        // borderBottom: adminLogin ? "1px solid #fcb103" : ""   
                    }}
                        className={deliveryBoyLogin ? "mini ui button blue" : "mini ui button"}
                        onClick={loginDeliveryBoy}>Delivery</button>
                </div>
                {
                    userLogin &&
                    <div className="contariner-fluid text-left ui form p-3" style={{ marginBottom: "1px" }}>
                        <div className="heading text-center pb-5">
                            <h1 style={{ fontSize: "2rem", fontWeight: "400" }}>customer</h1>
                            {
                                errMsg &&
                                <div className="ui red small message">{errMsg}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username" value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                            {
                                errors.usernameError &&
                                <div className="ui red mini message">{errors.usernameError}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <label>Pasworrd</label>
                            <input type="password" name="password" placeholder="Password" value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                            {
                                errors.passwordError &&
                                <div className="ui red mini message">{errors.passwordError}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <button className="fluid ui yellow button" onClick={handleSubmit}>Login</button>
                        </div>
                        <div className="field text-center">
                            <p>Don't have an account ? <Link to={"/signup"}>SignUp</Link></p>
                        </div>
                    </div>
                }
                {
                    restaurantLogin &&
                    <div className="contariner-fluid text-left ui form p-3" style={{ marginBottom: "1px" }}>
                        <div className="heading text-center pb-5">
                            <h1 style={{ fontSize: "2rem", fontWeight: "400" }}>Admin Login</h1>
                            {
                                errMsgRes &&
                                <div className="ui red small message">{errMsgRes}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username" value={usernameRes}
                                onChange={(event) => setUsernameRes(event.target.value)} />
                            {
                                errors.usernameResError &&
                                <div className="ui red mini message">{errors.usernameResError}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <label>Pasworrd</label>
                            <input type="password" name="password" placeholder="Password" value={passwordRes}
                                onChange={(event) => setPasswordRes(event.target.value)} />
                            {
                                errors.passwordResError &&
                                <div className="ui red mini message">{errors.passwordResError}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <button className="fluid ui yellow button" onClick={handleSubmitRes}>Login</button>
                        </div>
                        <div className="field text-center">
                            <p>Don't have an account ? <Link to={"/signup/restaurant"}>SignUp</Link></p>
                        </div>
                    </div>
                }
                {/* {
                    adminLogin &&
                    <div className="contariner-fluid text-left ui form p-3" style={{ marginBottom: "2.5rem" }}>
                        <div className="heading text-center pb-5">
                            <h1 style={{ fontSize: "2rem", fontWeight: "400" }}>Admin Login</h1>
                            {
                                errMsgAd &&
                                <div className="ui red small message">{errMsgAd}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username" value={usernameAd}
                                onChange={(event) => setUsernameAd(event.target.value)} />
                            {
                                errors.usernameAdError &&
                                <div className="ui red mini message">{errors.usernameAdError}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <label>Pasworrd</label>
                            <input type="password" name="password" placeholder="Password" value={passwordAd}
                                onChange={(event) => setPasswordAd(event.target.value)} />
                            {
                                errors.passwordAdError &&
                                <div className="ui red mini message">{errors.passwordAdError}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <button className="fluid ui yellow button" onClick={handleSubmitAd}>Login</button>
                        </div>
                    </div>
                } */}
                {
                    deliveryBoyLogin &&
                    <div className="contariner-fluid text-left ui form p-3" style={{ marginBottom: "2.5rem" }}>
                        <div className="heading text-center pb-5">
                            <h1 style={{ fontSize: "2rem", fontWeight: "400" }}>Delivery Boy Login</h1>
                            {
                                errMsgDB &&
                                <div className="ui red small message">{errMsgDB}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username" value={usernameDB}
                                onChange={(event) => setUsernameDB(event.target.value)} />
                            {
                                errors.usernameAdError &&
                                <div className="ui red mini message">{errors.usernameAdError}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <label>Pasworrd</label>
                            <input type="password" name="password" placeholder="Password" value={passwordDB}
                                onChange={(event) => setPasswordDB(event.target.value)} />
                            {
                                errors.passwordAdError &&
                                <div className="ui red mini message">{errors.passwordDBError}</div>
                            }
                        </div>
                        <div className="field pb-3">
                            <button className="fluid ui yellow button" onClick={handleSubmitDB}>Login</button>
                        </div>
                    </div>
                }
            </div>


        </div>
    )
}

export default Login;