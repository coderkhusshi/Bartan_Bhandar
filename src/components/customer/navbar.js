import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarCustomer() {

    const u = JSON.parse(localStorage.getItem('user'));

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8088/cart/customer/" + u.id)
            .then(resp => {
                setCartCount(resp.data.length);
            })
    }, [u.id])

    const navigate = useNavigate();

    const logout = () => {
        if (u !== null) {
            localStorage.removeItem('user');
            localStorage.removeItem('total');
            alert("Logout Successful");
            navigate('/');
        }
    }

    return (
        <div className="container-fluid" style={{ background: "transparent" }}>
            <div className="navigation">
                <div className="ui secondary menu">
                <h1 className="item" style={{ fontWeight: "bold" }}>
                       Bartan<span style={{ fontWeight: "bold" }}>Bhandar</span>
                    </h1>
                    <Link to={"/homepage"} className="item" id="home">
                        <i class="home icon"></i>
                        Home
                    </Link>
                    <Link className="item" id="about">
                        <i class="globe icon"></i>
                        About
                    </Link>
                    <Link className="item" id="contact">
                        <i class="phone icon"></i>
                        Contact
                    </Link>
                    <Link to={"/restaurants"} className="item" id="restaurants">
                        <i class="food icon"></i>
                        Appliances
                    </Link>
                    <Link to={`/order/details/${u.id}`} className="item" id="orders">
                        My Orders
                    </Link>

                    <div className="right menu">
                        <div className="item">
                            <div className="ui icon input">
                                <input type="text" placeholder="Search..." />
                                <i className="search link icon"></i>
                            </div>
                        </div>
                        <Link to={"/cart"} className="item" style={{ background: "white", color: "black" }}>
                            <i className="icon cart"></i> Cart
                            <div className="floating ui red label">{cartCount}</div>
                        </Link>
                        <button className="ui item ml-3" onClick={logout}>
                            <i class="sign out alternate icon"></i>
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default NavbarCustomer;