import React, { useEffect, useState } from "react";
import NavbarRestaurant from "./navbar";

import './homepage.css'
import axios from "axios";
import { Link } from "react-router-dom";

function HomepageRestaurant() {

    const r = JSON.parse(localStorage.getItem("restaurant"));

    const [menuCount, setMenuCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);

    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        (async () => {
            const menu = await axios.get("http://localhost:8088/food/all/" + r.name);
            setMenuCount(menu.data.length);

            const orders = await axios.get("http://localhost:8088/orderdetails/restaurant/" + r.name);
            setOrderCount(orders.data.length);

            const reviews = await axios.get("http://localhost:8088/rating/restaurant/" + r.id);
            setRatings(reviews.data);

            const reviewsCount = await axios.get("http://localhost:8088/rating/count/restaurant/" + r.id);
            setRatingCount(reviewsCount.data);
        })();
    }, [r.id, r.name])

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarRestaurant />
            </div>

            <div className="text-left m-3 p-3">
                <p>Welcome <b style={{textDecoration:"underline"}}>{r.name}</b> !</p>
            </div>

            <div className="container row m-auto">

                <div className="menu-div col-md-6">
                    <div className="container menu-count">
                        <div className="heading m-5">
                            <h1 style={{ fontSize: "3rem" }}>Appliances</h1>
                            <hr></hr>
                        </div>
                        <div className="count-div m-5">
                            <div className="count">
                                <span>{menuCount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-div col-md-6">
                    <div className="container order-count">
                        <div className="heading m-5">
                            <h1 style={{ fontSize: "3rem" }}>Orders</h1>
                            <hr></hr>
                        </div>
                        <div className="count-div m-5">
                            <div className="count">
                                <span>{orderCount}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="container m-5">
                <hr></hr>
                <div className="heading text-left">
                    <h1>Reviews</h1>
                    <p style={{ color: "#777" }}>
                        Total Reviews :
                        <span style={{ color: "#000" }}> {ratingCount}</span>
                    </p>
                </div>

                <div className="reviews m-3">
                    <div className="text-left">
                        <div className="message p-3" style={{ overflow: "auto" }}>

                            {
                                ratings.length > 0 ?
                                    (
                                        ratings.map((r) =>
                                            <div className="ui comments">
                                                <div className="comment">
                                                    <Link className="avatar">
                                                        {/* <img src="https://semantic-ui.com/images/avatar/small/stevie.jpg" /> */}
                                                        <div className="ui small basic icon buttons">
                                                            <button className="ui button">
                                                                <i className="user circle outline icon"></i>
                                                            </button>
                                                        </div>
                                                    </Link>

                                                    <div className="content">
                                                        <Link className="author">{r.customerName}</Link>
                                                        <div className="metadata">
                                                            {/* <div className="date">2 days ago</div> */}
                                                            <div className="rating">
                                                                <i className="star yellow icon"></i>
                                                                {r.rate} / 5
                                                            </div>
                                                        </div>
                                                        <div className="text">
                                                            {r.message}
                                                        </div>
                                                    </div>

                                                </div>

                                                <hr></hr>
                                            </div>
                                        )
                                    ) :
                                    (
                                        <div className="ui small message teal">
                                            No Reviews
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default HomepageRestaurant;