import React from "react";

import './Homepage.css'



import step1 from "./images/step1.png";
import step2 from "./images/step2.png";
import step3 from "./images/step3.png";
import backimage from "./images/backimage.jpg";
import utensil from "./images/utensil.jpg";
import Navbar from "./navbar";

function HomePage() {

    return (
        <div className="">

            <div className="container-fluid row section1">
                <Navbar/>
                
                <div className="col-md">

                    <div className="image">
                        <img src={backimage} alt="backimage" />
                    </div>

                </div>

                <div className="col-md message">

                    <div className="header">
                        <h1>The Best Shop In Your BhagalPur</h1>
                        <button className="ui button white" >Buy Now &#8680;</button>
                    </div>

                </div>
            </div>

            <div className="container-fluid working">
                <div className="header">
                    <h1>How It Works</h1>
                </div>
                <div className="steps">
                    <div className="row">
                        <div className="col-md step step1">
                            <div className="img">
                                <img src={step1} alt="step1Image"/>
                            </div>
                            <div className="description">
                                <h1><span>01</span> select Appliances</h1>
                            </div>
                        </div>

                        <div className="col-md step step2">
                            <div className="img">
                                <img src={step2} alt="step2Image"/>
                            </div>
                            <div className="description">
                                <h1><span>02</span> select categories</h1>
                            </div>
                        </div>

                        <div className="col-md step step3">
                            <div className="img">
                                <img src={step3} alt="step3Image"/>
                            </div>
                            <div className="description">
                                <h1><span>03</span> wait for delivery</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container section3">
                <div className="row">
                    <div className="col-lg message">
                        <div className="header">
                            <h1>Appliances from your favourite shop to your kitchen.</h1>
                            <button className="ui inverted yellow button">Order Now &#8680;</button>
                        </div>
                    </div>
                    <div className="col-lg">
                        <div className="image">
                            <img src={utensil} alt="utensil"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomePage;