import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarCustomer from "./navbar";


function MenuById() {

    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    const { id } = useParams();

    const [foodImage, setFoodImage] = useState();

    const [foodItem, setFoodItem] = useState({});
    useEffect(() => {
        (async() => {
            axios.get("http://localhost:8088/food/id/" + id)
            .then((resp) => {
                setFoodItem(resp.data);
            })

            const resp = await fetch(`http://localhost:8088/image/food/fd/${id}`, {
                //mode: "no-cors", // 'cors' by default
            });
            const blob = await resp.blob();
            const url = URL.createObjectURL(blob);
            setFoodImage(url);
        })();
    }, [id])

    const [count, setCount] = useState(1);
    const counterAdd = () => {
        setCount(count + 1);
    }
    const counterSub = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    //const [cartItem, setCartItem] = useState({});
    const addToCart = () => {

        const payload = {
            itemId: foodItem.id,
            itemName: foodItem.name,
            quantity: count,
            price: count * foodItem.price,
            customerId: user.id,
            restaurant: foodItem.restaurant
        }

        axios.post("http://localhost:8088/cart/add", payload)
            .then(resp => {
                //setCartItem(resp.data);
                alert("Added to cart");
                navigate("/cart");
            })
            .catch((error) => {
                alert(error.response.message);
            })
    }

    return (
        <div className="">
            <div className="container-fluid section1">
                <NavbarCustomer />
            </div>

            {/* <div className="container-fluid row" style={{ margin: '0px' }}>
                <div className="col-md" style={{ padding: "0rem", margin: "2rem" }}>
                    <div className="image" style={{ boxShadow: "0px 0px 8px #aaa", padding: "2rem", margin: "3rem 13rem" }}>
                        <img src={food} alt="restaurant-image" style={{ width: "15rem" }} />
                    </div>
                </div>
                <div className="col-md text-left">
                    <div className="info">
                        <div className="heading mb-3">
                            <h1>{foodItem.name}</h1>
                        </div>
                        <div className="description mb-3">
                            <p>{foodItem.restaurant}</p>
                        </div>
                        <div className="mb-3">
                            <p>Rs. {foodItem.price}</p>
                        </div>
                        <div className="ui circular labels">
                            <button className="ui compact label icon button yellow" onClick={counterAdd}>
                                <i className="plus icon"></i>
                            </button>
                            <span className="count" style={{ padding: "4px 8px", margin: "0px 6px 0px 0px", border: "1px solid #ccc", borderRadius: "20px" }}>{count}</span>
                            <button className="ui compact label icon button yellow" onClick={counterSub}>
                                <i className="minus icon"></i>
                            </button>
                        </div>
                        <div className="">
                            <button className="mini ui button yellow" onClick={addToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="container mt-5" style={{ width: "fit-content" }}>
                <div className="card">
                    <div className="d-flex" style={{ justifyContent: "space-around" }}>
                        <div className="" style={{ padding: "5rem" }}>
                            <img src={foodImage} alt="restaurant" style={{ width: "15rem", boxShadow: "0px 0px 8px #aaa" }} />
                        </div>
                        <div className="info text-left" style={{padding:"4rem"}}>
                            <div className="heading mb-3">
                                <h1 style={{fontSize:"40px", color:"#000"}}>{foodItem.name}</h1>
                            </div>
                            <div className="description mb-3">
                                <p>{foodItem.restaurant}</p>
                            </div>
                            <div className="mb-3">
                                <p>Rs. {foodItem.price}</p>
                            </div>
                            <div className="ui circular labels">
                                <button className="ui compact label icon button yellow" onClick={counterAdd}>
                                    <i className="plus icon"></i>
                                </button>
                                <span className="count" style={{ padding: "4px 8px", margin: "0px 6px 0px 0px", border: "1px solid #ccc", borderRadius: "20px" }}>{count}</span>
                                <button className="ui compact label icon button yellow" onClick={counterSub}>
                                    <i className="minus icon"></i>
                                </button>
                            </div>
                            <div className="">
                                <button className="mini ui button yellow" onClick={addToCart}>Add to Cart</button>
                                <button className="mini ui button" onClick={() => navigate("/homepage")}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MenuById;