import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarCustomer from "./navbar";

import './restaurants.css';

import RestaurantImg from "./RestaurantImage";

function Restaurants() {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8088/restaurant/all")
            .then(resp => {
                setRestaurants(resp.data)
            })

    }, []);

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarCustomer />
            </div>

            <div className="m-2">
                <div className="heading">
                    <h1 style={{ fontSize: "1.5rem", textDecoration:"underline" }}>Appliances</h1>
                </div>
            </div>

            <div className="container-fluid row" style={{margin:"0px"}}>
                {
                    restaurants.map(r =>
                        <div className="col-sm-4">
                            <RestaurantImg key={r.id} id={r.id} name={r.name} description={r.description} location={r.location} contact={r.contact}/>
                        </div>     
                    )
                }
            </div>
        </div>
    )
}

export default Restaurants;