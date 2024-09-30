import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

    // const home = document.getElementById("home");
    // const about = document.getElementById("about");
    // const contact = document.getElementById("contact");

    // const activeHome = () => {
    //     home.classList.add("active");
    //     about.classList.remove("active");
    //     contact.classList.remove("active")
    // }

    return (
        <div className="container-fluid" style={{ background: "transparent" }}>
            <div className="navigation">
                <div className="ui secondary  menu">
                    <h1 className="item" style={{ fontWeight: "bold" }}>
                        Ravi<span style={{ color: "#fcb103" }}>Bartan</span><span style={{ fontWeight: "bold" }}>Bhandar</span>
                    </h1>
                    <Link to={"/"} className="item" id="home">
                        <i class="home icon"></i>
                        Home
                    </Link>
                    <a className="item" id="about" href="/">
                        <i class="globe icon"></i>
                        About
                    </a>
                    <a className="item" id="contact" href="/">
                        <i class="phone icon"></i>
                        Contact
                    </a>
                    <div className="right menu">
                        <div className="item">
                            <div className="ui icon input">
                                <input type="text" placeholder="Search..." />
                                <i className="search link icon"></i>
                            </div>
                        </div>
                        <Link to={"/login"} className="ui item">
                            <i class="sign in alternate icon"></i>
                            Login
                        </Link>
                        <Link to={"/signup"} className="ui item">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Navbar;