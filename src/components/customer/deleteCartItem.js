import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarCustomer from "./navbar";

function DeleteCartItem() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [cartItem, setCartItem] = useState({});
    useEffect(() => {
        axios.get("http://localhost:8088/cart/id/" + id)
            .then(resp => {
                setCartItem(resp.data);
            })
    }, [id])

    const deleteItem = () => {
        axios.delete("http://localhost:8088/cart/delete/"+id)
        .then(resp => {
            alert(resp.data);
            navigate("/cart");
        });
    }

    return (
        <div className="">

            <div className="container-fluid section1">
                <NavbarCustomer />
            </div>

            <div className="container" style={{width:"fit-content"}}>
                <div className="card m-5 p-5">
                    <div className="heading text-left">
                        <h1 style={{ color: "#777", fontSize: "1.5rem" }}>Delete Item</h1><hr></hr>
                    </div>
                    <div className="mt-3">
                        <div className="d-flex payment" style={{ justifyContent: "space-between", fontSize: "12px" }}>
                            <p style={{ color: "#777" }}>Name</p>
                            <p>{cartItem.itemName}</p>
                        </div>
                        <div className="d-flex payment" style={{ justifyContent: "space-between", fontSize: "12px" }}>
                            <p style={{ color: "#777" }}>Quantity</p>
                            <p>{cartItem.quantity}</p>
                        </div>
                        <div className="d-flex payment" style={{ justifyContent: "space-between", fontSize: "12px" }}>
                            <p style={{ color: "#777" }}>Price</p>
                            <p>Rs. {cartItem.price}</p>
                        </div>
                        <hr></hr>
                        <div className="">
                            <button onClick={deleteItem} className="mini ui button red fluid mb-2">Delete</button> 
                            <button onClick={() => navigate("/cart")} className="mini ui button fluid">Cancel</button>                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DeleteCartItem;