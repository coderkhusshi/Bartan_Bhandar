import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarRestaurant() {

    const r = JSON.parse(localStorage.getItem("restaurant"));

    const navigate = useNavigate();

    const logout = () => {
        if (r !== null) {
            localStorage.removeItem("restaurant");
            alert("Logout Successful");
            navigate('/');
        }
    }

    return (
        <div className="container-fluid" style={{ background: "transparent" }}>
            <div className="navigation">
                <div className="ui secondary menu">
                <h1 className="item" style={{ fontWeight: "bold" }}>
                        Ravi<span style={{ color: "#fcb103" }}>Bartan</span><span style={{ fontWeight: "bold" }}>Bhandar</span>
                    </h1>
                    <Link to={"/restaurant/homepage"} className="item" id="home">
                        <i class="home icon"></i>
                        Home
                    </Link>
                    <Link className="item" id="contact">
                        <i class="phone icon"></i>
                        Contact
                    </Link>
                    <Link to={"/restaurant/menu"} className="item" id="restaurant">
                        <i class="food icon"></i>
                        Categories
                    </Link>
                    <Link to={"/restaurant/order"} className="item" id="order">
                        Orders
                    </Link>

                    <div className="right menu">
                        <div className="item">
                            <div className="ui icon input">
                                <input type="text" placeholder="Search..." />
                                <i className="search link icon"></i>
                            </div>
                        </div>
                        <Link to={`/restaurant/update/${r.id}`} className="item" id="update">
                            <i class="edit icon"></i>
                            Update
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

export default NavbarRestaurant;