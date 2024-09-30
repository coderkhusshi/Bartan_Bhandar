import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarDeliveryBoy() {

    const d = JSON.parse(localStorage.getItem("deliveryboy"));

    const navigate = useNavigate();

    const logout = () => {
        if (d !== null) {
            localStorage.removeItem("deliveryboy");
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
                    <Link to={"/delivery/homepage"} className="item" id="home">
                        <i class="home icon"></i>
                        Home
                    </Link>
                    <Link to={"/delivery/order/collected"} className="item" id="collectedorders">
                        Collected Orders
                    </Link>
                    {/* <a className="item" id="about">
                        About
                    </a>
                    <a className="item" id="contact">
                        Contact
                    </a>
                    <Link to={"/restaurants"} className="item" id="restaurants">
                        Restaurants
                    </Link>
                    <Link to={`/order/details/${u.id}`} className="item" id="orders">
                        My Orders
                    </Link>  */}

                    <div className="right menu">
                        <div className="item">
                            <div className="ui icon input">
                                <input type="text" placeholder="Search..." />
                                <i className="search link icon"></i>
                            </div>
                        </div>
                        {/* <Link to={"/cart"} className="item" style={{background:"white", color:"black"}}>
                                <i className="icon cart"></i> Cart
                                <div className="floating ui red label">{cartCount}</div>
                        </Link> */}
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

export default NavbarDeliveryBoy;