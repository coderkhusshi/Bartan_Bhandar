import React from "react";
import NavbarCustomer from "./navbar";
import './homepage.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import spoon from "./images/categories/spoon.jpg";
import kitchenset from "./images/categories/kitchenset.jpg";
import chicken from "./images/categories/chicken.png";
import bowl from "./images/categories/bowl.jpg";
import paratha from "./images/categories/paratha.png";
import tray from "./images/categories/tray.jpg";
import rolls from "./images/categories/rolls.png";
import dinnerset from "./images/categories/dinnerset.jpg";

import nonstick from "./images/categories/nonstick.jpg";

import belgiumwaffle from "./images/brands/belgiumwaffle.png";
import burgerking from "./images/brands/burgerking.png";
import freshmenu from "./images/brands/freshmenu.png";
import lapinoz from "./images/brands/lapinoz.png";
import Milton from "./images/brands/Milton.jpg";
import merwans from "./images/brands/merwans.png";
import natural from "./images/brands/natural.png";
import pizzahut from "./images/brands/pizzahut.png";
import subway from "./images/brands/subway.png";
import theobroma from "./images/brands/theobroma.png";
import plates from "./images/categories/plates.jpg"
import glass from "./images/categories/glass.jpg"

import Footer from "../dashboard/footer";
import Menu from "./menu";

function HomepageCustomer() {

    const user = JSON.parse(localStorage.getItem('user'));

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    }

    

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarCustomer />
            </div>

            {/* <div className="carousel">
                <Carousel/>
            </div> */}

            {/*  <ModalReview /> */}

            <div className="categories pb-3 mb-3" style={{ position: "relative" }}>

                <div className="text-left ml-5 mt-3">
                    <p>Welcome <b style={{textDecoration:"underline"}}>{user.firstName} {user.lastName}</b> !</p>
                </div>

                <div className="heading text-left p-5">
                    <h1>Our Categories</h1>
                    <hr></hr>
                </div>

                <div className="" >
                    <Carousel responsive={responsive}>
                        <div className="category">
                            <img src={plates} alt="plates" />
                            <p>Plate</p>
                        </div>

                        <div className="category">
                            <img src={bowl} alt="bowl" />
                            <p>Bowl</p>
                        </div>

                        <div className="category">
                            <img src={tray} alt="tray" />
                            <p>Tray</p>
                        </div>

                        <div className="category">
                            <img src={glass} alt="glass" />
                            <p>Glass</p>
                        </div>

                        <div className="category">
                            <img src={kitchenset} alt="kitchenset" />
                            <p>Kitchen set</p>
                        </div>

                        <div className="category">
                            <img src={dinnerset} alt="dinnerset" />
                            <p>Dinner set</p>
                        </div>

                        <div className="category">
                            <img src={spoon} alt="spoon" />
                            <p>Spoon</p>
                        </div>

                        <div className="category">
                            <img src={nonstick} alt="nonstick" />
                            <p>Nonstick-utensil</p>
                        </div>

                        <div className="category">
                            <img src={paratha} alt="paratha" />
                            <p>Kadhai</p>
                        </div>

                        <div className="category">
                            <img src={chicken} alt="chicken" />
                            <p>Pan</p>
                        </div>

                        <div className="category">
                            <img src={rolls} alt="rolls" />
                            <p>Pressure cooker</p>
                        </div>
                    </Carousel>
                </div>
            </div>

            <div className="brands pb-3 mb-3" style={{ position: "relative" }}>
                <div className="heading text-left p-5">
                    <h1>Top Brands for You</h1>
                    <hr></hr>
                </div>

                <Carousel responsive={responsive}>
                    <div className="brand">
                        <div className="brand-img">
                            <img src={Milton} alt="milton" />
                        </div>
                        <p>Milton</p>
                    </div>

                    <div className="brand">
                        <div className="brand-img">
                            <img src={lapinoz} alt="lapinoz" />
                        </div>
                        <p>Prestige</p>
                    </div>

                    <div className="brand">
                        <div className="brand-img">
                            <img src={subway} alt="subway" />
                        </div>
                        <p>Bajaj</p>
                    </div>

                    <div className="brand">
                        <div className="brand-img">
                            <img src={burgerking} alt="burgerking" />
                        </div>
                        <p>Cello</p>
                    </div>

                    <div className="brand">
                        <div className="brand-img">
                            <img src={pizzahut} alt="pizzahut" />
                        </div>
                        <p>Lifelong</p>
                    </div>

                    <div className="brand">
                        <div className="brand-img">
                            <img src={natural} alt="natural" />
                        </div>
                        <p>Pigeon</p>
                    </div>

                    <div className="brand">
                        <div className="brand-img">
                            <img src={freshmenu} alt="freshmenu" />
                        </div>
                        <p>Hawkins</p>
                    </div>

                    <div className="brand">
                        <div className="brand-img">
                            <img src={theobroma} alt="theobroma" />
                        </div>
                        <p>Theobroma</p>
                    </div>

                    <div className="brand">
                        <div className="brand-img">
                            <img src={belgiumwaffle} alt="belgiumwaffle" />
                        </div>
                        <p>The Belgium Waffle Co.</p>
                    </div>

                    <div className="brand">
                        <div className="brand-img">
                            <img src={merwans} alt="merwans" />
                        </div>
                        <p>Merwans Cake Stop</p>
                    </div>
                </Carousel>
            </div>

            <div className="menu-items pb-3 mb-3">
                <div className="heading text-left pl-5 pr-5 pb-3 pt-5">
                    <h1>Best Utensils</h1>
                    <hr></hr>
                </div>

                <Menu/>
            </div>

            <Footer />

        </div>
    )
}
export default HomepageCustomer;