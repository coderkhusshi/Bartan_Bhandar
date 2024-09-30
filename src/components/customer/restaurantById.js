import React, { useEffect, useState } from "react";
import NavbarCustomer from "./navbar";

import './restaurantById.css';

import { Rating } from 'semantic-ui-react'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import RestaurantMenu from "./restaurantMenu";

function Restaurant() {

    const u = JSON.parse(localStorage.getItem('user'));

    const { id } = useParams();

    const [res, setRes] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [ratings, setRatings] = useState([]);

    const [restaurantImage, setRestaurantImage] = useState();

    useEffect(() => {
        (async () => {
            const resp1 = await axios.get(`http://localhost:8088/restaurant/id/${id}`);
            setRes(resp1.data);

            const resp2 = await axios.get(`http://localhost:8088/food/all/${resp1.data.name}`);
            setFoodItems(resp2.data);

            const resp3 = await axios.get(`http://localhost:8088/rating/restaurant/${id}`);
            setRatings(resp3.data);


            const resp4 = await fetch(`http://localhost:8088/image/restaurant/res/${id}`, {
                //mode: "no-cors", // 'cors' by default
            });
            const blob = await resp4.blob();
            const url = URL.createObjectURL(blob);
            setRestaurantImage(url);
        })()
    }, [id]);


    const [review, setReview] = useState('');
    const [rate, setRate] = useState(1);

    const handleRate = async (e, { rating }) => {
        setRate(rating);
    }

    const [errors, setErrors] = useState({});

    const submit = async () => {
        let err = [];

        if (!review) { err['reviewError'] = "Please add a review." }

        setErrors(err);

        const noError = Object.keys(err).length === 0;

        if (noError) {
            const rating = {
                customerId: u.id,
                customerName: u.firstName + " " + u.lastName,
                restaurantId: id,
                restaurantName: res.name,
                message: review,
                rate: rate
            }

            await axios.post("http://localhost:8088/rating/add", rating)
                .then(resp => {
                    setRatings(ratings.concat(resp.data));
                    setRate(1);
                    setReview('');
                });
        }
    }

    return (
        <div className="">
            <div className="container-fluid section1">
                <NavbarCustomer />
            </div>

            <div className="container-fluid row" style={{ margin: '0px' }}>
                <div className="col-md">
                    <div className="image">
                        <img src={restaurantImage} alt="restaurant" />
                    </div>
                </div>
                <div className="col-md text-left">
                    <div className="info">
                        <div className="heading mb-3">
                            <h1>{res.name}</h1>
                        </div>
                        <div className="description mb-3">
                            <p>{res.description}</p>
                        </div>
                        <div className="d-flex" style={{ justifyContent: "space-between" }}>
                            {/* <div className="details">
                                <p>Location : <span>{res.location}</span></p>
                                <p>Contact : <span>{res.contact}</span></p>
                                <p>Email : <span>{res.email}</span></p>
                            </div> */}

                            <div className="details">
                                <table className="table">
                                    <tr>
                                        <th>Location : </th>
                                        <td>{res.location}</td>
                                    </tr>
                                    <tr>
                                        <th>Contact : </th>
                                        <td>{res.contact}</td>
                                    </tr>
                                    <tr>
                                        <th>Email : </th>
                                        <td>{res.email}</td>
                                    </tr>
                                </table>
                            </div>

                            <div className="review-btn">
                                <button type="button" className="mini ui button blue" data-toggle="modal" data-target="#myModal">
                                    See Reviews
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <hr></hr>


            <div className="container menu p-3">
                <div className="heading p-3 mb-3">
                    <h1>Appliances</h1>
                </div>
                <div className="row">
                    {
                        foodItems.map((f) =>
                            <div className="col-md-3" key={f.id}>
                                <div className="ui card text-left">

                                    <RestaurantMenu key={f.id} id={f.id} />

                                    <div className="content">
                                        <div className="">
                                            <div className="heading">
                                                <h1 style={{ font: "15px bold", color: "#000" }}>{f.name}</h1>
                                            </div>
                                            <hr></hr>
                                            <div className="price">
                                                <h3 style={{ font: "20px bold", color: "#555" }}>Rs. {f.price}</h3>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div>
                                            <Link className="fluid ui yellow button" to={`/menu/${f.id}`}>View</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h1 className="modal-title">Reviews</h1>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>

                        <div className="modal-body">
                            <div className="container reviews">
                                <div className="text-left">
                                    <div className="message p-3" style={{ overflow: "auto" }}>

                                        {
                                            ratings.length > 0 ?
                                                (
                                                    ratings.map((r) =>
                                                        <div className="ui comments">
                                                            <div className="comment">
                                                                <div className="ui small red basic icon buttons"
                                                                    style={{
                                                                        float: "right",
                                                                        display: r.customerId === u.id ? "block" : "none"   // To check that the review is of the Current User
                                                                    }}>
                                                                    <button className="ui button"
                                                                        onClick={() => {
                                                                            setRatings(ratings.filter(f => f.id !== r.id));
                                                                            axios.delete("http://localhost:8088/rating/delete/" + r.id);
                                                                        }}>
                                                                        <i className="trash alternate outline icon"></i>
                                                                    </button>
                                                                </div>

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
                                                    <div className="ui red small message">
                                                        No Reviews
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-left" style={{ borderTop: "1px solid #dee2e6" }}>
                            <div className="heading m-3">
                                <h3 style={{ color: "#777" }}>Add a review</h3>
                            </div>
                            <div className="stars m-3">
                                <Rating maxRating={5} defaultRating={rate} icon='star' size='tiny'
                                    onRate={handleRate} />
                            </div>
                            <div className="m-3">
                                <form className="ui form">
                                    <textarea placeholder="Review for us" rows="2"
                                        value={review} onChange={(event) => setReview(event.target.value)} />
                                    {
                                        errors.reviewError &&
                                        <div className="ui red message mini">{errors.reviewError}</div>
                                    }
                                </form>
                            </div>
                            <div className="m-3">
                                <button type="submit" className="mini ui button blue" onClick={submit}>Send</button>
                            </div>
                        </div>

                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div> */}

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Restaurant;